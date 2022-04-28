/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ObjectsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: Objects
// ====================================================

export interface Objects_objects_data {
  __typename: "ObjectResource";
  id: string;
  rank: number;
  primaryImageUrl: string | null;
  title: string;
  url: string;
  dateBegin: string | null;
  division: string;
  technique: string;
  verificationLevelDescription: string | null;
}

export interface Objects_objects {
  __typename: "Objects";
  data: Objects_objects_data[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface Objects {
  objects: Objects_objects | null;
}

export interface ObjectsVariables {
  input: ObjectsInput;
}
