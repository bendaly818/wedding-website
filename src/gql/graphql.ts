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
  /** Deletes zero or more records from the `invite` collection */
  deleteFrominviteCollection: InviteDeleteResponse;
  /** Deletes zero or more records from the `rsvp` collection */
  deleteFromrsvpCollection: RsvpDeleteResponse;
  /** Adds one or more `app_settings` records to the collection */
  insertIntoapp_settingsCollection?: Maybe<App_SettingsInsertResponse>;
  /** Adds one or more `invite` records to the collection */
  insertIntoinviteCollection?: Maybe<InviteInsertResponse>;
  /** Adds one or more `rsvp` records to the collection */
  insertIntorsvpCollection?: Maybe<RsvpInsertResponse>;
  /** Updates zero or more records in the `app_settings` collection */
  updateapp_settingsCollection: App_SettingsUpdateResponse;
  /** Updates zero or more records in the `invite` collection */
  updateinviteCollection: InviteUpdateResponse;
  /** Updates zero or more records in the `rsvp` collection */
  updatersvpCollection: RsvpUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromapp_SettingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<App_SettingsFilter>;
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
export type MutationInsertIntoapp_SettingsCollectionArgs = {
  objects: Array<App_SettingsInsertInput>;
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
export type MutationUpdateapp_SettingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<App_SettingsFilter>;
  set: App_SettingsUpdateInput;
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
  /** A pagable collection of type `invite` */
  inviteCollection?: Maybe<InviteConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `rsvp` */
  rsvpCollection?: Maybe<RsvpConnection>;
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

export type Invite = Node & {
  __typename?: 'invite';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  rsvpCollection?: Maybe<RsvpConnection>;
  sent?: Maybe<Scalars['Boolean']['output']>;
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
  id?: InputMaybe<UuidFilter>;
  message?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<InviteFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<InviteFilter>>;
  sent?: InputMaybe<BooleanFilter>;
};

export type InviteInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  id?: InputMaybe<OrderByDirection>;
  message?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  sent?: InputMaybe<OrderByDirection>;
};

export type InviteUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  attending?: Maybe<Scalars['Boolean']['output']>;
  created_at: Scalars['Datetime']['output'];
  dietary?: Maybe<Scalars['String']['output']>;
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
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RsvpFilter>>;
  attending?: InputMaybe<BooleanFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  dietary?: InputMaybe<StringFilter>;
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
  attending?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  dietary?: InputMaybe<Scalars['String']['input']>;
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
  attending?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  dietary?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  invite_id?: InputMaybe<OrderByDirection>;
  physical_invite?: InputMaybe<OrderByDirection>;
  song_recommendations?: InputMaybe<OrderByDirection>;
  transit?: InputMaybe<OrderByDirection>;
};

export type RsvpUpdateInput = {
  attending?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  dietary?: InputMaybe<Scalars['String']['input']>;
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

export type GetAllInvitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInvitesQuery = { __typename?: 'Query', inviteCollection?: { __typename?: 'inviteConnection', edges: Array<{ __typename?: 'inviteEdge', node: { __typename?: 'invite', id: any, name?: string | null, message?: string | null, sent?: boolean | null, rsvpCollection?: { __typename?: 'rsvpConnection', edges: Array<{ __typename?: 'rsvpEdge', node: { __typename?: 'rsvp', id: any, attending?: boolean | null, dietary?: string | null, transit?: boolean | null, physical_invite?: boolean | null, song_recommendations?: string | null } }> } | null } }> } | null };

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

export type GetRsvpQueryVariables = Exact<{
  invite_id: Scalars['UUID']['input'];
}>;


export type GetRsvpQuery = { __typename?: 'Query', rsvpCollection?: { __typename?: 'rsvpConnection', edges: Array<{ __typename?: 'rsvpEdge', node: { __typename?: 'rsvp', id: any, attending?: boolean | null, dietary?: string | null, transit?: boolean | null, physical_invite?: boolean | null, song_recommendations?: string | null } }> } | null };

export type InsertRsvpMutationVariables = Exact<{
  invite_id: Scalars['UUID']['input'];
  attending: Scalars['Boolean']['input'];
  dietary?: InputMaybe<Scalars['String']['input']>;
  transit?: InputMaybe<Scalars['Boolean']['input']>;
  physical_invite?: InputMaybe<Scalars['Boolean']['input']>;
  song_recommendations?: InputMaybe<Scalars['String']['input']>;
}>;


export type InsertRsvpMutation = { __typename?: 'Mutation', insertIntorsvpCollection?: { __typename?: 'rsvpInsertResponse', records: Array<{ __typename?: 'rsvp', id: any }> } | null };

export type UpdateRsvpMutationVariables = Exact<{
  invite_id: Scalars['UUID']['input'];
  attending: Scalars['Boolean']['input'];
  dietary?: InputMaybe<Scalars['String']['input']>;
  transit?: InputMaybe<Scalars['Boolean']['input']>;
  physical_invite?: InputMaybe<Scalars['Boolean']['input']>;
  song_recommendations?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateRsvpMutation = { __typename?: 'Mutation', updatersvpCollection: { __typename?: 'rsvpUpdateResponse', records: Array<{ __typename?: 'rsvp', id: any }> } };


export const GetAllInvitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllInvites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attending"}},{"kind":"Field","name":{"kind":"Name","value":"dietary"}},{"kind":"Field","name":{"kind":"Name","value":"transit"}},{"kind":"Field","name":{"kind":"Name","value":"physical_invite"}},{"kind":"Field","name":{"kind":"Name","value":"song_recommendations"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllInvitesQuery, GetAllInvitesQueryVariables>;
export const AddInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoinviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sent"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddInviteMutation, AddInviteMutationVariables>;
export const GetInviteDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInviteDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetInviteDetailQuery, GetInviteDetailQueryVariables>;
export const GetRsvpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRsvp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rsvpCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invite_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attending"}},{"kind":"Field","name":{"kind":"Name","value":"dietary"}},{"kind":"Field","name":{"kind":"Name","value":"transit"}},{"kind":"Field","name":{"kind":"Name","value":"physical_invite"}},{"kind":"Field","name":{"kind":"Name","value":"song_recommendations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRsvpQuery, GetRsvpQueryVariables>;
export const InsertRsvpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertRsvp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attending"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dietary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"physical_invite"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"song_recommendations"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntorsvpCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invite_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"attending"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attending"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dietary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dietary"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"transit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"physical_invite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"physical_invite"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"song_recommendations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"song_recommendations"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertRsvpMutation, InsertRsvpMutationVariables>;
export const UpdateRsvpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRsvp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attending"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dietary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"physical_invite"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"song_recommendations"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatersvpCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invite_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invite_id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"attending"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attending"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dietary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dietary"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"transit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"physical_invite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"physical_invite"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"song_recommendations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"song_recommendations"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRsvpMutation, UpdateRsvpMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
