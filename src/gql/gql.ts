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
    "\n  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tinsertIntorsvpCollection(objects: [\n\t  {\n\t\tinvite_id: $invite_id,\n\t\tattending: $attending,\n\t\tdietary: $dietary,\n\t\ttransit: $transit,\n\t\tphysical_invite: $physical_invite,\n\t\tsong_recommendations: $song_recommendations,\n\t\temail: $email,\n\t\tadditional_notes: $additional_notes\n\t  }\n\t]) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n": typeof types.InsertRsvpDocument,
    "\n  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tupdatersvpCollection(\n\t  filter: { invite_id: { eq: $invite_id } }\n\t  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }\n\t) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n": typeof types.UpdateRsvpDocument,
};
const documents: Documents = {
    "\n  query GetAllInvites {\n    inviteCollection(orderBy: [{ created_at: DescNullsLast }]) {\n      edges {\n        node {\n          id\n          name\n          message\n          sent\n          first_opened_at\n          open_count\n\t\t  rsvpCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tattending\n\t\t\t\t\tdietary\n\t\t\t\t\ttransit\n\t\t\t\t\tphysical_invite\n\t\t\t\t\tsong_recommendations\n\t\t\t\t}\n\t\t\t}\n\t\t  }\n        }\n      }\n    }\n  }\n": types.GetAllInvitesDocument,
    "\n  mutation UpdateInviteSent($id: UUID!, $sent: Boolean!) {\n    updateinviteCollection(\n      filter: { id: { eq: $id } }\n      set: { sent: $sent }\n    ) {\n      records {\n        id\n        sent\n      }\n    }\n  }\n": types.UpdateInviteSentDocument,
    "\n  mutation AddInvite($name: String!, $message: String, $sent: Boolean) {\n    insertIntoinviteCollection(objects: [\n      {\n        name: $name,\n        message: $message,\n        sent: $sent\n      }\n    ]) {\n      records {\n        id\n      }\n    }\n  }\n": types.AddInviteDocument,
    "\n  query GetInviteDetail($id: UUID!) {\n\tinviteCollection(filter: { id: { eq: $id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  name\n\t\t  message\n\t\t}\n\t  }\n\t}\n  }\n": types.GetInviteDetailDocument,
    "\n  mutation TrackInviteOpen($id: UUID!) {\n    track_invite_open(p_invite_id: $id)\n  }\n": types.TrackInviteOpenDocument,
    "\n  mutation TrackEnvelopeOpen($id: UUID!) {\n    track_envelope_open(p_invite_id: $id)\n  }\n": types.TrackEnvelopeOpenDocument,
    "\n  query GetRsvp($invite_id: UUID!) {\n\trsvpCollection(filter: { invite_id: { eq: $invite_id } }, first: 1) {\n\t  edges {\n\t\tnode {\n\t\t  id\n\t\t  attending\n\t\t  dietary\n\t\t  transit\n\t\t  physical_invite\n\t\t  song_recommendations\n\t\t  email\n\t\t  additional_notes\n\t\t}\n\t  }\n\t}\n  }\n": types.GetRsvpDocument,
    "\n  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tinsertIntorsvpCollection(objects: [\n\t  {\n\t\tinvite_id: $invite_id,\n\t\tattending: $attending,\n\t\tdietary: $dietary,\n\t\ttransit: $transit,\n\t\tphysical_invite: $physical_invite,\n\t\tsong_recommendations: $song_recommendations,\n\t\temail: $email,\n\t\tadditional_notes: $additional_notes\n\t  }\n\t]) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n": types.InsertRsvpDocument,
    "\n  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tupdatersvpCollection(\n\t  filter: { invite_id: { eq: $invite_id } }\n\t  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }\n\t) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n": types.UpdateRsvpDocument,
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
export function graphql(source: "\n  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tinsertIntorsvpCollection(objects: [\n\t  {\n\t\tinvite_id: $invite_id,\n\t\tattending: $attending,\n\t\tdietary: $dietary,\n\t\ttransit: $transit,\n\t\tphysical_invite: $physical_invite,\n\t\tsong_recommendations: $song_recommendations,\n\t\temail: $email,\n\t\tadditional_notes: $additional_notes\n\t  }\n\t]) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n"): (typeof documents)["\n  mutation InsertRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tinsertIntorsvpCollection(objects: [\n\t  {\n\t\tinvite_id: $invite_id,\n\t\tattending: $attending,\n\t\tdietary: $dietary,\n\t\ttransit: $transit,\n\t\tphysical_invite: $physical_invite,\n\t\tsong_recommendations: $song_recommendations,\n\t\temail: $email,\n\t\tadditional_notes: $additional_notes\n\t  }\n\t]) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tupdatersvpCollection(\n\t  filter: { invite_id: { eq: $invite_id } }\n\t  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }\n\t) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n"): (typeof documents)["\n  mutation UpdateRsvp($invite_id: UUID!, $attending: Boolean!, $dietary: String, $transit: Boolean, $physical_invite: Boolean, $song_recommendations: String, $email: String, $additional_notes: String) {\n\tupdatersvpCollection(\n\t  filter: { invite_id: { eq: $invite_id } }\n\t  set: { attending: $attending, dietary: $dietary, transit: $transit, physical_invite: $physical_invite, song_recommendations: $song_recommendations, email: $email, additional_notes: $additional_notes }\n\t) {\n\t  records {\n\t\tid\n\t  }\n\t}\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;