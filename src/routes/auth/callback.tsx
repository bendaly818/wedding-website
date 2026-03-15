import type { EmailOtpType } from "@supabase/supabase-js";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createSupabaseServerClient } from "../../lib/supabase";

export const Route = createFileRoute("/auth/callback")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const supabase = createSupabaseServerClient(request);
				const url = new URL(request.url);
				const code = url.searchParams.get("code");
				const token_hash = url.searchParams.get("token_hash");
				const type = url.searchParams.get("type") as EmailOtpType;
				const next = url.searchParams.get("next") || "/admin";

				if (token_hash && type) {
					const { error } = await supabase.auth.verifyOtp({
						token_hash,
						type,
					});
					if (!error) {
						throw redirect({ to: next });
					} else {
						console.error("Auth callback OTP error:", error);
						throw redirect({
							to: "/admin/login",
							search: { error: error.message },
						});
					}
				}

				if (code) {
					const { error } = await supabase.auth.exchangeCodeForSession(code);
					if (!error) {
						throw redirect({ to: next });
					} else {
						console.error("Auth callback code error:", error);
						throw redirect({
							to: "/admin/login",
							search: { error: error.message },
						});
					}
				}

				throw redirect({
					to: "/admin/login",
					search: { error: "No code or token provided for authentication." },
				});
			},
		},
	},
	component: AuthCallbackComponent,
});

function AuthCallbackComponent() {
	const router = useRouter();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// Fallback UI in case loader somehow doesn't redirect or runs on client
	// usually shouldn't happen if `beforeLoad`/`loader` works as expected on the server
	useEffect(() => {
		setErrorMsg("No code or token provided for authentication.");
		const timeout = setTimeout(() => {
			router.navigate({
				to: "/admin/login",
				search: { error: "No code or token provided for authentication." },
			});
		}, 3000);
		return () => clearTimeout(timeout);
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-[color:var(--color-eggshell)] p-4">
			<div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center flex flex-col items-center gap-4">
				{errorMsg ? (
					<>
						<h1 className="text-2xl font-serif text-red-600">
							Authentication Failed
						</h1>
						<p className="text-gray-600 mb-2">{errorMsg}</p>
						<p className="text-sm text-gray-400">Redirecting to login...</p>
					</>
				) : (
					<>
						<div className="w-12 h-12 border-4 border-gray-200 border-t-[color:var(--color-burnt-orange)] rounded-full animate-spin" />
						<h1 className="text-2xl font-serif text-[color:var(--color-plum)] mt-4">
							Authenticating...
						</h1>
						<p className="text-gray-500">
							Please wait while we verify your session.
						</p>
					</>
				)}
			</div>
		</div>
	);
}
