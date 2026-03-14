import { createServerFn } from "@tanstack/react-start";
import { gql } from "graphql-request";
import { supabaseGraphqlClient } from "../../lib/supabase-graphql";

type RsvpInput = {
  invite_id: string; // Changed from name to invite_id
  attending: string;
  dietary?: string;
};

// Assuming an rsvps table with a foreign key to invites
const INSERT_RSVP_MUTATION = gql`
  mutation InsertRsvp($invite_id: UUID!, $attending: String!, $dietary: String) {
    insertIntorsvpCollection(objects: [
      {
        invite_id: $invite_id,
        attending: $attending,
        dietary: $dietary
      }
    ]) {
      records {
        id
      }
    }
  }
`;

export const submitRsvp = createServerFn({ method: "POST" })
	.inputValidator((data: unknown): RsvpInput => {
		return data as RsvpInput;
	})
	.handler(async ({ data }) => {
		try {
			// Execute the Supabase GraphQL mutation
			await supabaseGraphqlClient.request(INSERT_RSVP_MUTATION, {
				invite_id: data.invite_id,
				attending: data.attending,
				dietary: data.dietary,
			});

			return { success: true };
		} catch (error) {
			console.error("Failed to save RSVP to Supabase:", error);
			return { success: false, error: "Failed to save RSVP." };
		}
	});
