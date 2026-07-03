import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useState } from "react";
import { graphql } from "#/gql";
import type { GetAllInvitesQuery } from "#/gql/graphql";
import { createSupabaseServerClient } from "../../lib/supabase";
import { supabaseGraphqlClient } from "../../lib/supabase-graphql";
import {
	disconnectSpotify,
	getAllSongs,
	getSpotifyAuthUrl,
	getSpotifyConnectionStatus,
	syncSpotifyPlaylist,
} from "../api/-spotify-playlist";

/** Authenticates the request via Supabase Auth server (safe, not cookie-only). */
async function getAuthContext() {
	const supabase = await createSupabaseServerClient(getRequest());
	const {
		data: { user },
	} = await supabase.auth.getUser();
	// Session is needed only for its access_token (used in GraphQL headers).
	// getUser() already validated the token; we just need the token string.
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return { user, accessToken: session?.access_token ?? null };
}

export const getAuthUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const { user } = await getAuthContext();
		return user ?? null;
	},
);
const GET_ALL_INVITES = graphql(`
  query GetAllInvites {
    inviteCollection(orderBy: [{ created_at: DescNullsLast }]) {
      edges {
        node {
          id
          name
          message
          sent
          first_opened_at
          open_count
		  rsvpCollection {
			edges {
				node {
					id
					attending
					dietary
					transit
					physical_invite
					song_recommendations
				}
			}
		  }
        }
      }
    }
  }
`);

export const getAllInvites = createServerFn({ method: "GET" }).handler(
	async () => {
		const { user, accessToken } = await getAuthContext();
		if (!user) throw new Error("Unauthorized");

		try {
			const res = await supabaseGraphqlClient.request<GetAllInvitesQuery>(
				GET_ALL_INVITES,
				{},
				{ Authorization: `Bearer ${accessToken}` },
			);
			return res.inviteCollection?.edges?.map((e) => e.node) || [];
		} catch (e) {
			console.error(e);
			return [];
		}
	},
);

const UPDATE_INVITE_SENT_MUTATION = graphql(`
  mutation UpdateInviteSent($id: UUID!, $sent: Boolean!) {
    updateinviteCollection(
      filter: { id: { eq: $id } }
      set: { sent: $sent }
    ) {
      records {
        id
        sent
      }
    }
  }
`);

export const updateInviteSent = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => data as { id: string; sent: boolean })
	.handler(async ({ data }) => {
		const { user, accessToken } = await getAuthContext();
		if (!user) throw new Error("Unauthorized");

		try {
			await supabaseGraphqlClient.request(
				UPDATE_INVITE_SENT_MUTATION,
				{ id: data.id, sent: data.sent },
				{ Authorization: `Bearer ${accessToken}` },
			);
			return { success: true };
		} catch (e) {
			console.error(e);
			return { success: false, error: "Failed to update invite" };
		}
	});

const ADD_INVITE_MUTATION = graphql(`
  mutation AddInvite($name: String!, $message: String, $sent: Boolean) {
    insertIntoinviteCollection(objects: [
      {
        name: $name,
        message: $message,
        sent: $sent
      }
    ]) {
      records {
        id
      }
    }
  }
`);

export const addInvite = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) => data as { name: string; message: string; sent: boolean },
	)
	.handler(async ({ data }) => {
		const { user, accessToken } = await getAuthContext();
		if (!user) throw new Error("Unauthorized");

		try {
			await supabaseGraphqlClient.request(
				ADD_INVITE_MUTATION,
				{ name: data.name, message: data.message, sent: data.sent },
				{ Authorization: `Bearer ${accessToken}` },
			);
			return { success: true };
		} catch (e) {
			console.error(e);
			return { success: false, error: "Failed to create invite" };
		}
	});

export const Route = createFileRoute("/admin/")({
	beforeLoad: async () => {
		const user = await getAuthUser();
		if (!user) {
			throw redirect({
				to: "/admin/login",
			});
		}
	},
	component: AdminDashboard,
});

// ── Types ──────────────────────────────────────────────────────────

type Invite = {
	id: string;
	name?: string | null;
	message?: string | null;
	sent?: boolean | null;
	first_opened_at?: string | null;
	open_count?: number | null;
	rsvpCollection?: {
		edges: Array<{
			node: {
				id: string;
				attending?: boolean | null;
				dietary?: string | null;
				transit?: boolean | null;
				physical_invite?: boolean | null;
				song_recommendations?: string | null;
			};
		}>;
	} | null;
};

type Song = {
	id: string;
	name: string;
	artist: string;
	albumArt: string | null;
};

// ── Sub-components ─────────────────────────────────────────────────

function StatusBadge({ rsvp }: { rsvp: Invite["rsvpCollection"] }) {
	const node = rsvp?.edges?.[0]?.node;
	if (!node)
		return (
			<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 uppercase tracking-wider">
				Pending
			</span>
		);
	if (node.attending)
		return (
			<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 uppercase tracking-wider">
				Attending
			</span>
		);
	return (
		<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 uppercase tracking-wider">
			Declined
		</span>
	);
}

function BoolCell({ val }: { val?: boolean | null }) {
	if (val === true)
		return <span className="text-emerald-600 font-bold text-base">Yes</span>;
	if (val === false)
		return <span className="text-red-500 font-bold text-base">No</span>;
	return <span className="text-gray-300">—</span>;
}

function RsvpModal({
	invite,
	onClose,
}: {
	invite: Invite;
	onClose: () => void;
}) {
	const rsvp = invite.rsvpCollection?.edges?.[0]?.node;
	let songs: Song[] = [];
	if (rsvp?.song_recommendations) {
		try {
			songs = JSON.parse(rsvp.song_recommendations);
		} catch {}
	}

	return (
		<dialog
			open
			aria-modal="true"
			aria-label={`RSVP details for ${invite.name}`}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full max-w-none max-h-none m-0 bg-transparent"
			style={{ background: "rgba(30,10,20,0.45)", backdropFilter: "blur(4px)" }}
			onKeyDown={(e) => e.key === "Escape" && onClose()}
			onClick={(e) => e.target === e.currentTarget && onClose()}
		>
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
				{/* Header */}
				<div
					className="px-8 pt-8 pb-6"
					style={{ background: "var(--section-s1)" }}
				>
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">
								RSVP Details
							</p>
							<h2
								className="text-2xl font-serif"
								style={{ color: "var(--color-wine)" }}
							>
								{invite.name}
							</h2>
						</div>
						<button
							type="button"
							onClick={onClose}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-gray-400 text-xl leading-none"
						>
							×
						</button>
					</div>
				</div>

				{/* Body */}
				<div className="px-8 py-6 flex flex-col gap-5">
					{!rsvp ? (
						<p className="text-gray-400 text-center py-4">
							No RSVP submitted yet.
						</p>
					) : (
						<>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-1">
									<p className="text-xs uppercase tracking-widest font-bold text-gray-400">
										Attending
									</p>
									<BoolCell val={rsvp.attending} />
								</div>
								<div className="flex flex-col gap-1">
									<p className="text-xs uppercase tracking-widest font-bold text-gray-400">
										Bus Transfer
									</p>
									<BoolCell val={rsvp.transit} />
								</div>
								<div className="flex flex-col gap-1">
									<p className="text-xs uppercase tracking-widest font-bold text-gray-400">
										Physical Invite
									</p>
									<BoolCell val={rsvp.physical_invite} />
								</div>
								<div className="flex flex-col gap-1">
									<p className="text-xs uppercase tracking-widest font-bold text-gray-400">
										Dietary
									</p>
									<p
										className="text-base font-medium"
										style={{ color: "var(--color-wine-dark)" }}
									>
										{rsvp.dietary || (
											<span className="text-gray-300">None</span>
										)}
									</p>
								</div>
							</div>

							{songs.length > 0 && (
								<div className="flex flex-col gap-2">
									<p className="text-xs uppercase tracking-widest font-bold text-gray-400">
										Song Requests ({songs.length})
									</p>
									<div className="flex flex-col gap-2">
										{songs.map((song) => (
											<div
												key={song.id}
												className="flex items-center gap-3 bg-[color:var(--section-s1)] rounded-xl px-3 py-2"
											>
												{song.albumArt ? (
													<img
														src={song.albumArt}
														alt=""
														className="w-9 h-9 rounded object-cover flex-shrink-0"
													/>
												) : (
													<div className="w-9 h-9 rounded flex-shrink-0 bg-gray-100" />
												)}
												<div className="flex-1 min-w-0">
													<p
														className="text-sm font-semibold truncate"
														style={{ color: "var(--color-wine-dark)" }}
													>
														{song.name}
													</p>
													<p className="text-xs text-gray-400 truncate">
														{song.artist}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</>
					)}
				</div>

				<div className="px-8 pb-8">
					<button
						type="button"
						onClick={onClose}
						className="w-full py-2.5 rounded-xl border text-sm font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		</dialog>
	);
}

function PlaylistPanel() {
	const queryClient = useQueryClient();

	const { data: status } = useQuery({
		queryKey: ["spotify-status"],
		queryFn: () => getSpotifyConnectionStatus(),
	});

	const { data: songs = [] } = useQuery({
		queryKey: ["all-songs"],
		queryFn: () => getAllSongs(),
	});

	const connectMutation = useMutation({
		mutationFn: async () => {
			const url = await getSpotifyAuthUrl();
			window.location.href = url;
		},
	});

	const syncMutation = useMutation({
		mutationFn: () => syncSpotifyPlaylist(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["spotify-status"] });
		},
	});

	const disconnectMutation = useMutation({
		mutationFn: () => disconnectSpotify(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["spotify-status"] });
		},
	});

	return (
		<section className="bg-white rounded-3xl shadow-xl overflow-hidden">
			<div className="p-8 pb-4 flex items-center justify-between">
				<div>
					<h2
						className="text-2xl font-serif"
						style={{ color: "var(--color-wine)" }}
					>
						DJ Playlist
					</h2>
					<p className="text-sm text-gray-400 mt-0.5">
						{songs.length} unique track{songs.length !== 1 ? "s" : ""} across
						all RSVPs
					</p>
				</div>
				<div className="flex items-center gap-3">
					{status?.connected ? (
						<>
							{status.playlistUrl && (
								<a
									href={status.playlistUrl}
									target="_blank"
									rel="noreferrer"
									className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold uppercase tracking-widest transition-colors hover:bg-gray-50"
									style={{
										color: "var(--color-wine)",
										borderColor: "var(--card-border)",
									}}
								>
									<SpotifyIcon />
									Open Playlist
								</a>
							)}
							<button
								type="button"
								onClick={() => disconnectMutation.mutate()}
								disabled={disconnectMutation.isPending}
								className="px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-80 disabled:opacity-50"
								style={{
									color: "var(--color-wine)",
									background: "var(--section-s2)",
								}}
							>
								{disconnectMutation.isPending ? "Disconnecting…" : "Disconnect"}
							</button>
							<button
								type="button"
								onClick={() => syncMutation.mutate()}
								disabled={syncMutation.isPending || songs.length === 0}
								className="px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
								style={{ background: "var(--color-wine)" }}
							>
								{syncMutation.isPending
									? "Syncing…"
									: syncMutation.data?.success
										? "Synced!"
										: "Sync Playlist"}
							</button>
						</>
					) : (
						<button
							type="button"
							onClick={() => connectMutation.mutate()}
							disabled={connectMutation.isPending}
							className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
							style={{ background: "#1DB954" }}
						>
							<SpotifyIcon white />
							Connect Spotify
						</button>
					)}
				</div>
			</div>

			{syncMutation.data?.success && (
				<div className="mx-8 mb-4 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium">
					Playlist synced with {syncMutation.data.trackCount} tracks.{" "}
					{syncMutation.data.playlistUrl && (
						<a
							href={syncMutation.data.playlistUrl}
							target="_blank"
							rel="noreferrer"
							className="underline font-bold"
						>
							Open in Spotify ↗
						</a>
					)}
				</div>
			)}

			{syncMutation.isError && (
				<div className="mx-8 mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
					Sync failed. Check Spotify connection.
				</div>
			)}

			{songs.length > 0 ? (
				<div className="px-8 pb-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
						{songs.map((song) => (
							<div
								key={song.id}
								className="flex items-center gap-3 rounded-xl px-3 py-2.5"
								style={{ background: "var(--section-s1)" }}
							>
								{song.albumArt ? (
									<img
										src={song.albumArt}
										alt=""
										className="w-10 h-10 rounded object-cover flex-shrink-0"
									/>
								) : (
									<div className="w-10 h-10 rounded flex-shrink-0 bg-gray-200" />
								)}
								<div className="flex-1 min-w-0">
									<p
										className="text-sm font-semibold truncate"
										style={{ color: "var(--color-wine-dark)" }}
									>
										{song.name}
									</p>
									<p className="text-xs text-gray-400 truncate">
										{song.artist}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="px-8 pb-8 text-center text-gray-300 text-sm py-8">
					No song requests yet.
				</div>
			)}
		</section>
	);
}

function SpotifyIcon({ white }: { white?: boolean }) {
	return (
		<svg
			viewBox="0 0 24 24"
			className="w-4 h-4 flex-shrink-0"
			fill={white ? "white" : "currentColor"}
			aria-hidden="true"
		>
			<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
		</svg>
	);
}

// ── Main Dashboard ─────────────────────────────────────────────────

function AdminDashboard() {
	const queryClient = useQueryClient();
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [sent, setSent] = useState(false);
	const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
	const [activeTab, setActiveTab] = useState<"invites" | "playlist">("invites");

	const { data: invites = [], isLoading } = useQuery({
		queryKey: ["invites"],
		queryFn: () => getAllInvites(),
	});

	const createInvite = useMutation({
		mutationFn: (data: { name: string; message: string; sent: boolean }) =>
			addInvite({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invites"] });
			setName("");
			setMessage("");
			setSent(false);
		},
	});

	const toggleSent = useMutation({
		mutationFn: (data: { id: string; sent: boolean }) =>
			updateInviteSent({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invites"] });
		},
	});

	const handleCreate = (e: React.FormEvent) => {
		e.preventDefault();
		createInvite.mutate({ name, message, sent });
	};

	const handleLogout = async () => {
		// biome-ignore lint/suspicious/noDocumentCookie: clearing auth cookies on logout
		document.cookie =
			"sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		// biome-ignore lint/suspicious/noDocumentCookie: clearing auth cookies on logout
		document.cookie =
			"sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.href = "/admin/login";
	};

	// Stats
	const responded = invites.filter((i) => i.rsvpCollection?.edges?.length);
	const attending = invites.filter(
		(i) => i.rsvpCollection?.edges?.[0]?.node?.attending === true,
	);
	const declined = invites.filter(
		(i) => i.rsvpCollection?.edges?.[0]?.node?.attending === false,
	);

	return (
		<div
			className="min-h-screen p-6 md:p-8"
			style={{ background: "var(--section-s1)" }}
		>
			<div className="max-w-6xl mx-auto flex flex-col gap-6">
				{/* Header */}
				<header className="flex justify-between items-center">
					<h1
						className="text-3xl md:text-4xl font-serif"
						style={{ color: "var(--color-wine)" }}
					>
						Ben & Brit
					</h1>
					<button
						onClick={handleLogout}
						type="button"
						className="px-4 py-2 rounded-xl border text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
						style={{
							color: "var(--color-wine)",
							borderColor: "var(--card-border)",
							background: "transparent",
						}}
					>
						Logout
					</button>
				</header>

				{/* Stat cards */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{[
						{ label: "Total Invites", value: invites.length },
						{ label: "Responded", value: responded.length },
						{ label: "Attending", value: attending.length, green: true },
						{ label: "Declined", value: declined.length, red: true },
					].map((stat) => (
						<div
							key={stat.label}
							className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-1"
						>
							<p className="text-xs uppercase tracking-widest font-bold text-gray-400">
								{stat.label}
							</p>
							<p
								className="text-3xl font-serif"
								style={{
									color: stat.green
										? "#059669"
										: stat.red
											? "#dc2626"
											: "var(--color-wine)",
								}}
							>
								{stat.value}
							</p>
						</div>
					))}
				</div>

				{/* Create invite */}
				<section className="bg-white p-6 md:p-8 rounded-3xl shadow-xl">
					<h2
						className="text-xl font-serif mb-5"
						style={{ color: "var(--color-wine)" }}
					>
						Create New Invite
					</h2>
					<form onSubmit={handleCreate} className="flex flex-col gap-4">
						<div className="flex flex-col md:flex-row gap-4">
							<label className="flex flex-col gap-1.5">
								<span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
									Guest Name
								</span>
								<input
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									type="text"
									className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-base"
									style={{
										borderColor: "var(--card-border)",
										background: "var(--section-s1)",
									}}
								/>
							</label>
							<label className="flex-1 flex flex-col gap-1.5">
								<span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
									Personal Message
								</span>
								<input
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									type="text"
									className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-base"
									style={{
										borderColor: "var(--card-border)",
										background: "var(--section-s1)",
									}}
								/>
							</label>
						</div>
						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 cursor-pointer select-none">
								<input
									type="checkbox"
									checked={sent}
									onChange={(e) => setSent(e.target.checked)}
									className="w-4 h-4 rounded"
									style={{ accentColor: "var(--color-wine)" }}
								/>
								<span className="text-sm font-medium text-gray-600">
									Mark as sent
								</span>
							</label>
							<button
								disabled={createInvite.isPending}
								type="submit"
								className="px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity disabled:opacity-50"
								style={{ background: "var(--color-wine)" }}
							>
								{createInvite.isPending ? "Creating…" : "Create Invite"}
							</button>
						</div>
					</form>
				</section>

				{/* Tab switcher */}
				<div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm w-fit">
					{(["invites", "playlist"] as const).map((tab) => (
						<button
							key={tab}
							type="button"
							onClick={() => setActiveTab(tab)}
							className="px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
							style={
								activeTab === tab
									? {
											background: "var(--color-wine)",
											color: "white",
										}
									: {
											color: "var(--color-wine)",
											background: "transparent",
										}
							}
						>
							{tab === "invites"
								? `Invites (${invites.length})`
								: "DJ Playlist"}
						</button>
					))}
					<a
						href="/admin/seating"
						className="px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
						style={{ color: "var(--color-wine)", background: "transparent" }}
					>
						Seating Plan
					</a>
				</div>

				{/* Invites table */}
				{activeTab === "invites" && (
					<section className="bg-white rounded-3xl shadow-xl overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-left border-collapse">
								<thead>
									<tr
										className="text-xs tracking-widest uppercase font-bold text-gray-400"
										style={{ borderBottom: "2px solid var(--section-s2)" }}
									>
										<th className="px-6 py-4">Guest</th>
										<th className="px-6 py-4">Status</th>
										<th className="px-6 py-4">Bus</th>
										<th className="px-6 py-4">Invite</th>
										<th className="px-6 py-4">Dietary</th>
										<th className="px-6 py-4">Sent</th>
										<th className="px-6 py-4">Opened</th>
										<th className="px-6 py-4">Actions</th>
									</tr>
								</thead>
								<tbody>
									{isLoading ? (
										<tr>
											<td
												colSpan={8}
												className="px-6 py-12 text-center text-gray-300 text-sm"
											>
												Loading…
											</td>
										</tr>
									) : invites.length === 0 ? (
										<tr>
											<td
												colSpan={8}
												className="px-6 py-12 text-center text-gray-300 text-sm"
											>
												No invites yet. Create one above.
											</td>
										</tr>
									) : (
										invites.map((invite) => {
											const rsvp = invite.rsvpCollection?.edges?.[0]?.node;
											return (
												<tr
													key={invite.id}
													className="transition-colors hover:bg-[color:var(--section-s1)]"
													style={{
														borderBottom: "1px solid var(--section-s2)",
													}}
												>
													<td className="px-6 py-4">
														<p
															className="font-semibold text-base"
															style={{ color: "var(--color-wine)" }}
														>
															{invite.name}
														</p>
														{invite.message && (
															<p className="text-xs text-gray-400 truncate max-w-[160px]">
																{invite.message}
															</p>
														)}
													</td>
													<td className="px-6 py-4">
														<StatusBadge rsvp={invite.rsvpCollection} />
													</td>
													<td className="px-6 py-4">
														<BoolCell val={rsvp?.transit} />
													</td>
													<td className="px-6 py-4">
														<BoolCell val={rsvp?.physical_invite} />
													</td>
													<td className="px-6 py-4 text-sm text-gray-500 max-w-[140px] truncate">
														{rsvp?.dietary || (
															<span className="text-gray-300">—</span>
														)}
													</td>
													<td className="px-6 py-4 text-center">
														<button
															type="button"
															title={
																invite.sent
																	? "Mark as not sent"
																	: "Mark as sent"
															}
															disabled={toggleSent.isPending}
															onClick={() =>
																toggleSent.mutate({
																	id: invite.id,
																	sent: !invite.sent,
																})
															}
															className="text-lg transition-opacity hover:opacity-70 disabled:opacity-40"
														>
															{invite.sent ? (
																<span className="text-emerald-500">✓</span>
															) : (
																<span className="text-gray-300">✗</span>
															)}
														</button>
													</td>
													<td className="px-6 py-4">
														{invite.first_opened_at ? (
															<div className="flex flex-col">
																<span className="text-xs font-medium text-gray-600">
																	{new Date(
																		invite.first_opened_at,
																	).toLocaleDateString("en-NZ", {
																		day: "numeric",
																		month: "short",
																	})}
																</span>
																{(invite.open_count ?? 0) > 1 && (
																	<span className="text-xs text-gray-400">
																		{invite.open_count}×
																	</span>
																)}
															</div>
														) : (
															<span className="text-gray-300">—</span>
														)}
													</td>
													<td className="px-6 py-4">
														<div className="flex items-center gap-2">
															<button
																type="button"
																onClick={() =>
																	setSelectedInvite(invite as Invite)
																}
																className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors hover:opacity-80"
																style={{
																	background: "var(--section-s2)",
																	color: "var(--color-wine)",
																}}
															>
																View RSVP
															</button>
															<a
																href={`/i/${invite.id}`}
																target="_blank"
																rel="noreferrer"
																className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors hover:opacity-80"
																style={{
																	background: "var(--section-s2)",
																	color: "var(--color-wine)",
																}}
															>
																Link ↗
															</a>
														</div>
													</td>
												</tr>
											);
										})
									)}
								</tbody>
							</table>
						</div>
					</section>
				)}

				{/* Playlist panel */}
				{activeTab === "playlist" && <PlaylistPanel />}
			</div>

			{/* RSVP detail modal */}
			{selectedInvite && (
				<RsvpModal
					invite={selectedInvite}
					onClose={() => setSelectedInvite(null)}
				/>
			)}
		</div>
	);
}
