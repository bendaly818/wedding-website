import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "../../lib/supabase";

export const loginServerFn = createServerFn({ method: "POST" })
	.inputValidator((data: any) => data)
	.handler(async ({ data }) => {
		try {
			const supabase = createSupabaseServerClient();
			const { error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password,
			});

			if (error) {
				return { success: false, error: error.message };
			}
			return { success: true };
		} catch (error: any) {
			return { success: false, error: error.message || "An error occurred" };
		}
	});

export const Route = createFileRoute("/admin/login")({
	component: AdminLoginComponent,
});

function AdminLoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const res = await loginServerFn({ data: { email, password } });
			if (res.success) {
				router.navigate({ to: "/admin" });
			} else {
				setError(res.error || "Login failed");
			}
		} catch (e: any) {
			setError(e.message || "Network error");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center p-4 bg-[color:var(--color-eggshell)] text-[color:var(--color-plum)]">
			<form
				onSubmit={handleLogin}
				className="max-w-md w-full p-8 bg-white/50 backdrop-blur-md border border-[color:var(--color-plum)]/10 rounded-3xl shadow-xl flex flex-col gap-6"
			>
				<div className="text-center mb-2">
					<h1 className="text-4xl font-serif text-[color:var(--color-plum)] mb-2">
						Admin Area
					</h1>
					<p className="text-[color:var(--color-plum-dark)] opacity-70">
						Please sign in to manage invites
					</p>
				</div>

				{error && (
					<div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-center shadow-sm">
						{error}
					</div>
				)}

				<div className="flex flex-col gap-4">
					<label className="flex flex-col gap-2">
						<span className="font-bold uppercase text-xs tracking-wider opacity-80">
							Email
						</span>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoFocus
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
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="mt-4 bg-[color:var(--color-burnt-orange)] text-[color:var(--color-eggshell)] font-bold px-6 py-4 rounded-full hover:opacity-90 uppercase tracking-widest transition-opacity cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
				>
					{isLoading ? "Signing In..." : "Sign In"}
				</button>
			</form>
		</main>
	);
}
