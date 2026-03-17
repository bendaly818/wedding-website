import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";
import { createSupabaseServerClient } from "../../lib/supabase";

export const loginWithPasswordFn = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) => data as { email?: string; password?: string },
	)
	.handler(async ({ data }) => {
		try {
			const supabase = await createSupabaseServerClient(getRequest());
			const { error, data: authData } = await supabase.auth.signInWithPassword({
				email: data.email || "",
				password: data.password || "",
			});
			if (error) {
				return { success: false, error: error.message };
			}
			// Return tokens so the client can set them as cookies.
			// TanStack server fn responses don't forward Set-Cookie headers,
			// so we must set cookies from the browser side.
			return {
				success: true,
				access_token: authData.session?.access_token,
				refresh_token: authData.session?.refresh_token,
			};
		} catch (error: unknown) {
			const err = error as Error;
			return { success: false, error: err.message || "An error occurred" };
		}
	});

export const loginWithMagicLinkFn = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) => data as { email?: string; origin?: string },
	)
	.handler(async ({ data }) => {
		try {
			const supabase = await createSupabaseServerClient(getRequest());
			const { error } = await supabase.auth.signInWithOtp({
				email: data.email || "",
				options: {
					emailRedirectTo: `${data.origin || ""}/auth/callback`,
				},
			});

			if (error) {
				return { success: false, error: error.message };
			}
			return { success: true };
		} catch (error: unknown) {
			const err = error as Error;
			return { success: false, error: err.message || "An error occurred" };
		}
	});

export const Route = createFileRoute("/admin/login")({
	component: AdminLoginComponent,
});

function AdminLoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [mode, setMode] = useState<"password" | "magiclink">("password");
	const router = useRouter();

	const handlePasswordLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMsg("");
		setIsLoading(true);

		try {
			const res = await loginWithPasswordFn({ data: { email, password } });
			if (res.success && res.access_token && res.refresh_token) {
				// Use the browser client's setSession() so cookies are written in the
				// correct sb-<project-ref>-auth-token format that the server client reads.
				const supabase = createSupabaseBrowserClient();
				await supabase.auth.setSession({
					access_token: res.access_token,
					refresh_token: res.refresh_token,
				});
				router.navigate({ to: "/admin" });
			} else {
				setError(res.error || "Login failed");
			}
		} catch (e: unknown) {
			const err = e as Error;
			setError(err.message || "Network error");
		} finally {
			setIsLoading(false);

		}
	};

	const handleMagicLinkLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMsg("");
		setIsLoading(true);

		try {
			const res = await loginWithMagicLinkFn({
				data: { email, origin: window.location.origin },
			});
			if (res.success) {
				setMsg("Magic link sent! Please check your email.");
			} else {
				setError(res.error || "Failed to send magic link");
			}
		} catch (e: unknown) {
			const err = e as Error;
			setError(err.message || "Network error");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center p-4 bg-[color:var(--color-eggshell)] text-[color:var(--color-plum)]">
			<div className="max-w-md w-full p-8 bg-white/50 backdrop-blur-md border border-[color:var(--color-plum)]/10 rounded-3xl shadow-xl flex flex-col gap-6">
				<div className="text-center mb-2">
					<h1 className="text-4xl font-serif text-[color:var(--color-plum)] mb-2">
						Admin Area
					</h1>
					<p className="text-[color:var(--color-plum-dark)] opacity-70">
						Please sign in to manage invites
					</p>
				</div>

				{error && (
					<div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-center shadow-sm text-sm">
						{error}
					</div>
				)}
				{msg && (
					<div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-center shadow-sm text-sm border-l-4 border-l-green-500">
						{msg}
					</div>
				)}

				<div className="flex bg-gray-100 p-1 rounded-xl">
					<button
						type="button"
						onClick={() => setMode("password")}
						className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors ${
							mode === "password"
								? "bg-white text-[color:var(--color-plum)] shadow-sm"
								: "text-gray-500 hover:text-[color:var(--color-plum)]"
						}`}
					>
						Password
					</button>
					<button
						type="button"
						onClick={() => setMode("magiclink")}
						className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors ${
							mode === "magiclink"
								? "bg-white text-[color:var(--color-plum)] shadow-sm"
								: "text-gray-500 hover:text-[color:var(--color-plum)]"
						}`}
					>
						Magic Link
					</button>
				</div>

				{mode === "password" ? (
					<form onSubmit={handlePasswordLogin} className="flex flex-col gap-4">
						<label className="flex flex-col gap-2">
							<span className="font-bold uppercase text-xs tracking-wider opacity-80">
								Email
							</span>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="p-4 border border-[color:var(--color-plum)]/20 rounded-xl focus:ring-2 focus:ring-[color:var(--color-burnt-orange)] outline-none bg-white transition-shadow"
							/>
						</label>

						<label className="flex flex-col gap-2">
							<span className="font-bold uppercase text-xs tracking-wider opacity-80">
								Password
							</span>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="p-4 border border-[color:var(--color-plum)]/20 rounded-xl focus:ring-2 focus:ring-[color:var(--color-burnt-orange)] outline-none bg-white transition-shadow"
							/>
						</label>

						<div className="flex justify-between items-center mt-2">
							<button
								type="submit"
								disabled={isLoading}
								className="bg-[color:var(--color-burnt-orange)] text-[color:var(--color-eggshell)] font-bold px-6 py-3 rounded-full hover:opacity-90 uppercase tracking-widest transition-opacity cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
							>
								{isLoading ? "Signing In..." : "Sign In with Password"}
							</button>
							<Link
								to="/admin/forgot-password"
								className="text-sm font-bold text-[color:var(--color-plum)] hover:underline"
							>
								Forgot Password?
							</Link>
						</div>
					</form>
				) : (
					<form onSubmit={handleMagicLinkLogin} className="flex flex-col gap-4">
						<label className="flex flex-col gap-2">
							<span className="font-bold uppercase text-xs tracking-wider opacity-80">
								Email
							</span>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="p-4 border border-[color:var(--color-plum)]/20 rounded-xl focus:ring-2 focus:ring-[color:var(--color-burnt-orange)] outline-none bg-white transition-shadow"
							/>
						</label>

						<button
							type="submit"
							disabled={isLoading}
							className="mt-2 bg-[color:var(--color-burnt-orange)] text-[color:var(--color-eggshell)] font-bold px-6 py-4 rounded-full hover:opacity-90 uppercase tracking-widest transition-opacity cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
						>
							{isLoading ? "Sending..." : "Send Magic Link"}
						</button>
					</form>
				)}
			</div>
		</main>
	);
}
