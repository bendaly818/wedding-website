import { createServerFn } from "@tanstack/react-start";
import { graphql } from "#/gql";
import { supabaseGraphqlClient } from "#/lib/supabase-graphql";

const GET_INVITE_QUERY = graphql(`
  query GetInviteDetail($id: UUID!) {
	inviteCollection(filter: { id: { eq: $id } }, first: 1) {
	  edges {
		node {
		  id
		  name
		  message
		}
	  }
	}
  }
`);

const UUID_REGEX =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getInvite = createServerFn({ method: "GET" })
	.inputValidator((id: unknown) => id as string)
	.handler(async ({ data: id }) => {
		if (!UUID_REGEX.test(id)) {
			return { success: false as const, error: "Invalid invite ID format." };
		}
		try {
			const result = await supabaseGraphqlClient.request(GET_INVITE_QUERY, {
				id,
			});
			const invite = result?.inviteCollection?.edges?.[0]?.node;
			if (!invite) {
				return { success: false as const, error: "Invite not found." };
			}
			return { success: true as const, invite };
		} catch (error) {
			console.error(
				"Failed to fetch invite:",
				error instanceof Error ? error.message : String(error),
			);
			return {
				success: false as const,
				error: "Failed to fetch invite details.",
				errorDetails: error instanceof Error ? error.message : String(error),
			};
		}
	});
