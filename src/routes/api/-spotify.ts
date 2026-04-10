import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

export interface SpotifyTrack {
	id: string;
	name: string;
	artist: string;
	albumArt: string | null;
}

async function getSpotifyToken(
	clientId: string,
	clientSecret: string,
): Promise<string> {
	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: "grant_type=client_credentials",
	});
	const data = (await res.json()) as { access_token: string };
	return data.access_token;
}

export const searchSpotify = createServerFn({ method: "GET" })
	.inputValidator((q: unknown) => q as string)
	.handler(async ({ data: q }): Promise<SpotifyTrack[]> => {
		if (!q || q.trim().length < 2) return [];

		const spotifyEnv = env as Cloudflare.Env;
		const clientId = spotifyEnv.SPOTIFY_CLIENT_ID;
		const clientSecret = spotifyEnv.SPOTIFY_CLIENT_SECRET;

		if (!clientId || !clientSecret) {
			console.error("Spotify credentials not configured");
			return [];
		}

		try {
			const token = await getSpotifyToken(clientId, clientSecret);
			const res = await fetch(
				`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=6`,
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			const data = (await res.json()) as {
				tracks: {
					items: Array<{
						id: string;
						name: string;
						artists: Array<{ name: string }>;
						album: { images: Array<{ url: string }> };
					}>;
				};
			};
			return data.tracks.items.map((t) => ({
				id: t.id,
				name: t.name,
				artist: t.artists.map((a) => a.name).join(", "),
				albumArt: t.album.images[2]?.url ?? t.album.images[0]?.url ?? null,
			}));
		} catch (error) {
			console.error("Spotify search failed:", error);
			return [];
		}
	});
