import { createBrowserClient } from "@supabase/ssr";

// Browser-only client — uses VITE_ env vars (import.meta.env), safe for client bundles.
// Do NOT import cloudflare:workers here.
export function createSupabaseBrowserClient() {
	return createBrowserClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
	);
}
