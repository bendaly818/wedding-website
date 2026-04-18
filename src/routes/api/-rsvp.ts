import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { Resend } from "resend";
import { graphql } from "#/gql";
import type { RsvpInsertInput, RsvpUpdateInput } from "#/gql/graphql";
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
		  email
		  additional_notes
		}
	  }
	}
  }
`);

const GET_INVITE_NAME_QUERY = graphql(`
  query GetInviteName($id: UUID!) {
	inviteCollection(filter: { id: { eq: $id } }, first: 1) {
	  edges {
		node {
		  name
		}
	  }
	}
  }
`);

const INSERT_RSVP_MUTATION = graphql(`
  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {
	insertIntorsvpCollection(objects: [
	  {
		invite_id: $invite_id,
		attending: $attending,
		dietary: $dietary,
		transit: $transit,
		physical_invite: $physical_invite,
		song_recommendations: $song_recommendations,
		email: $email,
		additional_notes: $additional_notes
	  }
	]) {
	  records {
		id
	  }
	}
  }
`);

const UPDATE_RSVP_MUTATION = graphql(`
  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {
	updatersvpCollection(
	  filter: { invite_id: { eq: $invite_id } }
	  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }
	) {
	  records {
		id
	  }
	}
  }
`);

async function getGuestName(invite_id: string): Promise<string> {
	try {
		const result = await supabaseGraphqlClient.request(GET_INVITE_NAME_QUERY, { id: invite_id });
		return result?.inviteCollection?.edges?.[0]?.node?.name ?? "Unknown guest";
	} catch {
		return "Unknown guest";
	}
}

async function sendRsvpNotification(
	invite_id: string,
	data: {
		attending: boolean;
		dietary?: string | null;
		song_recommendations?: string | null;
		email?: string | null;
		additional_notes?: string | null;
		transit?: boolean | null;
		physical_invite?: boolean | null;
	},
	isUpdate: boolean,
) {
	try {
		const resend = new Resend(env.RESEND_API_KEY);
		const guestName = await getGuestName(invite_id);

		const subject = isUpdate
			? `RSVP updated: ${guestName}`
			: `New RSVP: ${guestName}`;

		let songsHtml = "—";
		if (data.song_recommendations) {
			try {
				const songs: Array<{ name: string; artist: string }> = JSON.parse(data.song_recommendations);
				if (songs.length > 0) {
					songsHtml = songs
						.map((s, i) => `${i + 1}. <strong>${s.name}</strong> — ${s.artist}`)
						.join("<br>");
				}
			} catch {
				songsHtml = data.song_recommendations;
			}
		}

		const rows: [string, string][] = [
			["Attending", data.attending ? "Yes 🎉" : "No"],
			["Songs", songsHtml],
			["Dietary", data.dietary || "—"],
			["Notes", data.additional_notes || "—"],
			["Guest email", data.email || "—"],
			["Shuttle", data.transit === true ? "Yes" : data.transit === false ? "No" : "—"],
			["Physical invite", data.physical_invite === true ? "Yes" : data.physical_invite === false ? "No" : "—"],
		];

		const tableRows = rows
			.map(
				([label, value]) =>
					`<tr><td style="padding:6px 12px;font-weight:600;color:#6b1535;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px">${value}</td></tr>`,
			)
			.join("");

		await resend.emails.send({
			from: "rsvp@dalys.xyz",
			to: "bendaly0403@gmail.com",
			subject,
			html: `
				<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#2a1a1a">
					<h2 style="color:#6b1535;margin-bottom:4px">${subject}</h2>
					<p style="color:#888;margin-top:0;font-size:13px">${isUpdate ? "They updated their RSVP." : "A new RSVP just came in."}</p>
					<table style="border-collapse:collapse;width:100%;background:#faf7f4;border-radius:8px;overflow:hidden">
						${tableRows}
					</table>
				</div>
			`,
		});
	} catch (error) {
		// Non-fatal — log but don't fail the RSVP submission
		console.error("Failed to send RSVP notification email:", error);
	}
}

export const getRsvp = createServerFn({ method: "GET" })
	.inputValidator((invite_id: unknown) => invite_id as string)
	.handler(async ({ data: invite_id }) => {
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
	});

export const submitRsvp = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => data as RsvpInsertInput)
	.handler(async ({ data }) => {
		const {
			invite_id,
			attending,
			dietary,
			transit,
			physical_invite,
			song_recommendations,
			email,
			additional_notes,
		} = data;
		try {
			await supabaseGraphqlClient.request(INSERT_RSVP_MUTATION, {
				invite_id,
				attending: !!attending,
				dietary: dietary || null,
				transit: transit ?? null,
				physical_invite: physical_invite ?? null,
				song_recommendations: song_recommendations || null,
				email: email || null,
				additional_notes: additional_notes || null,
			});
			await sendRsvpNotification(
				invite_id,
				{ attending: !!attending, dietary, transit, physical_invite, song_recommendations, email, additional_notes },
				false,
			);
			return { success: true };
		} catch (error) {
			console.error("Failed to save RSVP:", error);
			return { success: false, error: "Failed to save RSVP." };
		}
	});

export const updateRsvp = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => data as RsvpUpdateInput)
	.handler(async ({ data }) => {
		const {
			invite_id,
			attending,
			dietary,
			transit,
			physical_invite,
			song_recommendations,
			email,
			additional_notes,
		} = data;
		try {
			const result: any = await supabaseGraphqlClient.request(
				UPDATE_RSVP_MUTATION,
				{
					invite_id,
					attending: !!attending,
					dietary: dietary || null,
					transit: transit ?? null,
					physical_invite: physical_invite ?? null,
					song_recommendations: song_recommendations || null,
					email: email || null,
					additional_notes: additional_notes || null,
				},
			);
			const updated = result?.updatersvpCollection?.records?.length ?? 0;
			if (!updated) {
				console.error("updateRsvp: no rows matched", invite_id);
				return { success: false, error: "RSVP record not found." };
			}
			await sendRsvpNotification(
				invite_id,
				{ attending: !!attending, dietary, transit, physical_invite, song_recommendations, email, additional_notes },
				true,
			);
			return { success: true };
		} catch (error) {
			console.error("Failed to update RSVP:", error);
			return { success: false, error: "Failed to update RSVP." };
		}
	});
