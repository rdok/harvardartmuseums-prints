import { gql } from "@apollo/client";

export const TOP_PRINTS = gql`
  query Objects($input: ObjectsInput!) {
    objects(input: $input) {
      data {
        id
        rank
        primaryImageUrl
        title
        url
        dateBegin
        division
        technique
        rank
        verificationLevelDescription
      }
      currentPage
      itemsPerPage
      totalItems
      totalPages
    }
  }
`;
