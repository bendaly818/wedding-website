import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthUser } from "../api/-admin";
import { exchangeSpotifyCode } from "../api/-spotify-playlist";

export const Route = createFileRoute("/admin/spotify-callback")({
	beforeLoad: async () => {
		const user = await getAuthUser();
		if (!user) throw redirect({ to: "/admin/login" });
	},
	loaderDeps: ({ search }) => search as { code?: string; error?: string },
	loader: async ({ deps }) => {
		if (deps.error || !deps.code) {
			return { success: false, error: deps.error ?? "No code returned" };
		}
		try {
			await exchangeSpotifyCode({ data: { code: deps.code } });
			return { success: true };
		} catch (e) {
			return {
				success: false,
				error: e instanceof Error ? e.message : String(e),
			};
		}
	},
	component: SpotifyCallback,
});

function SpotifyCallback() {
	const { success, error } = Route.useLoaderData();

	if (success) {
		// Redirect after a brief success message
		if (typeof window !== "undefined") {
			setTimeout(() => {
				window.location.href = "/admin";
			}, 1500);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[color:var(--color-blush-light)]">
			<div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-sm">
				{success ? (
					<>
						<div className="text-5xl mb-4">🎵</div>
						<h1 className="text-2xl font-serif text-[color:var(--color-wine)] mb-2">
							Spotify Connected!
						</h1>
						<p className="text-sm text-gray-500">Redirecting back to dashboard…</p>
					</>
				) : (
					<>
						<div className="text-5xl mb-4">⚠️</div>
						<h1 className="text-2xl font-serif text-[color:var(--color-wine)] mb-2">
							Connection Failed
						</h1>
						<p className="text-sm text-gray-500 mb-6">{error}</p>
						<a
							href="/admin"
							className="inline-block px-6 py-2 rounded-lg bg-[color:var(--color-wine)] text-white text-sm font-bold uppercase tracking-widest"
						>
							Back to Dashboard
						</a>
					</>
				)}
			</div>
		</div>
	);
}
