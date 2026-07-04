/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetAllInvites {\n    inviteCollection(orderBy: [{ created_at: DescNullsLast }]) {\n      edges {\n        node {\n          id\n          name\n          message\n          sent\n          first_opened_at\n          open_count\n\t\t  rsvpCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tattending\n\t\t\t\t\tdietary\n\t\t\t\t\ttransit\n\t\t\t\t\tphysical_invite\n\t\t\t\t\tsong_recommendations\n\t\t\t\t}\n\t\t\t}\n\t\t  }\n        }\n      }\n    }\n  }\n": typeof types.GetAllInvitesDocument,
    "\n  mutation UpdateInviteSent($id: UUID!, $sent: Boolean!) {\n    updateinviteCollection(\n      filter: { id: { eq: $id } }\n      set: { sent: $sent }\n    ) {\n      records {\n        id\n        sent\n      }\n    }\n  }\n": typeof types.UpdateInviteSentDocument,
    "\n  mutation AddInvite($name: String!, $message: String, $sent: Boolean) {\n    insertIntoinviteCollection(objects: [\n      {\n        name: $name,\n        message: $message,\n        sent: $sent\n      }\n    ]) {\n      records {\n        id\n      }\n    }\n  }\n": typeof types.AddInviteDocument,
    "\n  query GetInviteDetail($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  name\n\t\t  message\n\t\t}\n\t  }\n\t}\n  }\n": typeof types.GetInviteDetailDocument,
    "\n  mutation TrackInviteOpen($id: UUID!) {\n    track_invite_open(p_invite_id: $id)\n  }\n": typeof types.TrackInviteOpenDocument,
    "\n  mutation TrackEnvelopeOpen($id: UUID!) {\n    track_envelope_open(p_invite_id: $id)\n  }\n": typeof types.TrackEnvelopeOpenDocument,
    "\n  query GetRsvp($invite_id: UUID!) {\n\trsvpCollection(filter: { invite_id: { eq: $invite_id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  attending\n\t\t  dietary\n\t\t  transit\n\t\t  physical_invite\n\t\t  song_recommendations\n\t\t  email\n\t\t  additional_notes\n\t\t}\n\t  }\n\t}\n  }\n": typeof types.GetRsvpDocument,
    "\n  query GetInviteName($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  name\n\t\t}\n\t  }\n\t}\n  }\n": typeof types.GetInviteNameDocument,
    "\n  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tinsertIntorsvpCollection(objects: [\n\t  {\n\t\tinvite_id: $invite_id,\n\t\tattending: $attending,\n\t\tdietary: $dietary,\n\t\ttransit: $transit,\n\t\tphysical_invite: $physical_invite,\n\t\tsong_recommendations: $song_recommendations,\n\t\temail: $email,\n\t\tadditional_notes: $additional_notes\n\t  }\n\t]) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n": typeof types.InsertRsvpDocument,
    "\n  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tupdatersvpCollection(\n\t  filter: { invite_id: { eq: $invite_id } }\n\t  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }\n\t) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n": typeof types.UpdateRsvpDocument,
    "\n  query GetSeatingPlan {\n    seating_elementCollection(orderBy: [{ created_at: AscNullsLast }], first: 200) {\n      edges {\n        node {\n          id\n          kind\n          label\n          x\n          y\n          width\n          height\n          rotation\n          seats_top\n          seats_right\n          seats_bottom\n          seats_left\n          seat_offsets\n        }\n      }\n    }\n    guestCollection(orderBy: [{ full_name: AscNullsLast }], first: 200) {\n      edges {\n        node {\n          id\n          full_name\n          invite_id\n          invite {\n            id\n            name\n            rsvpCollection {\n              edges {\n                node {\n                  attending\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    seat_assignmentCollection(first: 200) {\n      edges {\n        node {\n          id\n          element_id\n          guest_id\n          seat_index\n        }\n      }\n    }\n  }\n": typeof types.GetSeatingPlanDocument,
    "\n  mutation CreateSeatingElement($objects: [seating_elementInsertInput!]!) {\n    insertIntoseating_elementCollection(objects: $objects) {\n      records {\n        id\n        kind\n        label\n        x\n        y\n        width\n        height\n        rotation\n        seats_top\n        seats_right\n        seats_bottom\n        seats_left\n        seat_offsets\n      }\n    }\n  }\n": typeof types.CreateSeatingElementDocument,
    "\n  mutation UpdateSeatingElement($id: UUID!, $set: seating_elementUpdateInput!) {\n    updateseating_elementCollection(filter: { id: { eq: $id } }, set: $set) {\n      affectedCount\n    }\n  }\n": typeof types.UpdateSeatingElementDocument,
    "\n  mutation DeleteSeatingElement($id: UUID!) {\n    deleteFromseating_elementCollection(filter: { id: { eq: $id } }) {\n      affectedCount\n    }\n  }\n": typeof types.DeleteSeatingElementDocument,
    "\n  query GetAssignmentsForSwap($guest_id: UUID!, $element_id: UUID!, $seat_index: Int!) {\n    current: seat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }, first: 1) {\n      edges {\n        node {\n          id\n          element_id\n          seat_index\n        }\n      }\n    }\n    occupant: seat_assignmentCollection(\n      filter: { element_id: { eq: $element_id }, seat_index: { eq: $seat_index } }\n      first: 1\n    ) {\n      edges {\n        node {\n          id\n          guest_id\n        }\n      }\n    }\n  }\n": typeof types.GetAssignmentsForSwapDocument,
    "\n  mutation InsertSeatAssignments($objects: [seat_assignmentInsertInput!]!) {\n    insertIntoseat_assignmentCollection(objects: $objects) {\n      affectedCount\n    }\n  }\n": typeof types.InsertSeatAssignmentsDocument,
    "\n  mutation DeleteSeatAssignmentsById($ids: [UUID!]!) {\n    deleteFromseat_assignmentCollection(filter: { id: { in: $ids } }) {\n      affectedCount\n    }\n  }\n": typeof types.DeleteSeatAssignmentsByIdDocument,
    "\n  mutation DeleteSeatAssignmentForGuest($guest_id: UUID!) {\n    deleteFromseat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }) {\n      affectedCount\n    }\n  }\n": typeof types.DeleteSeatAssignmentForGuestDocument,
    "\n  mutation CreateGuest($objects: [guestInsertInput!]!) {\n    insertIntoguestCollection(objects: $objects) {\n      records {\n        id\n        full_name\n        invite_id\n      }\n    }\n  }\n": typeof types.CreateGuestDocument,
    "\n  mutation UpdateGuest($id: UUID!, $full_name: String!, $invite_id: UUID) {\n    updateguestCollection(\n      filter: { id: { eq: $id } }\n      set: { full_name: $full_name, invite_id: $invite_id }\n    ) {\n      affectedCount\n    }\n  }\n": typeof types.UpdateGuestDocument,
    "\n  mutation DeleteGuest($id: UUID!) {\n    deleteFromguestCollection(filter: { id: { eq: $id } }) {\n      affectedCount\n    }\n  }\n": typeof types.DeleteGuestDocument,
    "\n  query GetInvitesForSeed {\n    inviteCollection(first: 200) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    guestCollection(first: 200) {\n      edges {\n        node {\n          full_name\n        }\n      }\n    }\n  }\n": typeof types.GetInvitesForSeedDocument,
};
const documents: Documents = {
    "\n  query GetAllInvites {\n    inviteCollection(orderBy: [{ created_at: DescNullsLast }]) {\n      edges {\n        node {\n          id\n          name\n          message\n          sent\n          first_opened_at\n          open_count\n\t\t  rsvpCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tattending\n\t\t\t\t\tdietary\n\t\t\t\t\ttransit\n\t\t\t\t\tphysical_invite\n\t\t\t\t\tsong_recommendations\n\t\t\t\t}\n\t\t\t}\n\t\t  }\n        }\n      }\n    }\n  }\n": types.GetAllInvitesDocument,
    "\n  mutation UpdateInviteSent($id: UUID!, $sent: Boolean!) {\n    updateinviteCollection(\n      filter: { id: { eq: $id } }\n      set: { sent: $sent }\n    ) {\n      records {\n        id\n        sent\n      }\n    }\n  }\n": types.UpdateInviteSentDocument,
    "\n  mutation AddInvite($name: String!, $message: String, $sent: Boolean) {\n    insertIntoinviteCollection(objects: [\n      {\n        name: $name,\n        message: $message,\n        sent: $sent\n      }\n    ]) {\n      records {\n        id\n      }\n    }\n  }\n": types.AddInviteDocument,
    "\n  query GetInviteDetail($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  name\n\t\t  message\n\t\t}\n\t  }\n\t}\n  }\n": types.GetInviteDetailDocument,
    "\n  mutation TrackInviteOpen($id: UUID!) {\n    track_invite_open(p_invite_id: $id)\n  }\n": types.TrackInviteOpenDocument,
    "\n  mutation TrackEnvelopeOpen($id: UUID!) {\n    track_envelope_open(p_invite_id: $id)\n  }\n": types.TrackEnvelopeOpenDocument,
    "\n  query GetRsvp($invite_id: UUID!) {\n\trsvpCollection(filter: { invite_id: { eq: $invite_id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  attending\n\t\t  dietary\n\t\t  transit\n\t\t  physical_invite\n\t\t  song_recommendations\n\t\t  email\n\t\t  additional_notes\n\t\t}\n\t  }\n\t}\n  }\n": types.GetRsvpDocument,
    "\n  query GetInviteName($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  name\n\t\t}\n\t  }\n\t}\n  }\n": types.GetInviteNameDocument,
    "\n  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tinsertIntorsvpCollection(objects: [\n\t  {\n\t\tinvite_id: $invite_id,\n\t\tattending: $attending,\n\t\tdietary: $dietary,\n\t\ttransit: $transit,\n\t\tphysical_invite: $physical_invite,\n\t\tsong_recommendations: $song_recommendations,\n\t\temail: $email,\n\t\tadditional_notes: $additional_notes\n\t  }\n\t]) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n": types.InsertRsvpDocument,
    "\n  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tupdatersvpCollection(\n\t  filter: { invite_id: { eq: $invite_id } }\n\t  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }\n\t) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n": types.UpdateRsvpDocument,
    "\n  query GetSeatingPlan {\n    seating_elementCollection(orderBy: [{ created_at: AscNullsLast }], first: 200) {\n      edges {\n        node {\n          id\n          kind\n          label\n          x\n          y\n          width\n          height\n          rotation\n          seats_top\n          seats_right\n          seats_bottom\n          seats_left\n          seat_offsets\n        }\n      }\n    }\n    guestCollection(orderBy: [{ full_name: AscNullsLast }], first: 200) {\n      edges {\n        node {\n          id\n          full_name\n          invite_id\n          invite {\n            id\n            name\n            rsvpCollection {\n              edges {\n                node {\n                  attending\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    seat_assignmentCollection(first: 200) {\n      edges {\n        node {\n          id\n          element_id\n          guest_id\n          seat_index\n        }\n      }\n    }\n  }\n": types.GetSeatingPlanDocument,
    "\n  mutation CreateSeatingElement($objects: [seating_elementInsertInput!]!) {\n    insertIntoseating_elementCollection(objects: $objects) {\n      records {\n        id\n        kind\n        label\n        x\n        y\n        width\n        height\n        rotation\n        seats_top\n        seats_right\n        seats_bottom\n        seats_left\n        seat_offsets\n      }\n    }\n  }\n": types.CreateSeatingElementDocument,
    "\n  mutation UpdateSeatingElement($id: UUID!, $set: seating_elementUpdateInput!) {\n    updateseating_elementCollection(filter: { id: { eq: $id } }, set: $set) {\n      affectedCount\n    }\n  }\n": types.UpdateSeatingElementDocument,
    "\n  mutation DeleteSeatingElement($id: UUID!) {\n    deleteFromseating_elementCollection(filter: { id: { eq: $id } }) {\n      affectedCount\n    }\n  }\n": types.DeleteSeatingElementDocument,
    "\n  query GetAssignmentsForSwap($guest_id: UUID!, $element_id: UUID!, $seat_index: Int!) {\n    current: seat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }, first: 1) {\n      edges {\n        node {\n          id\n          element_id\n          seat_index\n        }\n      }\n    }\n    occupant: seat_assignmentCollection(\n      filter: { element_id: { eq: $element_id }, seat_index: { eq: $seat_index } }\n      first: 1\n    ) {\n      edges {\n        node {\n          id\n          guest_id\n        }\n      }\n    }\n  }\n": types.GetAssignmentsForSwapDocument,
    "\n  mutation InsertSeatAssignments($objects: [seat_assignmentInsertInput!]!) {\n    insertIntoseat_assignmentCollection(objects: $objects) {\n      affectedCount\n    }\n  }\n": types.InsertSeatAssignmentsDocument,
    "\n  mutation DeleteSeatAssignmentsById($ids: [UUID!]!) {\n    deleteFromseat_assignmentCollection(filter: { id: { in: $ids } }) {\n      affectedCount\n    }\n  }\n": types.DeleteSeatAssignmentsByIdDocument,
    "\n  mutation DeleteSeatAssignmentForGuest($guest_id: UUID!) {\n    deleteFromseat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }) {\n      affectedCount\n    }\n  }\n": types.DeleteSeatAssignmentForGuestDocument,
    "\n  mutation CreateGuest($objects: [guestInsertInput!]!) {\n    insertIntoguestCollection(objects: $objects) {\n      records {\n        id\n        full_name\n        invite_id\n      }\n    }\n  }\n": types.CreateGuestDocument,
    "\n  mutation UpdateGuest($id: UUID!, $full_name: String!, $invite_id: UUID) {\n    updateguestCollection(\n      filter: { id: { eq: $id } }\n      set: { full_name: $full_name, invite_id: $invite_id }\n    ) {\n      affectedCount\n    }\n  }\n": types.UpdateGuestDocument,
    "\n  mutation DeleteGuest($id: UUID!) {\n    deleteFromguestCollection(filter: { id: { eq: $id } }) {\n      affectedCount\n    }\n  }\n": types.DeleteGuestDocument,
    "\n  query GetInvitesForSeed {\n    inviteCollection(first: 200) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    guestCollection(first: 200) {\n      edges {\n        node {\n          full_name\n        }\n      }\n    }\n  }\n": types.GetInvitesForSeedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllInvites {\n    inviteCollection(orderBy: [{ created_at: DescNullsLast }]) {\n      edges {\n        node {\n          id\n          name\n          message\n          sent\n          first_opened_at\n          open_count\n\t\t  rsvpCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tattending\n\t\t\t\t\tdietary\n\t\t\t\t\ttransit\n\t\t\t\t\tphysical_invite\n\t\t\t\t\tsong_recommendations\n\t\t\t\t}\n\t\t\t}\n\t\t  }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllInvites {\n    inviteCollection(orderBy: [{ created_at: DescNullsLast }]) {\n      edges {\n        node {\n          id\n          name\n          message\n          sent\n          first_opened_at\n          open_count\n\t\t  rsvpCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tattending\n\t\t\t\t\tdietary\n\t\t\t\t\ttransit\n\t\t\t\t\tphysical_invite\n\t\t\t\t\tsong_recommendations\n\t\t\t\t}\n\t\t\t}\n\t\t  }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInviteSent($id: UUID!, $sent: Boolean!) {\n    updateinviteCollection(\n      filter: { id: { eq: $id } }\n      set: { sent: $sent }\n    ) {\n      records {\n        id\n        sent\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateInviteSent($id: UUID!, $sent: Boolean!) {\n    updateinviteCollection(\n      filter: { id: { eq: $id } }\n      set: { sent: $sent }\n    ) {\n      records {\n        id\n        sent\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddInvite($name: String!, $message: String, $sent: Boolean) {\n    insertIntoinviteCollection(objects: [\n      {\n        name: $name,\n        message: $message,\n        sent: $sent\n      }\n    ]) {\n      records {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddInvite($name: String!, $message: String, $sent: Boolean) {\n    insertIntoinviteCollection(objects: [\n      {\n        name: $name,\n        message: $message,\n        sent: $sent\n      }\n    ]) {\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetInviteDetail($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  name\n\t\t  message\n\t\t}\n\t  }\n\t}\n  }\n"): (typeof documents)["\n  query GetInviteDetail($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  name\n\t\t  message\n\t\t}\n\t  }\n\t}\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TrackInviteOpen($id: UUID!) {\n    track_invite_open(p_invite_id: $id)\n  }\n"): (typeof documents)["\n  mutation TrackInviteOpen($id: UUID!) {\n    track_invite_open(p_invite_id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TrackEnvelopeOpen($id: UUID!) {\n    track_envelope_open(p_invite_id: $id)\n  }\n"): (typeof documents)["\n  mutation TrackEnvelopeOpen($id: UUID!) {\n    track_envelope_open(p_invite_id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRsvp($invite_id: UUID!) {\n\trsvpCollection(filter: { invite_id: { eq: $invite_id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  attending\n\t\t  dietary\n\t\t  transit\n\t\t  physical_invite\n\t\t  song_recommendations\n\t\t  email\n\t\t  additional_notes\n\t\t}\n\t  }\n\t}\n  }\n"): (typeof documents)["\n  query GetRsvp($invite_id: UUID!) {\n\trsvpCollection(filter: { invite_id: { eq: $invite_id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  attending\n\t\t  dietary\n\t\t  transit\n\t\t  physical_invite\n\t\t  song_recommendations\n\t\t  email\n\t\t  additional_notes\n\t\t}\n\t  }\n\t}\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetInviteName($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  name\n\t\t}\n\t  }\n\t}\n  }\n"): (typeof documents)["\n  query GetInviteName($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  name\n\t\t}\n\t  }\n\t}\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tinsertIntorsvpCollection(objects: [\n\t  {\n\t\tinvite_id: $invite_id,\n\t\tattending: $attending,\n\t\tdietary: $dietary,\n\t\ttransit: $transit,\n\t\tphysical_invite: $physical_invite,\n\t\tsong_recommendations: $song_recommendations,\n\t\temail: $email,\n\t\tadditional_notes: $additional_notes\n\t  }\n\t]) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n"): (typeof documents)["\n  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tinsertIntorsvpCollection(objects: [\n\t  {\n\t\tinvite_id: $invite_id,\n\t\tattending: $attending,\n\t\tdietary: $dietary,\n\t\ttransit: $transit,\n\t\tphysical_invite: $physical_invite,\n\t\tsong_recommendations: $song_recommendations,\n\t\temail: $email,\n\t\tadditional_notes: $additional_notes\n\t  }\n\t]) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tupdatersvpCollection(\n\t  filter: { invite_id: { eq: $invite_id } }\n\t  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }\n\t) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n"): (typeof documents)["\n  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tupdatersvpCollection(\n\t  filter: { invite_id: { eq: $invite_id } }\n\t  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }\n\t) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSeatingPlan {\n    seating_elementCollection(orderBy: [{ created_at: AscNullsLast }], first: 200) {\n      edges {\n        node {\n          id\n          kind\n          label\n          x\n          y\n          width\n          height\n          rotation\n          seats_top\n          seats_right\n          seats_bottom\n          seats_left\n          seat_offsets\n        }\n      }\n    }\n    guestCollection(orderBy: [{ full_name: AscNullsLast }], first: 200) {\n      edges {\n        node {\n          id\n          full_name\n          invite_id\n          invite {\n            id\n            name\n            rsvpCollection {\n              edges {\n                node {\n                  attending\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    seat_assignmentCollection(first: 200) {\n      edges {\n        node {\n          id\n          element_id\n          guest_id\n          seat_index\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSeatingPlan {\n    seating_elementCollection(orderBy: [{ created_at: AscNullsLast }], first: 200) {\n      edges {\n        node {\n          id\n          kind\n          label\n          x\n          y\n          width\n          height\n          rotation\n          seats_top\n          seats_right\n          seats_bottom\n          seats_left\n          seat_offsets\n        }\n      }\n    }\n    guestCollection(orderBy: [{ full_name: AscNullsLast }], first: 200) {\n      edges {\n        node {\n          id\n          full_name\n          invite_id\n          invite {\n            id\n            name\n            rsvpCollection {\n              edges {\n                node {\n                  attending\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    seat_assignmentCollection(first: 200) {\n      edges {\n        node {\n          id\n          element_id\n          guest_id\n          seat_index\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSeatingElement($objects: [seating_elementInsertInput!]!) {\n    insertIntoseating_elementCollection(objects: $objects) {\n      records {\n        id\n        kind\n        label\n        x\n        y\n        width\n        height\n        rotation\n        seats_top\n        seats_right\n        seats_bottom\n        seats_left\n        seat_offsets\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSeatingElement($objects: [seating_elementInsertInput!]!) {\n    insertIntoseating_elementCollection(objects: $objects) {\n      records {\n        id\n        kind\n        label\n        x\n        y\n        width\n        height\n        rotation\n        seats_top\n        seats_right\n        seats_bottom\n        seats_left\n        seat_offsets\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSeatingElement($id: UUID!, $set: seating_elementUpdateInput!) {\n    updateseating_elementCollection(filter: { id: { eq: $id } }, set: $set) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSeatingElement($id: UUID!, $set: seating_elementUpdateInput!) {\n    updateseating_elementCollection(filter: { id: { eq: $id } }, set: $set) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSeatingElement($id: UUID!) {\n    deleteFromseating_elementCollection(filter: { id: { eq: $id } }) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSeatingElement($id: UUID!) {\n    deleteFromseating_elementCollection(filter: { id: { eq: $id } }) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAssignmentsForSwap($guest_id: UUID!, $element_id: UUID!, $seat_index: Int!) {\n    current: seat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }, first: 1) {\n      edges {\n        node {\n          id\n          element_id\n          seat_index\n        }\n      }\n    }\n    occupant: seat_assignmentCollection(\n      filter: { element_id: { eq: $element_id }, seat_index: { eq: $seat_index } }\n      first: 1\n    ) {\n      edges {\n        node {\n          id\n          guest_id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAssignmentsForSwap($guest_id: UUID!, $element_id: UUID!, $seat_index: Int!) {\n    current: seat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }, first: 1) {\n      edges {\n        node {\n          id\n          element_id\n          seat_index\n        }\n      }\n    }\n    occupant: seat_assignmentCollection(\n      filter: { element_id: { eq: $element_id }, seat_index: { eq: $seat_index } }\n      first: 1\n    ) {\n      edges {\n        node {\n          id\n          guest_id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InsertSeatAssignments($objects: [seat_assignmentInsertInput!]!) {\n    insertIntoseat_assignmentCollection(objects: $objects) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation InsertSeatAssignments($objects: [seat_assignmentInsertInput!]!) {\n    insertIntoseat_assignmentCollection(objects: $objects) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSeatAssignmentsById($ids: [UUID!]!) {\n    deleteFromseat_assignmentCollection(filter: { id: { in: $ids } }) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSeatAssignmentsById($ids: [UUID!]!) {\n    deleteFromseat_assignmentCollection(filter: { id: { in: $ids } }) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSeatAssignmentForGuest($guest_id: UUID!) {\n    deleteFromseat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSeatAssignmentForGuest($guest_id: UUID!) {\n    deleteFromseat_assignmentCollection(filter: { guest_id: { eq: $guest_id } }) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGuest($objects: [guestInsertInput!]!) {\n    insertIntoguestCollection(objects: $objects) {\n      records {\n        id\n        full_name\n        invite_id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGuest($objects: [guestInsertInput!]!) {\n    insertIntoguestCollection(objects: $objects) {\n      records {\n        id\n        full_name\n        invite_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateGuest($id: UUID!, $full_name: String!, $invite_id: UUID) {\n    updateguestCollection(\n      filter: { id: { eq: $id } }\n      set: { full_name: $full_name, invite_id: $invite_id }\n    ) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateGuest($id: UUID!, $full_name: String!, $invite_id: UUID) {\n    updateguestCollection(\n      filter: { id: { eq: $id } }\n      set: { full_name: $full_name, invite_id: $invite_id }\n    ) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteGuest($id: UUID!) {\n    deleteFromguestCollection(filter: { id: { eq: $id } }) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteGuest($id: UUID!) {\n    deleteFromguestCollection(filter: { id: { eq: $id } }) {\n      affectedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetInvitesForSeed {\n    inviteCollection(first: 200) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    guestCollection(first: 200) {\n      edges {\n        node {\n          full_name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetInvitesForSeed {\n    inviteCollection(first: 200) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    guestCollection(first: 200) {\n      edges {\n        node {\n          full_name\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;