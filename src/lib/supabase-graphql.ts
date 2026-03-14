import { GraphQLClient } from 'graphql-request'

const endpoint = `${process.env.SUPABASE_URL}/graphql/v1`

// Ensure environment variables are loaded (they should be via Vite/TanStack Start, but good to check)
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables - ensure SUPABASE_URL and SUPABASE_ANON_KEY are set.');
}

export const supabaseGraphqlClient = new GraphQLClient(endpoint, {
  headers: {
    apikey: process.env.SUPABASE_ANON_KEY || '',
    Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY || ''}`,
  },
})
