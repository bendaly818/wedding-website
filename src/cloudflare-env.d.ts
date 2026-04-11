// Augments the auto-generated Cloudflare.Env interface with secrets
// that are not in wrangler.jsonc (set via `wrangler secret put`).
declare namespace Cloudflare {
	interface Env {
		SPOTIFY_CLIENT_ID: string;
		SPOTIFY_CLIENT_SECRET: string;
		SPOTIFY_REDIRECT_URI: string;
		SUPABASE_URL: string;
		SUPABASE_SECRET_KEY: string;
	}
}
