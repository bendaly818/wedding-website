/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: any; output: any; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: any; output: any; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date without time information */
  Date: { input: any; output: any; }
  /** A date and time */
  Datetime: { input: any; output: any; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: any; output: any; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: any; output: any; }
  /** A universally unique identifier */
  UUID: { input: any; output: any; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `app_settings` collection */
  deleteFromapp_settingsCollection: App_SettingsDeleteResponse;
  /** Deletes zero or more records from the `guest` collection */
  deleteFromguestCollection: GuestDeleteResponse;
  /** Deletes zero or more records from the `invite` collection */
  deleteFrominviteCollection: InviteDeleteResponse;
  /** Deletes zero or more records from the `rsvp` collection */
  deleteFromrsvpCollection: RsvpDeleteResponse;
  /** Deletes zero or more records from the `seat_assignment` collection */
  deleteFromseat_assignmentCollection: Seat_AssignmentDeleteResponse;
  /** Deletes zero or more records from the `seating_element` collection */
  deleteFromseating_elementCollection: Seating_ElementDeleteResponse;
  /** Adds one or more `app_settings` records to the collection */
  insertIntoapp_settingsCollection?: Maybe<App_SettingsInsertResponse>;
  /** Adds one or more `guest` records to the collection */
  insertIntoguestCollection?: Maybe<GuestInsertResponse>;
  /** Adds one or more `invite` records to the collection */
  insertIntoinviteCollection?: Maybe<InviteInsertResponse>;
  /** Adds one or more `rsvp` records to the collection */
  insertIntorsvpCollection?: Maybe<RsvpInsertResponse>;
  /** Adds one or more `seat_assignment` records to the collection */
  insertIntoseat_assignmentCollection?: Maybe<Seat_AssignmentInsertResponse>;
  /** Adds one or more `seating_element` records to the collection */
  insertIntoseating_elementCollection?: Maybe<Seating_ElementInsertResponse>;
  track_envelope_open?: Maybe<Scalars['Opaque']['output']>;
  track_invite_open?: Maybe<Scalars['Opaque']['output']>;
  /** Updates zero or more records in the `app_settings` collection */
  updateapp_settingsCollection: App_SettingsUpdateResponse;
  /** Updates zero or more records in the `guest` collection */
  updateguestCollection: GuestUpdateResponse;
  /** Updates zero or more records in the `invite` collection */
  updateinviteCollection: InviteUpdateResponse;
  /** Updates zero or more records in the `rsvp` collection */
  updatersvpCollection: RsvpUpdateResponse;
  /** Updates zero or more records in the `seat_assignment` collection */
  updateseat_assignmentCollection: Seat_AssignmentUpdateResponse;
  /** Updates zero or more records in the `seating_element` collection */
  updateseating_elementCollection: Seating_ElementUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromapp_SettingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<App_SettingsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromguestCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<GuestFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrominviteCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<InviteFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromrsvpCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RsvpFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromseat_AssignmentCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Seat_AssignmentFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromseating_ElementCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Seating_ElementFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoapp_SettingsCollectionArgs = {
  objects: Array<App_SettingsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoguestCollectionArgs = {
  objects: Array<GuestInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoinviteCollectionArgs = {
  objects: Array<InviteInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntorsvpCollectionArgs = {
  objects: Array<RsvpInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoseat_AssignmentCollectionArgs = {
  objects: Array<Seat_AssignmentInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoseating_ElementCollectionArgs = {
  objects: Array<Seating_ElementInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationTrack_Envelope_OpenArgs = {
  p_invite_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationTrack_Invite_OpenArgs = {
  p_invite_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationUpdateapp_SettingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<App_SettingsFilter>;
  set: App_SettingsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateguestCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<GuestFilter>;
  set: GuestUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateinviteCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<InviteFilter>;
  set: InviteUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatersvpCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RsvpFilter>;
  set: RsvpUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateseat_AssignmentCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Seat_AssignmentFilter>;
  set: Seat_AssignmentUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateseating_ElementCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Seating_ElementFilter>;
  set: Seating_ElementUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `app_settings` */
  app_settingsCollection?: Maybe<App_SettingsConnection>;
  /** A pagable collection of type `guest` */
  guestCollection?: Maybe<GuestConnection>;
  /** A pagable collection of type `invite` */
  inviteCollection?: Maybe<InviteConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `rsvp` */
  rsvpCollection?: Maybe<RsvpConnection>;
  /** A pagable collection of type `seat_assignment` */
  seat_assignmentCollection?: Maybe<Seat_AssignmentConnection>;
  /** A pagable collection of type `seating_element` */
  seating_elementCollection?: Maybe<Seating_ElementConnection>;
};


/** The root type for querying data */
export type QueryApp_SettingsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<App_SettingsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<App_SettingsOrderBy>>;
};


/** The root type for querying data */
export type QueryGuestCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GuestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GuestOrderBy>>;
};


/** The root type for querying data */
export type QueryInviteCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<InviteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InviteOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryRsvpCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RsvpFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RsvpOrderBy>>;
};


/** The root type for querying data */
export type QuerySeat_AssignmentCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Seat_AssignmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Seat_AssignmentOrderBy>>;
};


/** The root type for querying data */
export type QuerySeating_ElementCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Seating_ElementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Seating_ElementOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type App_Settings = Node & {
  __typename?: 'app_settings';
  key: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updated_at: Scalars['Datetime']['output'];
  value: Scalars['String']['output'];
};

export type App_SettingsConnection = {
  __typename?: 'app_settingsConnection';
  edges: Array<App_SettingsEdge>;
  pageInfo: PageInfo;
};

export type App_SettingsDeleteResponse = {
  __typename?: 'app_settingsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<App_Settings>;
};

export type App_SettingsEdge = {
  __typename?: 'app_settingsEdge';
  cursor: Scalars['String']['output'];
  node: App_Settings;
};

export type App_SettingsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<App_SettingsFilter>>;
  key?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<App_SettingsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<App_SettingsFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
  value?: InputMaybe<StringFilter>;
};

export type App_SettingsInsertInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type App_SettingsInsertResponse = {
  __typename?: 'app_settingsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<App_Settings>;
};

export type App_SettingsOrderBy = {
  key?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  value?: InputMaybe<OrderByDirection>;
};

export type App_SettingsUpdateInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type App_SettingsUpdateResponse = {
  __typename?: 'app_settingsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<App_Settings>;
};

export type Guest = Node & {
  __typename?: 'guest';
  created_at: Scalars['Datetime']['output'];
  full_name: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  invite?: Maybe<Invite>;
  invite_id?: Maybe<Scalars['UUID']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  seat_assignment?: Maybe<Seat_Assignment>;
};

export type GuestConnection = {
  __typename?: 'guestConnection';
  edges: Array<GuestEdge>;
  pageInfo: PageInfo;
};

export type GuestDeleteResponse = {
  __typename?: 'guestDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Guest>;
};

export type GuestEdge = {
  __typename?: 'guestEdge';
  cursor: Scalars['String']['output'];
  node: Guest;
};

export type GuestFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<GuestFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  full_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  invite_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<GuestFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<GuestFilter>>;
};

export type GuestInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type GuestInsertResponse = {
  __typename?: 'guestInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Guest>;
};

export type GuestOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  full_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  invite_id?: InputMaybe<OrderByDirection>;
};

export type GuestUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type GuestUpdateResponse = {
  __typename?: 'guestUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Guest>;
};

export type Invite = Node & {
  __typename?: 'invite';
  created_at: Scalars['Datetime']['output'];
  envelope_opened_at?: Maybe<Scalars['Datetime']['output']>;
  first_opened_at?: Maybe<Scalars['Datetime']['output']>;
  guestCollection?: Maybe<GuestConnection>;
  id: Scalars['UUID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  number_of_attendees: Scalars['Int']['output'];
  open_count: Scalars['Int']['output'];
  rsvpCollection?: Maybe<RsvpConnection>;
  sent?: Maybe<Scalars['Boolean']['output']>;
};


export type InviteGuestCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GuestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GuestOrderBy>>;
};


export type InviteRsvpCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RsvpFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RsvpOrderBy>>;
};

export type InviteConnection = {
  __typename?: 'inviteConnection';
  edges: Array<InviteEdge>;
  pageInfo: PageInfo;
};

export type InviteDeleteResponse = {
  __typename?: 'inviteDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Invite>;
};

export type InviteEdge = {
  __typename?: 'inviteEdge';
  cursor: Scalars['String']['output'];
  node: Invite;
};

export type InviteFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<InviteFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  envelope_opened_at?: InputMaybe<DatetimeFilter>;
  first_opened_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  message?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<InviteFilter>;
  number_of_attendees?: InputMaybe<IntFilter>;
  open_count?: InputMaybe<IntFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<InviteFilter>>;
  sent?: InputMaybe<BooleanFilter>;
};

export type InviteInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  envelope_opened_at?: InputMaybe<Scalars['Datetime']['input']>;
  first_opened_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  number_of_attendees?: InputMaybe<Scalars['Int']['input']>;
  open_count?: InputMaybe<Scalars['Int']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InviteInsertResponse = {
  __typename?: 'inviteInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Invite>;
};

export type InviteOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  envelope_opened_at?: InputMaybe<OrderByDirection>;
  first_opened_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  message?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  number_of_attendees?: InputMaybe<OrderByDirection>;
  open_count?: InputMaybe<OrderByDirection>;
  sent?: InputMaybe<OrderByDirection>;
};

export type InviteUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  envelope_opened_at?: InputMaybe<Scalars['Datetime']['input']>;
  first_opened_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  number_of_attendees?: InputMaybe<Scalars['Int']['input']>;
  open_count?: InputMaybe<Scalars['Int']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InviteUpdateResponse = {
  __typename?: 'inviteUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Invite>;
};

export type Rsvp = Node & {
  __typename?: 'rsvp';
  additional_notes?: Maybe<Scalars['String']['output']>;
  attending?: Maybe<Scalars['Boolean']['output']>;
  created_at: Scalars['Datetime']['output'];
  dietary?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  invite?: Maybe<Invite>;
  invite_id?: Maybe<Scalars['UUID']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  physical_invite?: Maybe<Scalars['Boolean']['output']>;
  song_recommendations?: Maybe<Scalars['String']['output']>;
  transit?: Maybe<Scalars['Boolean']['output']>;
};

export type RsvpConnection = {
  __typename?: 'rsvpConnection';
  edges: Array<RsvpEdge>;
  pageInfo: PageInfo;
};

export type RsvpDeleteResponse = {
  __typename?: 'rsvpDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Rsvp>;
};

export type RsvpEdge = {
  __typename?: 'rsvpEdge';
  cursor: Scalars['String']['output'];
  node: Rsvp;
};

export type RsvpFilter = {
  additional_notes?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RsvpFilter>>;
  attending?: InputMaybe<BooleanFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  dietary?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  invite_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<RsvpFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<RsvpFilter>>;
  physical_invite?: InputMaybe<BooleanFilter>;
  song_recommendations?: InputMaybe<StringFilter>;
  transit?: InputMaybe<BooleanFilter>;
};

export type RsvpInsertInput = {
  additional_notes?: InputMaybe<Scalars['String']['input']>;
  attending?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  dietary?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
  physical_invite?: InputMaybe<Scalars['Boolean']['input']>;
  song_recommendations?: InputMaybe<Scalars['String']['input']>;
  transit?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RsvpInsertResponse = {
  __typename?: 'rsvpInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Rsvp>;
};

export type RsvpOrderBy = {
  additional_notes?: InputMaybe<OrderByDirection>;
  attending?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  dietary?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  invite_id?: InputMaybe<OrderByDirection>;
  physical_invite?: InputMaybe<OrderByDirection>;
  song_recommendations?: InputMaybe<OrderByDirection>;
  transit?: InputMaybe<OrderByDirection>;
};

export type RsvpUpdateInput = {
  additional_notes?: InputMaybe<Scalars['String']['input']>;
  attending?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  dietary?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
  physical_invite?: InputMaybe<Scalars['Boolean']['input']>;
  song_recommendations?: InputMaybe<Scalars['String']['input']>;
  transit?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RsvpUpdateResponse = {
  __typename?: 'rsvpUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Rsvp>;
};

export type Seat_Assignment = Node & {
  __typename?: 'seat_assignment';
  created_at: Scalars['Datetime']['output'];
  element_id: Scalars['UUID']['output'];
  guest?: Maybe<Guest>;
  guest_id: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  seat_index: Scalars['Int']['output'];
  seating_element?: Maybe<Seating_Element>;
};

export type Seat_AssignmentConnection = {
  __typename?: 'seat_assignmentConnection';
  edges: Array<Seat_AssignmentEdge>;
  pageInfo: PageInfo;
};

export type Seat_AssignmentDeleteResponse = {
  __typename?: 'seat_assignmentDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seat_Assignment>;
};

export type Seat_AssignmentEdge = {
  __typename?: 'seat_assignmentEdge';
  cursor: Scalars['String']['output'];
  node: Seat_Assignment;
};

export type Seat_AssignmentFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Seat_AssignmentFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  element_id?: InputMaybe<UuidFilter>;
  guest_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Seat_AssignmentFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Seat_AssignmentFilter>>;
  seat_index?: InputMaybe<IntFilter>;
};

export type Seat_AssignmentInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  element_id?: InputMaybe<Scalars['UUID']['input']>;
  guest_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  seat_index?: InputMaybe<Scalars['Int']['input']>;
};

export type Seat_AssignmentInsertResponse = {
  __typename?: 'seat_assignmentInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seat_Assignment>;
};

export type Seat_AssignmentOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  element_id?: InputMaybe<OrderByDirection>;
  guest_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  seat_index?: InputMaybe<OrderByDirection>;
};

export type Seat_AssignmentUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  element_id?: InputMaybe<Scalars['UUID']['input']>;
  guest_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  seat_index?: InputMaybe<Scalars['Int']['input']>;
};

export type Seat_AssignmentUpdateResponse = {
  __typename?: 'seat_assignmentUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seat_Assignment>;
};

export type Seating_Element = Node & {
  __typename?: 'seating_element';
  created_at: Scalars['Datetime']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['UUID']['output'];
  kind: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  rotation: Scalars['Float']['output'];
  seat_assignmentCollection?: Maybe<Seat_AssignmentConnection>;
  seats_bottom: Scalars['Int']['output'];
  seats_left: Scalars['Int']['output'];
  seats_right: Scalars['Int']['output'];
  seats_top: Scalars['Int']['output'];
  width: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};


export type Seating_ElementSeat_AssignmentCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Seat_AssignmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Seat_AssignmentOrderBy>>;
};

export type Seating_ElementConnection = {
  __typename?: 'seating_elementConnection';
  edges: Array<Seating_ElementEdge>;
  pageInfo: PageInfo;
};

export type Seating_ElementDeleteResponse = {
  __typename?: 'seating_elementDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seating_Element>;
};

export type Seating_ElementEdge = {
  __typename?: 'seating_elementEdge';
  cursor: Scalars['String']['output'];
  node: Seating_Element;
};

export type Seating_ElementFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Seating_ElementFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  height?: InputMaybe<FloatFilter>;
  id?: InputMaybe<UuidFilter>;
  kind?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Seating_ElementFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Seating_ElementFilter>>;
  rotation?: InputMaybe<FloatFilter>;
  seats_bottom?: InputMaybe<IntFilter>;
  seats_left?: InputMaybe<IntFilter>;
  seats_right?: InputMaybe<IntFilter>;
  seats_top?: InputMaybe<IntFilter>;
  width?: InputMaybe<FloatFilter>;
  x?: InputMaybe<FloatFilter>;
  y?: InputMaybe<FloatFilter>;
};

export type Seating_ElementInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  rotation?: InputMaybe<Scalars['Float']['input']>;
  seats_bottom?: InputMaybe<Scalars['Int']['input']>;
  seats_left?: InputMaybe<Scalars['Int']['input']>;
  seats_right?: InputMaybe<Scalars['Int']['input']>;
  seats_top?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
};

export type Seating_ElementInsertResponse = {
  __typename?: 'seating_elementInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seating_Element>;
};

export type Seating_ElementOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  height?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  kind?: InputMaybe<OrderByDirection>;
  label?: InputMaybe<OrderByDirection>;
  rotation?: InputMaybe<OrderByDirection>;
  seats_bottom?: InputMaybe<OrderByDirection>;
  seats_left?: InputMaybe<OrderByDirection>;
  seats_right?: InputMaybe<OrderByDirection>;
  seats_top?: InputMaybe<OrderByDirection>;
  width?: InputMaybe<OrderByDirection>;
  x?: InputMaybe<OrderByDirection>;
  y?: InputMaybe<OrderByDirection>;
};

export type Seating_ElementUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  rotation?: InputMaybe<Scalars['Float']['input']>;
  seats_bottom?: InputMaybe<Scalars['Int']['input']>;
  seats_left?: InputMaybe<Scalars['Int']['input']>;
  seats_right?: InputMaybe<Scalars['Int']['input']>;
  seats_top?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
};

export type Seating_ElementUpdateResponse = {
  __typename?: 'seating_elementUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seating_Element>;
};

export type GetAllInvitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInvitesQuery = { __typename?: 'Query', inviteCollection?: { __typename?: 'inviteConnection', edges: Array<{ __typename?: 'inviteEdge', node: { __typename?: 'invite', id: any, name?: string | null, message?: string | null, sent?: boolean | null, first_opened_at?: any | null, open_count: number, rsvpCollection?: { __typename?: 'rsvpConnection', edges: Array<{ __typename?: 'rsvpEdge', node: { __typename?: 'rsvp', id: any, attending?: boolean | null, dietary?: string | null, transit?: boolean | null, physical_invite?: boolean | null, song_recommendations?: string | null } }> } | null } }> } | null };

export type UpdateInviteSentMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  sent: Scalars['Boolean']['input'];
}>;


export type UpdateInviteSentMutation = { __typename?: 'Mutation', updateinviteCollection: { __typename?: 'inviteUpdateResponse', records: Array<{ __typename?: 'invite', id: any, sent?: boolean | null }> } };

export type AddInviteMutationVariables = Exact<{
  name: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AddInviteMutation = { __typename?: 'Mutation', insertIntoinviteCollection?: { __typename?: 'inviteInsertResponse', records: Array<{ __typename?: 'invite', id: any }> } | null };

export type GetInviteDetailQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInviteDetailQuery = { __typename?: 'Query', inviteCollection?: { __typename?: 'inviteConnection', edges: Array<{ __typename?: 'inviteEdge', node: { __typename?: 'invite', id: any, name?: string | null, message?: string | null } }> } | null };

export type TrackInviteOpenMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type TrackInviteOpenMutation = { __typename?: 'Mutation', track_invite_open?: any | null };

export type TrackEnvelopeOpenMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type TrackEnvelopeOpenMutation = { __typename?: 'Mutation', track_envelope_open?: any | null };

export type GetRsvpQueryVariables = Exact<{
  invite_id: Scalars['UUID']['input'];
}>;


export type GetRsvpQuery = { __typename?: 'Query', rsvpCollection?: { __typename?: 'rsvpConnection', edges: Array<{ __typename?: 'rsvpEdge', node: { __typename?: 'rsvp', id: any, attending?: boolean | null, dietary?: string | null, transit?: boolean | null, physical_invite?: boolean | null, song_recommendations?: string | null, email?: string | null, additional_notes?: string | null } }> } | null };

export type GetInviteNameQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInviteNameQuery = { __typename?: 'Query', inviteCollection?: { __typename?: 'inviteConnection', edges: Array<{ __typename?: 'inviteEdge', node: { __typename?: 'invite', name?: string | null } }> } | null };

export type InsertRsvpMutationVariables = Exact<{
  invite_id: Scalars['UUID']['input'];
  attending: Scalars['Boolean']['input'];
  dietary?: InputMaybe<Scalars['String']['input']>;
  transit?: InputMaybe<Scalars['Boolean']['input']>;
  physical_invite?: InputMaybe<Scalars['Boolean']['input']>;
  song_recommendations?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  additional_notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type InsertRsvpMutation = { __typename?: 'Mutation', insertIntorsvpCollection?: { __typename?: 'rsvpInsertResponse', records: Array<{ __typename?: 'rsvp', id: any }> } | null };

export type UpdateRsvpMutationVariables = Exact<{
  invite_id: Scalars['UUID']['input'];
  attending: Scalars['Boolean']['input'];
  dietary?: InputMaybe<Scalars['String']['input']>;
  transit?: InputMaybe<Scalars['Boolean']['input']>;
  physical_invite?: InputMaybe<Scalars['Boolean']['input']>;
  song_recommendations?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  additional_notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateRsvpMutation = { __typename?: 'Mutation', updatersvpCollection: { __typename?: 'rsvpUpdateResponse', records: Array<{ __typename?: 'rsvp', id: any }> } };

export type GetSeatingPlanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSeatingPlanQuery = { __typename?: 'Query', seating_elementCollection?: { __typename?: 'seating_elementConnection', edges: Array<{ __typename?: 'seating_elementEdge', node: { __typename?: 'seating_element', id: any, kind: string, label?: string | null, x: number, y: number, width: number, height: number, rotation: number, seats_top: number, seats_right: number, seats_bottom: number, seats_left: number } }> } | null, guestCollection?: { __typename?: 'guestConnection', edges: Array<{ __typename?: 'guestEdge', node: { __typename?: 'guest', id: any, full_name: string, invite_id?: any | null, invite?: { __typename?: 'invite', id: any, name?: string | null, rsvpCollection?: { __typename?: 'rsvpConnection', edges: Array<{ __typename?: 'rsvpEdge', node: { __typename?: 'rsvp', attending?: boolean | null } }> } | null } | null } }> } | null, seat_assignmentCollection?: { __typename?: 'seat_assignmentConnection', edges: Array<{ __typename?: 'seat_assignmentEdge', node: { __typename?: 'seat_assignment', id: any, element_id: any, guest_id: any, seat_index: number } }> } | null };

export type CreateSeatingElementMutationVariables = Exact<{
  objects: Array<Seating_ElementInsertInput> | Seating_ElementInsertInput;
}>;


export type CreateSeatingElementMutation = { __typename?: 'Mutation', insertIntoseating_elementCollection?: { __typename?: 'seating_elementInsertResponse', records: Array<{ __typename?: 'seating_element', id: any, kind: string, label?: string | null, x: number, y: number, width: number, height: number, rotation: number, seats_top: number, seats_right: number, seats_bottom: number, seats_left: number }> } | null };

export type UpdateSeatingElementMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  set: Seating_ElementUpdateInput;
}>;


export type UpdateSeatingElementMutation = { __typename?: 'Mutation', updateseating_elementCollection: { __typename?: 'seating_elementUpdateResponse', affectedCount: number } };

export type DeleteSeatingElementMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteSeatingElementMutation = { __typename?: 'Mutation', deleteFromseating_elementCollection: { __typename?: 'seating_elementDeleteResponse', affectedCount: number } };

export type GetAssignmentsForSwapQueryVariables = Exact<{
  guest_id: Scalars['UUID']['input'];
  element_id: Scalars['UUID']['input'];
  seat_index: Scalars['Int']['input'];
}>;


export type GetAssignmentsForSwapQuery = { __typename?: 'Query', current?: { __typename?: 'seat_assignmentConnection', edges: Array<{ __typename?: 'seat_assignmentEdge', node: { __typename?: 'seat_assignment', id: any, element_id: any, seat_index: number } }> } | null, occupant?: { __typename?: 'seat_assignmentConnection', edges: Array<{ __typename?: 'seat_assignmentEdge', node: { __typename?: 'seat_assignment', id: any, guest_id: any } }> } | null };

export type InsertSeatAssignmentsMutationVariables = Exact<{
  objects: Array<Seat_AssignmentInsertInput> | Seat_AssignmentInsertInput;
}>;


export type InsertSeatAssignmentsMutation = { __typename?: 'Mutation', insertIntoseat_assignmentCollection?: { __typename?: 'seat_assignmentInsertResponse', affectedCount: number } | null };

export type DeleteSeatAssignmentsByIdMutationVariables = Exact<{
  ids: Array<Scalars['UUID']['input']> | Scalars['UUID']['input'];
}>;


export type DeleteSeatAssignmentsByIdMutation = { __typename?: 'Mutation', deleteFromseat_assignmentCollection: { __typename?: 'seat_assignmentDeleteResponse', affectedCount: number } };

export type DeleteSeatAssignmentForGuestMutationVariables = Exact<{
  guest_id: Scalars['UUID']['input'];
}>;


export type DeleteSeatAssignmentForGuestMutation = { __typename?: 'Mutation', deleteFromseat_assignmentCollection: { __typename?: 'seat_assignmentDeleteResponse', affectedCount: number } };

export type CreateGuestMutationVariables = Exact<{
  objects: Array<GuestInsertInput> | GuestInsertInput;
}>;


export type CreateGuestMutation = { __typename?: 'Mutation', insertIntoguestCollection?: { __typename?: 'guestInsertResponse', records: Array<{ __typename?: 'guest', id: any, full_name: string, invite_id?: any | null }> } | null };

export type UpdateGuestMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  full_name: Scalars['String']['input'];
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateGuestMutation = { __typename?: 'Mutation', updateguestCollection: { __typename?: 'guestUpdateResponse', affectedCount: number } };

export type DeleteGuestMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteGuestMutation = { __typename?: 'Mutation', deleteFromguestCollection: { __typename?: 'guestDeleteResponse', affectedCount: number } };

export type GetInvitesForSeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInvitesForSeedQuery = { __typename?: 'Query', inviteCollection?: { __typename?: 'inviteConnection', edges: Array<{ __typename?: 'inviteEdge', node: { __typename?: 'invite', id: any, name?: string | null } }> } | null, guestCollection?: { __typename?: 'guestConnection', edges: Array<{ __typename?: 'guestEdge', node: { __typename?: 'guest', full_name: string } }> } | null };


export const GetAllInvitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllInvites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}},{"kind":"Field","name":{"kind":"Name","value":"first_opened_at"}},{"kind":"Field","name":{"kind":"Name","value":"open_count"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attending"}},{"kind":"Field","name":{"kind":"Name","value":"dietary"}},{"kind":"Field","name":{"kind":"Name","value":"transit"}},{"kind":"Field","name":{"kind":"Name","value":"physical_invite"}},{"kind":"Field","name":{"kind":"Name","value":"song_recommendations"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllInvitesQuery, GetAllInvitesQueryVariables>;
export const UpdateInviteSentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInviteSent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateinviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sent"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInviteSentMutation, UpdateInviteSentMutationVariables>;
export const AddInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoinviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sent"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddInviteMutation, AddInviteMutationVariables>;
export const GetInviteDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInviteDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetInviteDetailQuery, GetInviteDetailQueryVariables>;
export const TrackInviteOpenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TrackInviteOpen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track_invite_open"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"p_invite_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<TrackInviteOpenMutation, TrackInviteOpenMutationVariables>;
export const TrackEnvelopeOpenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TrackEnvelopeOpen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track_envelope_open"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"p_invite_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<TrackEnvelopeOpenMutation, TrackEnvelopeOpenMutationVariables>;
export const GetRsvpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRsvp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rsvpCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invite_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attending"}},{"kind":"Field","name":{"kind":"Name","value":"dietary"}},{"kind":"Field","name":{"kind":"Name","value":"transit"}},{"kind":"Field","name":{"kind":"Name","value":"physical_invite"}},{"kind":"Field","name":{"kind":"Name","value":"song_recommendations"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRsvpQuery, GetRsvpQueryVariables>;
export const GetInviteNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInviteName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetInviteNameQuery, GetInviteNameQueryVariables>;
export const InsertRsvpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertRsvp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attending"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dietary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"physical_invite"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"song_recommendations"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"additional_notes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntorsvpCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invite_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"attending"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attending"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dietary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dietary"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"transit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"physical_invite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"physical_invite"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"song_recommendations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"song_recommendations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"additional_notes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"additional_notes"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertRsvpMutation, InsertRsvpMutationVariables>;
export const UpdateRsvpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRsvp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attending"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dietary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"physical_invite"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"song_recommendations"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"additional_notes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatersvpCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invite_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"attending"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attending"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dietary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dietary"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"transit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"physical_invite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"physical_invite"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"song_recommendations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"song_recommendations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"additional_notes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"additional_notes"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRsvpMutation, UpdateRsvpMutationVariables>;
export const GetSeatingPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeatingPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seating_elementCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"200"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"rotation"}},{"kind":"Field","name":{"kind":"Name","value":"seats_top"}},{"kind":"Field","name":{"kind":"Name","value":"seats_right"}},{"kind":"Field","name":{"kind":"Name","value":"seats_bottom"}},{"kind":"Field","name":{"kind":"Name","value":"seats_left"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"guestCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"full_name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"200"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"invite_id"}},{"kind":"Field","name":{"kind":"Name","value":"invite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attending"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seat_assignmentCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"200"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"element_id"}},{"kind":"Field","name":{"kind":"Name","value":"guest_id"}},{"kind":"Field","name":{"kind":"Name","value":"seat_index"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSeatingPlanQuery, GetSeatingPlanQueryVariables>;
export const CreateSeatingElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSeatingElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"seating_elementInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoseating_elementCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"rotation"}},{"kind":"Field","name":{"kind":"Name","value":"seats_top"}},{"kind":"Field","name":{"kind":"Name","value":"seats_right"}},{"kind":"Field","name":{"kind":"Name","value":"seats_bottom"}},{"kind":"Field","name":{"kind":"Name","value":"seats_left"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSeatingElementMutation, CreateSeatingElementMutationVariables>;
export const UpdateSeatingElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSeatingElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"seating_elementUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateseating_elementCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<UpdateSeatingElementMutation, UpdateSeatingElementMutationVariables>;
export const DeleteSeatingElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSeatingElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFromseating_elementCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteSeatingElementMutation, DeleteSeatingElementMutationVariables>;
export const GetAssignmentsForSwapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssignmentsForSwap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"guest_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"element_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seat_index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"current"},"name":{"kind":"Name","value":"seat_assignmentCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"guest_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"guest_id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"element_id"}},{"kind":"Field","name":{"kind":"Name","value":"seat_index"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"occupant"},"name":{"kind":"Name","value":"seat_assignmentCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"element_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"element_id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"seat_index"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seat_index"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"guest_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAssignmentsForSwapQuery, GetAssignmentsForSwapQueryVariables>;
export const InsertSeatAssignmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertSeatAssignments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"seat_assignmentInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoseat_assignmentCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<InsertSeatAssignmentsMutation, InsertSeatAssignmentsMutationVariables>;
export const DeleteSeatAssignmentsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSeatAssignmentsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFromseat_assignmentCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteSeatAssignmentsByIdMutation, DeleteSeatAssignmentsByIdMutationVariables>;
export const DeleteSeatAssignmentForGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSeatAssignmentForGuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"guest_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFromseat_assignmentCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"guest_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"guest_id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteSeatAssignmentForGuestMutation, DeleteSeatAssignmentForGuestMutationVariables>;
export const CreateGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"guestInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoguestCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"invite_id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGuestMutation, CreateGuestMutationVariables>;
export const UpdateGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"full_name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateguestCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"full_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"full_name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"invite_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<UpdateGuestMutation, UpdateGuestMutationVariables>;
export const DeleteGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFromguestCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteGuestMutation, DeleteGuestMutationVariables>;
export const GetInvitesForSeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInvitesForSeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"200"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"guestCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"200"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"full_name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetInvitesForSeedQuery, GetInvitesForSeedQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: any; output: any; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: any; output: any; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date without time information */
  Date: { input: any; output: any; }
  /** A date and time */
  Datetime: { input: any; output: any; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: any; output: any; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: any; output: any; }
  /** A universally unique identifier */
  UUID: { input: any; output: any; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `app_settings` collection */
  deleteFromapp_settingsCollection: App_SettingsDeleteResponse;
  /** Deletes zero or more records from the `guest` collection */
  deleteFromguestCollection: GuestDeleteResponse;
  /** Deletes zero or more records from the `invite` collection */
  deleteFrominviteCollection: InviteDeleteResponse;
  /** Deletes zero or more records from the `rsvp` collection */
  deleteFromrsvpCollection: RsvpDeleteResponse;
  /** Deletes zero or more records from the `seat_assignment` collection */
  deleteFromseat_assignmentCollection: Seat_AssignmentDeleteResponse;
  /** Deletes zero or more records from the `seating_element` collection */
  deleteFromseating_elementCollection: Seating_ElementDeleteResponse;
  /** Adds one or more `app_settings` records to the collection */
  insertIntoapp_settingsCollection?: Maybe<App_SettingsInsertResponse>;
  /** Adds one or more `guest` records to the collection */
  insertIntoguestCollection?: Maybe<GuestInsertResponse>;
  /** Adds one or more `invite` records to the collection */
  insertIntoinviteCollection?: Maybe<InviteInsertResponse>;
  /** Adds one or more `rsvp` records to the collection */
  insertIntorsvpCollection?: Maybe<RsvpInsertResponse>;
  /** Adds one or more `seat_assignment` records to the collection */
  insertIntoseat_assignmentCollection?: Maybe<Seat_AssignmentInsertResponse>;
  /** Adds one or more `seating_element` records to the collection */
  insertIntoseating_elementCollection?: Maybe<Seating_ElementInsertResponse>;
  track_envelope_open?: Maybe<Scalars['Opaque']['output']>;
  track_invite_open?: Maybe<Scalars['Opaque']['output']>;
  /** Updates zero or more records in the `app_settings` collection */
  updateapp_settingsCollection: App_SettingsUpdateResponse;
  /** Updates zero or more records in the `guest` collection */
  updateguestCollection: GuestUpdateResponse;
  /** Updates zero or more records in the `invite` collection */
  updateinviteCollection: InviteUpdateResponse;
  /** Updates zero or more records in the `rsvp` collection */
  updatersvpCollection: RsvpUpdateResponse;
  /** Updates zero or more records in the `seat_assignment` collection */
  updateseat_assignmentCollection: Seat_AssignmentUpdateResponse;
  /** Updates zero or more records in the `seating_element` collection */
  updateseating_elementCollection: Seating_ElementUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromapp_SettingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<App_SettingsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromguestCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<GuestFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrominviteCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<InviteFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromrsvpCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RsvpFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromseat_AssignmentCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Seat_AssignmentFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromseating_ElementCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Seating_ElementFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoapp_SettingsCollectionArgs = {
  objects: Array<App_SettingsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoguestCollectionArgs = {
  objects: Array<GuestInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoinviteCollectionArgs = {
  objects: Array<InviteInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntorsvpCollectionArgs = {
  objects: Array<RsvpInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoseat_AssignmentCollectionArgs = {
  objects: Array<Seat_AssignmentInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoseating_ElementCollectionArgs = {
  objects: Array<Seating_ElementInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationTrack_Envelope_OpenArgs = {
  p_invite_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationTrack_Invite_OpenArgs = {
  p_invite_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationUpdateapp_SettingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<App_SettingsFilter>;
  set: App_SettingsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateguestCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<GuestFilter>;
  set: GuestUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateinviteCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<InviteFilter>;
  set: InviteUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatersvpCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RsvpFilter>;
  set: RsvpUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateseat_AssignmentCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Seat_AssignmentFilter>;
  set: Seat_AssignmentUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateseating_ElementCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Seating_ElementFilter>;
  set: Seating_ElementUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `app_settings` */
  app_settingsCollection?: Maybe<App_SettingsConnection>;
  /** A pagable collection of type `guest` */
  guestCollection?: Maybe<GuestConnection>;
  /** A pagable collection of type `invite` */
  inviteCollection?: Maybe<InviteConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `rsvp` */
  rsvpCollection?: Maybe<RsvpConnection>;
  /** A pagable collection of type `seat_assignment` */
  seat_assignmentCollection?: Maybe<Seat_AssignmentConnection>;
  /** A pagable collection of type `seating_element` */
  seating_elementCollection?: Maybe<Seating_ElementConnection>;
};


/** The root type for querying data */
export type QueryApp_SettingsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<App_SettingsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<App_SettingsOrderBy>>;
};


/** The root type for querying data */
export type QueryGuestCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GuestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GuestOrderBy>>;
};


/** The root type for querying data */
export type QueryInviteCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<InviteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InviteOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryRsvpCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RsvpFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RsvpOrderBy>>;
};


/** The root type for querying data */
export type QuerySeat_AssignmentCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Seat_AssignmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Seat_AssignmentOrderBy>>;
};


/** The root type for querying data */
export type QuerySeating_ElementCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Seating_ElementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Seating_ElementOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type App_Settings = Node & {
  __typename?: 'app_settings';
  key: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updated_at: Scalars['Datetime']['output'];
  value: Scalars['String']['output'];
};

export type App_SettingsConnection = {
  __typename?: 'app_settingsConnection';
  edges: Array<App_SettingsEdge>;
  pageInfo: PageInfo;
};

export type App_SettingsDeleteResponse = {
  __typename?: 'app_settingsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<App_Settings>;
};

export type App_SettingsEdge = {
  __typename?: 'app_settingsEdge';
  cursor: Scalars['String']['output'];
  node: App_Settings;
};

export type App_SettingsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<App_SettingsFilter>>;
  key?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<App_SettingsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<App_SettingsFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
  value?: InputMaybe<StringFilter>;
};

export type App_SettingsInsertInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type App_SettingsInsertResponse = {
  __typename?: 'app_settingsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<App_Settings>;
};

export type App_SettingsOrderBy = {
  key?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  value?: InputMaybe<OrderByDirection>;
};

export type App_SettingsUpdateInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type App_SettingsUpdateResponse = {
  __typename?: 'app_settingsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<App_Settings>;
};

export type Guest = Node & {
  __typename?: 'guest';
  created_at: Scalars['Datetime']['output'];
  full_name: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  invite?: Maybe<Invite>;
  invite_id?: Maybe<Scalars['UUID']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  seat_assignment?: Maybe<Seat_Assignment>;
};

export type GuestConnection = {
  __typename?: 'guestConnection';
  edges: Array<GuestEdge>;
  pageInfo: PageInfo;
};

export type GuestDeleteResponse = {
  __typename?: 'guestDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Guest>;
};

export type GuestEdge = {
  __typename?: 'guestEdge';
  cursor: Scalars['String']['output'];
  node: Guest;
};

export type GuestFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<GuestFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  full_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  invite_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<GuestFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<GuestFilter>>;
};

export type GuestInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type GuestInsertResponse = {
  __typename?: 'guestInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Guest>;
};

export type GuestOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  full_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  invite_id?: InputMaybe<OrderByDirection>;
};

export type GuestUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type GuestUpdateResponse = {
  __typename?: 'guestUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Guest>;
};

export type Invite = Node & {
  __typename?: 'invite';
  created_at: Scalars['Datetime']['output'];
  envelope_opened_at?: Maybe<Scalars['Datetime']['output']>;
  first_opened_at?: Maybe<Scalars['Datetime']['output']>;
  guestCollection?: Maybe<GuestConnection>;
  id: Scalars['UUID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  number_of_attendees: Scalars['Int']['output'];
  open_count: Scalars['Int']['output'];
  rsvpCollection?: Maybe<RsvpConnection>;
  sent?: Maybe<Scalars['Boolean']['output']>;
};


export type InviteGuestCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GuestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GuestOrderBy>>;
};


export type InviteRsvpCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RsvpFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RsvpOrderBy>>;
};

export type InviteConnection = {
  __typename?: 'inviteConnection';
  edges: Array<InviteEdge>;
  pageInfo: PageInfo;
};

export type InviteDeleteResponse = {
  __typename?: 'inviteDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Invite>;
};

export type InviteEdge = {
  __typename?: 'inviteEdge';
  cursor: Scalars['String']['output'];
  node: Invite;
};

export type InviteFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<InviteFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  envelope_opened_at?: InputMaybe<DatetimeFilter>;
  first_opened_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  message?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<InviteFilter>;
  number_of_attendees?: InputMaybe<IntFilter>;
  open_count?: InputMaybe<IntFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<InviteFilter>>;
  sent?: InputMaybe<BooleanFilter>;
};

export type InviteInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  envelope_opened_at?: InputMaybe<Scalars['Datetime']['input']>;
  first_opened_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  number_of_attendees?: InputMaybe<Scalars['Int']['input']>;
  open_count?: InputMaybe<Scalars['Int']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InviteInsertResponse = {
  __typename?: 'inviteInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Invite>;
};

export type InviteOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  envelope_opened_at?: InputMaybe<OrderByDirection>;
  first_opened_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  message?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  number_of_attendees?: InputMaybe<OrderByDirection>;
  open_count?: InputMaybe<OrderByDirection>;
  sent?: InputMaybe<OrderByDirection>;
};

export type InviteUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  envelope_opened_at?: InputMaybe<Scalars['Datetime']['input']>;
  first_opened_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  number_of_attendees?: InputMaybe<Scalars['Int']['input']>;
  open_count?: InputMaybe<Scalars['Int']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InviteUpdateResponse = {
  __typename?: 'inviteUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Invite>;
};

export type Rsvp = Node & {
  __typename?: 'rsvp';
  additional_notes?: Maybe<Scalars['String']['output']>;
  attending?: Maybe<Scalars['Boolean']['output']>;
  created_at: Scalars['Datetime']['output'];
  dietary?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  invite?: Maybe<Invite>;
  invite_id?: Maybe<Scalars['UUID']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  physical_invite?: Maybe<Scalars['Boolean']['output']>;
  song_recommendations?: Maybe<Scalars['String']['output']>;
  transit?: Maybe<Scalars['Boolean']['output']>;
};

export type RsvpConnection = {
  __typename?: 'rsvpConnection';
  edges: Array<RsvpEdge>;
  pageInfo: PageInfo;
};

export type RsvpDeleteResponse = {
  __typename?: 'rsvpDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Rsvp>;
};

export type RsvpEdge = {
  __typename?: 'rsvpEdge';
  cursor: Scalars['String']['output'];
  node: Rsvp;
};

export type RsvpFilter = {
  additional_notes?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RsvpFilter>>;
  attending?: InputMaybe<BooleanFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  dietary?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  invite_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<RsvpFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<RsvpFilter>>;
  physical_invite?: InputMaybe<BooleanFilter>;
  song_recommendations?: InputMaybe<StringFilter>;
  transit?: InputMaybe<BooleanFilter>;
};

export type RsvpInsertInput = {
  additional_notes?: InputMaybe<Scalars['String']['input']>;
  attending?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  dietary?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
  physical_invite?: InputMaybe<Scalars['Boolean']['input']>;
  song_recommendations?: InputMaybe<Scalars['String']['input']>;
  transit?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RsvpInsertResponse = {
  __typename?: 'rsvpInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Rsvp>;
};

export type RsvpOrderBy = {
  additional_notes?: InputMaybe<OrderByDirection>;
  attending?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  dietary?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  invite_id?: InputMaybe<OrderByDirection>;
  physical_invite?: InputMaybe<OrderByDirection>;
  song_recommendations?: InputMaybe<OrderByDirection>;
  transit?: InputMaybe<OrderByDirection>;
};

export type RsvpUpdateInput = {
  additional_notes?: InputMaybe<Scalars['String']['input']>;
  attending?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  dietary?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  invite_id?: InputMaybe<Scalars['UUID']['input']>;
  physical_invite?: InputMaybe<Scalars['Boolean']['input']>;
  song_recommendations?: InputMaybe<Scalars['String']['input']>;
  transit?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RsvpUpdateResponse = {
  __typename?: 'rsvpUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Rsvp>;
};

export type Seat_Assignment = Node & {
  __typename?: 'seat_assignment';
  created_at: Scalars['Datetime']['output'];
  element_id: Scalars['UUID']['output'];
  guest?: Maybe<Guest>;
  guest_id: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  seat_index: Scalars['Int']['output'];
  seating_element?: Maybe<Seating_Element>;
};

export type Seat_AssignmentConnection = {
  __typename?: 'seat_assignmentConnection';
  edges: Array<Seat_AssignmentEdge>;
  pageInfo: PageInfo;
};

export type Seat_AssignmentDeleteResponse = {
  __typename?: 'seat_assignmentDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seat_Assignment>;
};

export type Seat_AssignmentEdge = {
  __typename?: 'seat_assignmentEdge';
  cursor: Scalars['String']['output'];
  node: Seat_Assignment;
};

export type Seat_AssignmentFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Seat_AssignmentFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  element_id?: InputMaybe<UuidFilter>;
  guest_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Seat_AssignmentFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Seat_AssignmentFilter>>;
  seat_index?: InputMaybe<IntFilter>;
};

export type Seat_AssignmentInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  element_id?: InputMaybe<Scalars['UUID']['input']>;
  guest_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  seat_index?: InputMaybe<Scalars['Int']['input']>;
};

export type Seat_AssignmentInsertResponse = {
  __typename?: 'seat_assignmentInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seat_Assignment>;
};

export type Seat_AssignmentOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  element_id?: InputMaybe<OrderByDirection>;
  guest_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  seat_index?: InputMaybe<OrderByDirection>;
};

export type Seat_AssignmentUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  element_id?: InputMaybe<Scalars['UUID']['input']>;
  guest_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  seat_index?: InputMaybe<Scalars['Int']['input']>;
};

export type Seat_AssignmentUpdateResponse = {
  __typename?: 'seat_assignmentUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seat_Assignment>;
};

export type Seating_Element = Node & {
  __typename?: 'seating_element';
  created_at: Scalars['Datetime']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['UUID']['output'];
  kind: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  rotation: Scalars['Float']['output'];
  seat_assignmentCollection?: Maybe<Seat_AssignmentConnection>;
  seats_bottom: Scalars['Int']['output'];
  seats_left: Scalars['Int']['output'];
  seats_right: Scalars['Int']['output'];
  seats_top: Scalars['Int']['output'];
  width: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};


export type Seating_ElementSeat_AssignmentCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Seat_AssignmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Seat_AssignmentOrderBy>>;
};

export type Seating_ElementConnection = {
  __typename?: 'seating_elementConnection';
  edges: Array<Seating_ElementEdge>;
  pageInfo: PageInfo;
};

export type Seating_ElementDeleteResponse = {
  __typename?: 'seating_elementDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seating_Element>;
};

export type Seating_ElementEdge = {
  __typename?: 'seating_elementEdge';
  cursor: Scalars['String']['output'];
  node: Seating_Element;
};

export type Seating_ElementFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Seating_ElementFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  height?: InputMaybe<FloatFilter>;
  id?: InputMaybe<UuidFilter>;
  kind?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Seating_ElementFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Seating_ElementFilter>>;
  rotation?: InputMaybe<FloatFilter>;
  seats_bottom?: InputMaybe<IntFilter>;
  seats_left?: InputMaybe<IntFilter>;
  seats_right?: InputMaybe<IntFilter>;
  seats_top?: InputMaybe<IntFilter>;
  width?: InputMaybe<FloatFilter>;
  x?: InputMaybe<FloatFilter>;
  y?: InputMaybe<FloatFilter>;
};

export type Seating_ElementInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  rotation?: InputMaybe<Scalars['Float']['input']>;
  seats_bottom?: InputMaybe<Scalars['Int']['input']>;
  seats_left?: InputMaybe<Scalars['Int']['input']>;
  seats_right?: InputMaybe<Scalars['Int']['input']>;
  seats_top?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
};

export type Seating_ElementInsertResponse = {
  __typename?: 'seating_elementInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seating_Element>;
};

export type Seating_ElementOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  height?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  kind?: InputMaybe<OrderByDirection>;
  label?: InputMaybe<OrderByDirection>;
  rotation?: InputMaybe<OrderByDirection>;
  seats_bottom?: InputMaybe<OrderByDirection>;
  seats_left?: InputMaybe<OrderByDirection>;
  seats_right?: InputMaybe<OrderByDirection>;
  seats_top?: InputMaybe<OrderByDirection>;
  width?: InputMaybe<OrderByDirection>;
  x?: InputMaybe<OrderByDirection>;
  y?: InputMaybe<OrderByDirection>;
};

export type Seating_ElementUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  rotation?: InputMaybe<Scalars['Float']['input']>;
  seats_bottom?: InputMaybe<Scalars['Int']['input']>;
  seats_left?: InputMaybe<Scalars['Int']['input']>;
  seats_right?: InputMaybe<Scalars['Int']['input']>;
  seats_top?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
};

export type Seating_ElementUpdateResponse = {
  __typename?: 'seating_elementUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Seating_Element>;
};
