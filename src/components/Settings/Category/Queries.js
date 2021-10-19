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

// CATEGORY
export const CATEGORY = gql`
  query category($id: String!) {
    category(id: $id) {
      id
      name
      icon
      parentId
      active
      description
      images {
        imageUrl
        url
      }
    }
  }
`;

// CATEGORY
export const SAVE_CATEGORY = gql`
  mutation saveCategoryDescription($category: CategoryDescriptionInput) {
    saveCategoryDescription(category: $category) {
        statusCode
        data
    }
  }
`;