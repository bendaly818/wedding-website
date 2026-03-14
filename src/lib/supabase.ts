import { createServerClient } from "@supabase/ssr";
import { getCookie, setCookie } from "vinxi/http";

export function createSupabaseServerClient() {
	return createServerClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					// Minimal implementation, getCookie inside Server Functions doesn't let us iterate all
					return [];
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) => {
							setCookie(name, value, options);
						});
					} catch (e) {
						// Ignored for Server Components
					}
				},
			},
		},
	);
}
