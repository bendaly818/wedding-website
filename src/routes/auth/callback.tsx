import type { EmailOtpType } from "@supabase/supabase-js";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "#/lib/supabase-browser";
import { createSupabaseServerClient } from "../../lib/supabase";

const exchangeAuthCode = createServerFn({ method: "GET" })
	.inputValidator(
		(data: unknown) =>
			data as {
				code?: string;
				token_hash?: string;
				type?: string;
				next?: string;
			},
	)
	.handler(async ({ data }) => {
		const supabase = await createSupabaseServerClient(getRequest());

		if (data.token_hash && data.type) {
			const { data: authData, error } = await supabase.auth.verifyOtp({
				token_hash: data.token_hash,
				type: data.type as EmailOtpType,
			});
			if (error) {
				return { success: false, error: error.message };
			}
			return {
				success: true,
				access_token: authData.session?.access_token,
				refresh_token: authData.session?.refresh_token,
				next: data.next || "/admin",
			};
		}

		if (data.code) {
			const { data: authData, error } =
				await supabase.auth.exchangeCodeForSession(data.code);
			if (error) {
				return { success: false, error: error.message };
			}
			return {
				success: true,
				access_token: authData.session?.access_token,
				refresh_token: authData.session?.refresh_token,
				next: data.next || "/admin",
			};
		}

		return {
			success: false,
			error: "No code or token provided for authentication.",
		};
	});

export const Route = createFileRoute("/auth/callback")({
	component: AuthCallbackComponent,
});

function AuthCallbackComponent() {
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get("code") ?? undefined;
		const token_hash = params.get("token_hash") ?? undefined;
		const type = params.get("type") ?? undefined;
		const next = params.get("next") ?? "/admin";

		exchangeAuthCode({ data: { code, token_hash, type, next } })
			.then(async (res) => {
				if (res.success && res.access_token && res.refresh_token) {
					// Use setSession() so cookies are written in the correct
					// sb-<project-ref>-auth-token format that the server client reads.
					const supabase = createSupabaseBrowserClient();
					await supabase.auth.setSession({
						access_token: res.access_token,
						refresh_token: res.refresh_token,
					});
					navigate({ to: res.next ?? "/admin" });
				} else {
					setErrorMsg(res.error ?? "Authentication failed.");
					setTimeout(() => navigate({ to: "/admin/login" }), 3000);
				}
			})
			.catch((e: Error) => {
				setErrorMsg(e.message || "Authentication failed.");
				setTimeout(() => navigate({ to: "/admin/login" }), 3000);
			});
	}, [navigate]);

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
