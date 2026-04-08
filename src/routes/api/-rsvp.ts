import { graphql } from "#/gql";
import { RsvpInsertInput, RsvpUpdateInput } from "#/gql/graphql";
import { supabaseGraphqlClient } from "#/lib/supabase-graphql";

const GET_RSVP_QUERY = graphql(`
  query GetRsvp($invite_id: UUID!) {
	rsvpCollection(filter: { invite_id: { eq: $invite_id } }, first: 1) {
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
`);

const INSERT_RSVP_MUTATION = graphql(`
  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String) {
	insertIntorsvpCollection(objects: [
	  {
		invite_id: $invite_id,
		attending: $attending,
		dietary: $dietary,
		transit: $transit,
		physical_invite: $physical_invite,
		song_recommendations: $song_recommendations
	  }
	]) {
	  records {
		id
	  }
	}
  }
`);

const UPDATE_RSVP_MUTATION = graphql(`
  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String) {
	updatersvpCollection(
	  filter: { invite_id: { eq: $invite_id } }
	  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations }
	) {
	  records {
		id
	  }
	}
  }
`);

export async function getRsvp(invite_id: string) {
	try {
		const result = await supabaseGraphqlClient.request(GET_RSVP_QUERY, {
			invite_id,
		});
		const node = result?.rsvpCollection?.edges?.[0]?.node;
		return node ?? null;
	} catch (error) {
		console.error("Failed to fetch RSVP:", error);
		return null;
	}
}

export async function submitRsvp({
	invite_id,
	attending,
	dietary,
	transit,
	physical_invite,
	song_recommendations,
}: RsvpInsertInput) {
	try {
		await supabaseGraphqlClient.request(INSERT_RSVP_MUTATION, {
			invite_id,
			attending: !!attending,
			dietary: dietary || null,
			transit: transit ?? null,
			physical_invite: physical_invite ?? null,
			song_recommendations: song_recommendations || null,
		});
		return { success: true };
	} catch (error) {
		console.error("Failed to save RSVP:", error);
		return { success: false, error: "Failed to save RSVP." };
	}
}

export async function updateRsvp({
	invite_id,
	attending,
	dietary,
	transit,
	physical_invite,
	song_recommendations,
}: RsvpUpdateInput) {
	try {
		const data: any = await supabaseGraphqlClient.request(
			UPDATE_RSVP_MUTATION,
			{
				invite_id,
				attending: !!attending,
				dietary: dietary || null,
				transit: transit ?? null,
				physical_invite: physical_invite ?? null,
				song_recommendations: song_recommendations || null,
			},
		);
		const updated = data?.updatersvpCollection?.records?.length ?? 0;
		if (!updated) {
			console.error("updateRsvp: no rows matched", invite_id);
			return { success: false, error: "RSVP record not found." };
		}
		return { success: true };
	} catch (error) {
		console.error("Failed to update RSVP:", error);
		return { success: false, error: "Failed to update RSVP." };
	}
}
