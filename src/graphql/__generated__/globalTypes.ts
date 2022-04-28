/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Classification {
  PORTFOLIOS = "PORTFOLIOS",
  PRINTS = "PRINTS",
  SCULPTURE = "SCULPTURE",
}

export enum SortByFields {
  RANK = "RANK",
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export enum VerificationLevel {
  ADEQUATE = "ADEQUATE",
  BEST = "BEST",
  GOOD = "GOOD",
  POOR = "POOR",
  UNCHECKED = "UNCHECKED",
}

export interface Filter {
  hasImage?: boolean | null;
  classification?: Classification | null;
  verificationLevel?: VerificationLevel | null;
}

export interface ObjectsInput {
  pageNumber?: number | null;
  pageSize?: number | null;
  orderBy?: SortBy | null;
  filter?: Filter | null;
}

export interface SortBy {
  sortBy: SortByFields;
  sortOrder: SortOrder;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
