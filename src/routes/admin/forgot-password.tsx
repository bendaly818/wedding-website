import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase";

export const Route = createFileRoute("/admin/forgot-password")({
	component: ForgotPasswordComponent,
});

function ForgotPasswordComponent() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMsg("");
		setIsLoading(true);

		try {
			// Use browser client so the PKCE code verifier is stored in browser cookies
			const supabase = createSupabaseBrowserClient();
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/callback?next=/admin/reset-password`,
			});
			if (error) {
				setError(error.message);
			} else {
				setMsg("Password reset email sent! Please check your inbox.");
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
						Reset Password
					</h1>
					<p className="text-[color:var(--color-plum-dark)] opacity-70">
						Enter your email to receive a reset link
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

				<form onSubmit={handleReset} className="flex flex-col gap-4">
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
						disabled={isLoading || !!msg}
						className="mt-2 bg-[color:var(--color-burnt-orange)] text-[color:var(--color-eggshell)] font-bold px-6 py-4 rounded-full hover:opacity-90 uppercase tracking-widest transition-opacity cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
					>
						{isLoading ? "Sending..." : "Send Reset Link"}
					</button>
				</form>

				<div className="text-center mt-4 text-sm">
					<Link
						to="/admin/login"
						className="text-[color:var(--color-plum)] hover:underline font-bold"
					>
						Back to Login
					</Link>
				</div>
			</div>
		</main>
	);
}
