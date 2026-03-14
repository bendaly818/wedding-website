import { createServerFn } from "@tanstack/react-start";
import { gql } from "graphql-request";
import { supabaseGraphqlClient } from "../../lib/supabase-graphql";

// This is a guess at the GraphQL schema based on standard Supabase GraphQL generation
// We request the invite details to verify the ID exists and fetch the guest's name
const GET_INVITE_QUERY = gql`
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
`;

export const getInvite = createServerFn({ method: "GET" })
	.inputValidator((id: unknown): string => {
		return id as string;
	})
	.handler(async ({ data: id }) => {
		try {
			const result: any = await supabaseGraphqlClient.request(GET_INVITE_QUERY, {
				id,
			});

			const invite = result?.inviteCollection?.edges?.[0]?.node;
			
			if (!invite) {
			  return { success: false, error: "Invite not found." };
			}

			return { success: true, invite };
		} catch (error) {
			console.error("Failed to fetch invite:", error);
			return { success: false, error: "Failed to fetch invite details." };
		}
	});
