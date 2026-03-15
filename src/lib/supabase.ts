import { env } from "cloudflare:workers";
import {
	createBrowserClient,
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const VITE_SUPABASE_PUBLISHABLE_KEY = import.meta.env
	.VITE_SUPABASE_PUBLISHABLE_KEY as string;

// Browser client: stores PKCE code verifier in cookies automatically.
// Use this for any auth flows initiated in the browser (e.g. OAuth, password reset).
export function createSupabaseBrowserClient() {
	return createBrowserClient(SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY);
}

export function createSupabaseServerClient(request: Request) {
	const headers = new Headers();
	return createServerClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
		cookies: {
			getAll() {
				return parseCookieHeader(request.headers.get("Cookie") ?? "").map(
					(cookie) => ({
						name: cookie.name,
						value: cookie.value ?? "",
					}),
				);
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) => {
					headers.append("Set-Cookie", serializeCookieHeader(name, value, {}));
				});
			},
		},
	});
}
