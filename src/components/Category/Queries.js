import { gql } from 'apollo-boost';

// GET_PRODUCTS
export const GET_CATEGORIES = gql`
  query getCategories($isAdmin: Boolean) {
    categories(isAdmin: $isAdmin) {
      first {
        id
        name
        icon
        parentId
      }
      second {
        id
        name
        icon
        parentId
      }
      third {
        id
        name
        icon
        parentId
      }
    }
  }
`;

// SAVE_CATEGORY
export const SAVE_CATEGORY = gql`
  mutation saveCategory($category: CategoryInput) {
    saveCategory(category: $category) {
        statusCode
        data
    }
  }
`;

// UPLOAD_IMAGE
export const UPLOAD_IMAGE = gql`
  mutation uploadImageCategory($image: Upload!) {
    uploadImageCategory(image: $image) {
      statusCode 
      data
    }
  }
`;

// UPLOAD_IMAGE_CATEGORY
export const UPLOAD_IMAGE_ICON = gql`
  mutation uploadIconCategory($image: Upload!) {
    uploadIconCategory(image: $image){
      statusCode 
      data
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
      images {
        imageUrl
        url
      }
    }
  }
`;

// DELETE_PRODUCT
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id)
  }
`;
