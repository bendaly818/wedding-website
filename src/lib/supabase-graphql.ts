import { GraphQLClient } from "graphql-request";

const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`;

// Ensure environment variables are loaded (they should be via Vite/TanStack Start, but good to check)
if (
	!import.meta.env.VITE_SUPABASE_URL ||
	!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
) {
	console.warn(
		"Missing Supabase environment variables - ensure SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are set.",
	);
}

export const supabaseGraphqlClient = new GraphQLClient(endpoint, {
	headers: {
		apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "",
	},
});
