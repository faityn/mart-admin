import { gql } from 'apollo-boost';

// Get categories
export const GET_CATEGORIES = gql`
query getCategories {
  categories {
    first {
      id
      name
      parentId
    }
    second {
      id
      name
      parentId
    }
    third {
      id
      name
      parentId
    }
  }
}
`;