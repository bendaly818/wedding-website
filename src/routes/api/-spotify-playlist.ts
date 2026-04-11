/**
 * Spotify Playlist management server functions for the admin dashboard.
 *
 * Flow:
 *   1. Admin clicks "Connect Spotify" → getSpotifyAuthUrl() → redirects to Spotify OAuth
 *   2. Spotify redirects back to /admin/spotify-callback?code=xxx
 *   3. exchangeSpotifyCode(code) → stores access_token + refresh_token in app_settings
 *   4. Admin clicks "Sync Playlist" → syncSpotifyPlaylist()
 *      - Reads all song_recommendations from rsvp table
 *      - Deduplicates track IDs
 *      - Creates or updates a Spotify playlist with those tracks
 */

import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";
import { createSupabaseServerClient } from "../../lib/supabase";

// ── helpers ────────────────────────────────────────────────────────

async function requireAdmin() {
	const supabase = await createSupabaseServerClient(getRequest());
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) throw new Error("Unauthorized");
}

async function getSupabaseAdmin() {
	// Uses service-role key which bypasses RLS
	const { createClient } = await import("@supabase/supabase-js");
	return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
}

async function getSetting(key: string): Promise<string | null> {
	const db = await getSupabaseAdmin();
	const { data } = await db
		.from("app_settings")
		.select("value")
		.eq("key", key)
		.single();
	return data?.value ?? null;
}

async function setSetting(key: string, value: string) {
	const db = await getSupabaseAdmin();
	await db
		.from("app_settings")
		.upsert({ key, value, updated_at: new Date().toISOString() });
}

async function getValidSpotifyToken(): Promise<string> {
	const accessToken = await getSetting("spotify_access_token");
	const expiresAt = await getSetting("spotify_token_expires_at");
	const refreshToken = await getSetting("spotify_refresh_token");

	// If we have a valid token, return it
	if (accessToken && expiresAt && Date.now() < parseInt(expiresAt, 10) - 30_000) {
		return accessToken;
	}

	if (!refreshToken) throw new Error("Spotify not connected. Please connect via OAuth.");

	// Refresh
	const spotifyEnv = env as Cloudflare.Env;
	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: `Basic ${btoa(`${spotifyEnv.SPOTIFY_CLIENT_ID}:${spotifyEnv.SPOTIFY_CLIENT_SECRET}`)}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
	});

	if (!res.ok) throw new Error("Failed to refresh Spotify token.");

	const data = (await res.json()) as {
		access_token: string;
		expires_in: number;
		refresh_token?: string;
	};

	await setSetting("spotify_access_token", data.access_token);
	await setSetting(
		"spotify_token_expires_at",
		String(Date.now() + data.expires_in * 1000),
	);
	if (data.refresh_token) {
		await setSetting("spotify_refresh_token", data.refresh_token);
	}

	return data.access_token;
}

// ── server functions ───────────────────────────────────────────────

export const getSpotifyAuthUrl = createServerFn({ method: "GET" }).handler(
	async () => {
		await requireAdmin();
		const spotifyEnv = env as Cloudflare.Env;
		const scopes = [
			"playlist-modify-private",
			"playlist-modify-public",
			"playlist-read-private",
		].join(" ");

		const redirectUri = (env as Cloudflare.Env).SPOTIFY_REDIRECT_URI;

		const params = new URLSearchParams({
			response_type: "code",
			client_id: spotifyEnv.SPOTIFY_CLIENT_ID,
			scope: scopes,
			redirect_uri: redirectUri,
		});

		return `https://accounts.spotify.com/authorize?${params}`;
	},
);

export const exchangeSpotifyCode = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => data as { code: string })
	.handler(async ({ data: { code } }) => {
		await requireAdmin();
		const spotifyEnv = env as Cloudflare.Env;

		const res = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				Authorization: `Basic ${btoa(`${spotifyEnv.SPOTIFY_CLIENT_ID}:${spotifyEnv.SPOTIFY_CLIENT_SECRET}`)}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "authorization_code",
				code,
				redirect_uri: spotifyEnv.SPOTIFY_REDIRECT_URI,
			}),
		});

		if (!res.ok) {
			const err = await res.text();
			throw new Error(`Spotify token exchange failed: ${err}`);
		}

		const data = (await res.json()) as {
			access_token: string;
			refresh_token: string;
			expires_in: number;
		};

		await setSetting("spotify_access_token", data.access_token);
		await setSetting("spotify_refresh_token", data.refresh_token);
		await setSetting(
			"spotify_token_expires_at",
			String(Date.now() + data.expires_in * 1000),
		);

		return { success: true };
	});

export const disconnectSpotify = createServerFn({ method: "POST" }).handler(async () => {
	await requireAdmin();
	const db = await getSupabaseAdmin();
	await db
		.from("app_settings")
		.delete()
		.in("key", [
			"spotify_access_token",
			"spotify_refresh_token",
			"spotify_token_expires_at",
			"spotify_playlist_id",
			"spotify_playlist_url",
		]);
	return { success: true };
});

export const getSpotifyConnectionStatus = createServerFn({ method: "GET" }).handler(
	async () => {
		await requireAdmin();
		const refreshToken = await getSetting("spotify_refresh_token");
		const playlistId = await getSetting("spotify_playlist_id");
		const playlistUrl = await getSetting("spotify_playlist_url");
		return {
			connected: !!refreshToken,
			playlistId: playlistId ?? null,
			playlistUrl: playlistUrl ?? null,
		};
	},
);

export const getAllSongs = createServerFn({ method: "GET" }).handler(async () => {
	await requireAdmin();
	const db = await getSupabaseAdmin();

	const { data, error } = await db
		.from("rsvp")
		.select("song_recommendations, invite_id")
		.not("song_recommendations", "is", null);

	if (error) throw new Error(error.message);

	// Parse and deduplicate
	type Song = { id: string; name: string; artist: string; albumArt: string | null };
	const seen = new Set<string>();
	const songs: (Song & { inviteId: string })[] = [];

	for (const row of data ?? []) {
		if (!row.song_recommendations) continue;
		try {
			const tracks: Song[] = JSON.parse(row.song_recommendations);
			for (const t of tracks) {
				if (!seen.has(t.id)) {
					seen.add(t.id);
					songs.push({ ...t, inviteId: row.invite_id });
				}
			}
		} catch {}
	}

	return songs;
});

export const syncSpotifyPlaylist = createServerFn({ method: "POST" }).handler(
	async () => {
		await requireAdmin();

		const token = await getValidSpotifyToken();

		// Get all deduplicated track IDs
		const db = await getSupabaseAdmin();
		const { data: rsvpData } = await db
			.from("rsvp")
			.select("song_recommendations")
			.not("song_recommendations", "is", null);

		const seen = new Set<string>();
		const trackUris: string[] = [];

		for (const row of rsvpData ?? []) {
			if (!row.song_recommendations) continue;
			try {
				const tracks: { id: string }[] = JSON.parse(row.song_recommendations);
				for (const t of tracks) {
					if (!seen.has(t.id)) {
						seen.add(t.id);
						trackUris.push(`spotify:track:${t.id}`);
					}
				}
			} catch {}
		}

		// Get or create playlist
		let playlistId = await getSetting("spotify_playlist_id");

		if (!playlistId) {
			// Create playlist
			const createRes = await fetch(
				"https://api.spotify.com/v1/me/playlists",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: "Ben & Brit's Wedding",
						description: "Songs requested by our guests. Let's dance!",
						public: true,
					}),
				},
			);
			if (!createRes.ok) {
				const err = await createRes.text();
				throw new Error(`Spotify create playlist failed (${createRes.status}): ${err}`);
			}
			const playlist = (await createRes.json()) as {
				id: string;
				external_urls: { spotify: string };
			};
			if (!playlist.id) {
				throw new Error(`Spotify create playlist returned no id: ${JSON.stringify(playlist)}`);
			}
			playlistId = playlist.id;
			await setSetting("spotify_playlist_id", playlistId);
			await setSetting("spotify_playlist_url", playlist.external_urls.spotify);
		}

		// Replace all tracks (in batches of 100)
		console.log(`[spotify] syncing ${trackUris.length} tracks to playlist ${playlistId}`);

		const batches: string[][] = [];
		for (let i = 0; i < trackUris.length; i += 100) {
			batches.push(trackUris.slice(i, i + 100));
		}

		// PUT replaces entire playlist (or clears if empty)
		const putRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/items`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ uris: batches[0] ?? [] }),
		});
		if (!putRes.ok) {
			const err = await putRes.text();
			throw new Error(`Spotify PUT tracks failed (${putRes.status}): ${err}`);
		}

		// POST appends remaining batches
		for (const batch of batches.slice(1)) {
			const postRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/items`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ uris: batch }),
			});
			if (!postRes.ok) {
				const err = await postRes.text();
				throw new Error(`Spotify POST tracks failed (${postRes.status}): ${err}`);
			}
		}

		const playlistUrl = await getSetting("spotify_playlist_url");
		return {
			success: true,
			trackCount: trackUris.length,
			playlistUrl,
		};
	},
);
