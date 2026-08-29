import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { graphql } from "#/gql";
import type { GetAllInvitesQuery } from "#/gql/graphql";
import { createSupabaseServerClient } from "../../lib/supabase";
import { supabaseGraphqlClient } from "../../lib/supabase-graphql";

/** Authenticates the request via Supabase Auth server (safe, not cookie-only). */
export async function getAuthContext() {
	const supabase = await createSupabaseServerClient(getRequest());
	const {
		data: { user },
	} = await supabase.auth.getUser();
	// Session is needed only for its access_token (used in GraphQL headers).
	// getUser() already validated the token; we just need the token string.
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return { user, accessToken: session?.access_token ?? null };
}

export const getAuthUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const { user } = await getAuthContext();
		return user ?? null;
	},
);

const GET_ALL_INVITES = graphql(`
  query GetAllInvites {
    inviteCollection(orderBy: [{ created_at: DescNullsLast }]) {
      edges {
        node {
          id
          name
          message
          sent
          first_opened_at
          open_count
		  rsvpCollection {
			edges {
				node {
					id
					attending
					dietary
					transit
					physical_invite
					song_recommendations
				}
			}
		  }
        }
      }
    }
  }
`);

export const getAllInvites = createServerFn({ method: "GET" }).handler(
	async () => {
		const { user, accessToken } = await getAuthContext();
		if (!user) throw new Error("Unauthorized");

		try {
			const res = await supabaseGraphqlClient.request<GetAllInvitesQuery>(
				GET_ALL_INVITES,
				{},
				{ Authorization: `Bearer ${accessToken}` },
			);
			return res.inviteCollection?.edges?.map((e) => e.node) || [];
		} catch (e) {
			console.error(e);
			return [];
		}
	},
);
