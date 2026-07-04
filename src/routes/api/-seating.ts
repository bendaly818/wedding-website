import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { graphql } from "#/gql";
import type {
	GetSeatingPlanQuery,
	Seating_ElementInsertInput,
	Seating_ElementUpdateInput,
} from "#/gql/graphql";
import { createSupabaseServerClient } from "#/lib/supabase";
import { supabaseGraphqlClient } from "#/lib/supabase-graphql";

/** Authenticates the request via Supabase Auth server (same pattern as admin dashboard). */
async function getAuthContext() {
	const supabase = await createSupabaseServerClient(getRequest());
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return { user, accessToken: session?.access_token ?? null };
}

async function requireAuth() {
	const { user, accessToken } = await getAuthContext();
	if (!user || !accessToken) throw new Error("Unauthorized");
	return { Authorization: `Bearer ${accessToken}` };
}

// ── Queries ────────────────────────────────────────────────────────

const GET_SEATING_PLAN = graphql(`
  query GetSeatingPlan {
    seating_elementCollection(orderBy: [{ created_at: AscNullsLast }], first: 200) {
      edges {
        node {
          id
          kind
          label
          x
          y
          width
          height
          rotation
          seats_top
          seats_right
          seats_bottom
          seats_left
          seat_offsets
        }
      }
    }
    guestCollection(orderBy: [{ full_name: AscNullsLast }], first: 200) {
      edges {
        node {
          id
          full_name
          invite_id
          invite {
            id
            name
            rsvpCollection {
              edges {
                node {
                  attending
                }
              }
            }
          }
        }
      }
    }
    seat_assignmentCollection(first: 200) {
      edges {
        node {
          id
          element_id
          guest_id
          seat_index
        }
      }
    }
  }
`);

export type SeatingElement = NonNullable<
	GetSeatingPlanQuery["seating_elementCollection"]
>["edges"][number]["node"];
export type SeatingGuest = NonNullable<
	GetSeatingPlanQuery["guestCollection"]
>["edges"][number]["node"];
export type SeatAssignment = NonNullable<
	GetSeatingPlanQuery["seat_assignmentCollection"]
>["edges"][number]["node"];

export const getSeatingPlan = createServerFn({ method: "GET" }).handler(
	async () => {
		const res = await supabaseGraphqlClient.request(GET_SEATING_PLAN);
		return {
			elements: res.seating_elementCollection?.edges.map((e) => e.node) ?? [],
			guests: res.guestCollection?.edges.map((e) => e.node) ?? [],
			assignments:
				res.seat_assignmentCollection?.edges.map((e) => e.node) ?? [],
		};
	},
);

// ── Element mutations ──────────────────────────────────────────────

const CREATE_ELEMENT_MUTATION = graphql(`
  mutation CreateSeatingElement($objects: [seating_elementInsertInput!]!) {
    insertIntoseating_elementCollection(objects: $objects) {
      records {
        id
        kind
        label
        x
        y
        width
        height
        rotation
        seats_top
        seats_right
        seats_bottom
        seats_left
        seat_offsets
      }
    }
  }
`);

const UPDATE_ELEMENT_MUTATION = graphql(`
  mutation UpdateSeatingElement($id: UUID!, $set: seating_elementUpdateInput!) {
    updateseating_elementCollection(filter: { id: { eq: $id } }, set: $set) {
      affectedCount
    }
  }
`);

const DELETE_ELEMENT_MUTATION = graphql(`
  mutation DeleteSeatingElement($id: UUID!) {
    deleteFromseating_elementCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`);

export const createElement = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => data as Seating_ElementInsertInput)
	.handler(async ({ data }) => {
		const headers = await requireAuth();
		const res = await supabaseGraphqlClient.request(
			CREATE_ELEMENT_MUTATION,
			{ objects: [data] },
			headers,
		);
		return res.insertIntoseating_elementCollection?.records[0] ?? null;
	});

/** Batch geometry/seat-count save — autosave target. */
export const saveElements = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) =>
			data as Array<{ id: string } & Seating_ElementUpdateInput>,
	)
	.handler(async ({ data }) => {
		const headers = await requireAuth();
		await Promise.all(
			data.map(({ id, ...set }) =>
				supabaseGraphqlClient.request(
					UPDATE_ELEMENT_MUTATION,
					{ id, set },
					headers,
				),
			),
		);
		return { success: true };
	});

export const deleteElement = createServerFn({ method: "POST" })
	.inputValidator((id: unknown) => id as string)
	.handler(async ({ data: id }) => {
		const headers = await requireAuth();
		await supabaseGraphqlClient.request(
			DELETE_ELEMENT_MUTATION,
			{ id },
			headers,
		);
		return { success: true };
	});

// ── Seat assignment mutations ──────────────────────────────────────

const GET_ASSIGNMENTS_FOR_SWAP = graphql(`
  query GetAssignmentsForSwap($guest_id: UUID!, $element_id: UUID!, $seat_index: Int!) {
    current: seat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }, first: 1) {
      edges {
        node {
          id
          element_id
          seat_index
        }
      }
    }
    occupant: seat_assignmentCollection(
      filter: { element_id: { eq: $element_id }, seat_index: { eq: $seat_index } }
      first: 1
    ) {
      edges {
        node {
          id
          guest_id
        }
      }
    }
  }
`);

const INSERT_ASSIGNMENTS_MUTATION = graphql(`
  mutation InsertSeatAssignments($objects: [seat_assignmentInsertInput!]!) {
    insertIntoseat_assignmentCollection(objects: $objects) {
      affectedCount
    }
  }
`);

const DELETE_ASSIGNMENTS_BY_ID_MUTATION = graphql(`
  mutation DeleteSeatAssignmentsById($ids: [UUID!]!) {
    deleteFromseat_assignmentCollection(filter: { id: { in: $ids } }) {
      affectedCount
    }
  }
`);

const DELETE_ASSIGNMENT_FOR_GUEST_MUTATION = graphql(`
  mutation DeleteSeatAssignmentForGuest($guest_id: UUID!) {
    deleteFromseat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }) {
      affectedCount
    }
  }
`);

/**
 * Seats a guest on a specific chair. Swap-safe: if the chair is taken, the
 * occupant moves to the incoming guest's old chair (or becomes unseated).
 */
export const assignSeat = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) =>
			data as { guest_id: string; element_id: string; seat_index: number },
	)
	.handler(async ({ data }) => {
		const headers = await requireAuth();
		const { guest_id, element_id, seat_index } = data;

		const existing = await supabaseGraphqlClient.request(
			GET_ASSIGNMENTS_FOR_SWAP,
			{ guest_id, element_id, seat_index },
			headers,
		);
		const current = existing.current?.edges[0]?.node ?? null;
		const occupant = existing.occupant?.edges[0]?.node ?? null;

		if (occupant?.guest_id === guest_id) return { success: true };

		const idsToDelete = [current?.id, occupant?.id].filter(
			(id): id is string => !!id,
		);
		if (idsToDelete.length > 0) {
			await supabaseGraphqlClient.request(
				DELETE_ASSIGNMENTS_BY_ID_MUTATION,
				{ ids: idsToDelete },
				headers,
			);
		}

		const inserts = [{ guest_id, element_id, seat_index }];
		if (occupant && current) {
			inserts.push({
				guest_id: occupant.guest_id,
				element_id: current.element_id,
				seat_index: current.seat_index,
			});
		}
		await supabaseGraphqlClient.request(
			INSERT_ASSIGNMENTS_MUTATION,
			{ objects: inserts },
			headers,
		);
		return { success: true };
	});

export const unassignSeat = createServerFn({ method: "POST" })
	.inputValidator((guest_id: unknown) => guest_id as string)
	.handler(async ({ data: guest_id }) => {
		const headers = await requireAuth();
		await supabaseGraphqlClient.request(
			DELETE_ASSIGNMENT_FOR_GUEST_MUTATION,
			{ guest_id },
			headers,
		);
		return { success: true };
	});

// ── Guest CRUD ─────────────────────────────────────────────────────

const CREATE_GUEST_MUTATION = graphql(`
  mutation CreateGuest($objects: [guestInsertInput!]!) {
    insertIntoguestCollection(objects: $objects) {
      records {
        id
        full_name
        invite_id
      }
    }
  }
`);

const UPDATE_GUEST_MUTATION = graphql(`
  mutation UpdateGuest($id: UUID!, $full_name: String!, $invite_id: UUID) {
    updateguestCollection(
      filter: { id: { eq: $id } }
      set: { full_name: $full_name, invite_id: $invite_id }
    ) {
      affectedCount
    }
  }
`);

const DELETE_GUEST_MUTATION = graphql(`
  mutation DeleteGuest($id: UUID!) {
    deleteFromguestCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`);

export const createGuest = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) => data as { full_name: string; invite_id?: string | null },
	)
	.handler(async ({ data }) => {
		const headers = await requireAuth();
		const res = await supabaseGraphqlClient.request(
			CREATE_GUEST_MUTATION,
			{
				objects: [
					{ full_name: data.full_name, invite_id: data.invite_id ?? null },
				],
			},
			headers,
		);
		return res.insertIntoguestCollection?.records[0] ?? null;
	});

export const updateGuest = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) =>
			data as { id: string; full_name: string; invite_id?: string | null },
	)
	.handler(async ({ data }) => {
		const headers = await requireAuth();
		await supabaseGraphqlClient.request(
			UPDATE_GUEST_MUTATION,
			{
				id: data.id,
				full_name: data.full_name,
				invite_id: data.invite_id ?? null,
			},
			headers,
		);
		return { success: true };
	});

export const deleteGuest = createServerFn({ method: "POST" })
	.inputValidator((id: unknown) => id as string)
	.handler(async ({ data: id }) => {
		const headers = await requireAuth();
		await supabaseGraphqlClient.request(DELETE_GUEST_MUTATION, { id }, headers);
		return { success: true };
	});

// ── Seed guests from invites ───────────────────────────────────────

const GET_INVITES_FOR_SEED = graphql(`
  query GetInvitesForSeed {
    inviteCollection(first: 200) {
      edges {
        node {
          id
          name
        }
      }
    }
    guestCollection(first: 200) {
      edges {
        node {
          full_name
        }
      }
    }
  }
`);

/** Splits an invite name like "Phil & Jacki", "Sam, Jess and Cam" into individuals. */
export function splitInviteName(name: string): string[] {
	return name
		.split(/\s*(?:&|\+|,|\band\b)\s*/i)
		.map((part) => part.trim())
		.filter(Boolean);
}

/**
 * Creates a guest per person named on each invite, skipping names that
 * already exist as guests (case-insensitive). Links new guests to their invite.
 */
export const seedGuestsFromInvites = createServerFn({ method: "POST" }).handler(
	async () => {
		const headers = await requireAuth();
		const res = await supabaseGraphqlClient.request(
			GET_INVITES_FOR_SEED,
			{},
			headers,
		);
		const invites = res.inviteCollection?.edges.map((e) => e.node) ?? [];
		const existing = new Set(
			(res.guestCollection?.edges ?? []).map((e) =>
				e.node.full_name.trim().toLowerCase(),
			),
		);

		const objects: Array<{ full_name: string; invite_id: string }> = [];
		for (const invite of invites) {
			if (!invite.name) continue;
			for (const person of splitInviteName(invite.name)) {
				const key = person.toLowerCase();
				if (existing.has(key)) continue;
				existing.add(key);
				objects.push({ full_name: person, invite_id: invite.id });
			}
		}

		if (objects.length > 0) {
			await supabaseGraphqlClient.request(
				CREATE_GUEST_MUTATION,
				{ objects },
				headers,
			);
		}
		return { created: objects.length };
	},
);
