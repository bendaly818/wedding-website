import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useState } from "react";
import {
	createSupabaseBrowserClient,
	createSupabaseServerClient,
} from "../../lib/supabase";

export const loginWithPasswordFn = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) => data as { email?: string; password?: string },
	)
	.handler(async ({ data }) => {
		try {
			const supabase = createSupabaseServerClient(getRequest());
			const { error } = await supabase.auth.signInWithPassword({
				email: data.email || "",
				password: data.password || "",
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

export const loginWithMagicLinkFn = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) => data as { email?: string; origin?: string },
	)
	.handler(async ({ data }) => {
		try {
			const supabase = createSupabaseServerClient(getRequest());
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
			if (res.success) {
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

	const handleGoogleLogin = async () => {
		setError("");
		setMsg("");
		setIsLoading(true);

		try {
			// Use browser client so PKCE verifier is stored in browser cookies directly
			const supabase = createSupabaseBrowserClient();
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
				},
			});
			if (error) {
				setError(error.message || "Google login failed");
				setIsLoading(false);
			}
			// On success, supabase redirects automatically
		} catch (e: unknown) {
			const err = e as Error;
			setError(err.message || "Network error");
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

				<div className="relative flex items-center py-4">
					<div className="flex-grow border-t border-[color:var(--color-plum)]/20" />
					<span className="flex-shrink-0 mx-4 text-[color:var(--color-plum-dark)]/50 text-xs font-bold uppercase tracking-widest">
						Or continue with
					</span>
					<div className="flex-grow border-t border-[color:var(--color-plum)]/20" />
				</div>

				<button
					type="button"
					onClick={handleGoogleLogin}
					disabled={isLoading}
					className="bg-white text-gray-700 border border-gray-200 font-bold px-6 py-4 rounded-full hover:bg-gray-50 uppercase tracking-widest transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
				>
					<svg
						className="w-5 h-5"
						viewBox="0 0 24 24"
						role="img"
						aria-label="Google logo"
					>
						<title>Google Logo</title>
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					Sign In with Google
				</button>
			</div>
		</main>
	);
}
