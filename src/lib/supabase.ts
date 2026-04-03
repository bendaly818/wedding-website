import { env } from "cloudflare:workers";
import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";

export async function createSupabaseServerClient(request: Request) {
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
