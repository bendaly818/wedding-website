import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useState } from "react";
import { createSupabaseServerClient } from "../../lib/supabase";

export const updatePasswordFn = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => data as { password?: string })
	.handler(async ({ data }) => {
		try {
			const supabase = await createSupabaseServerClient(getRequest());
			// Ensure the user is authenticated since updateUser updates the currently logged in user
			const { error } = await supabase.auth.updateUser({
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

export const Route = createFileRoute("/admin/reset-password")({
	component: ResetPasswordComponent,
});

function ResetPasswordComponent() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const res = await updatePasswordFn({
				data: { password },
			});
			if (res.success) {
				// Redirect to admin dashboard on success
				router.navigate({ to: "/admin" });
			} else {
				setError(res.error || "Failed to update password");
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
						Set New Password
					</h1>
					<p className="text-[color:var(--color-plum-dark)] opacity-70">
						Please enter your new password
					</p>
				</div>

				{error && (
					<div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-center shadow-sm text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleReset} className="flex flex-col gap-4">
					<label className="flex flex-col gap-2">
						<span className="font-bold uppercase text-xs tracking-wider opacity-80">
							New Password
						</span>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="p-4 border border-[color:var(--color-plum)]/20 rounded-xl focus:ring-2 focus:ring-[color:var(--color-burnt-orange)] outline-none bg-white transition-shadow"
						/>
					</label>

					<button
						type="submit"
						disabled={isLoading || !password}
						className="mt-2 bg-[color:var(--color-burnt-orange)] text-[color:var(--color-eggshell)] font-bold px-6 py-4 rounded-full hover:opacity-90 uppercase tracking-widest transition-opacity cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
					>
						{isLoading ? "Updating..." : "Update Password"}
					</button>
				</form>
			</div>
		</main>
	);
}
