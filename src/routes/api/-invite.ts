import { supabaseGraphqlClient } from "#/lib/supabase-graphql";
import { graphql } from "#/gql";

const GET_INVITE_QUERY = graphql(`
  query GetInviteDetail($id: UUID!) {
	inviteCollection(filter: { id: { eq: $id } }, first: 1) {
	  edges {
		node {
		  id
		  name
		}
	  }
	}
  }
`);

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getInvite(id: string) {
	if (!UUID_REGEX.test(id)) {
		return { success: false, error: "Invalid invite ID format." };
	}
	try {
		const result: any = await supabaseGraphqlClient.request(GET_INVITE_QUERY, { id });
		const invite = result?.inviteCollection?.edges?.[0]?.node;
		if (!invite) {
			return { success: false, error: "Invite not found." };
		}
		return { success: true, invite };
	} catch (error) {
		console.error("Failed to fetch invite:", error);
		return { success: false, error: "Failed to fetch invite details." };
	}
}
