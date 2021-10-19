import { gql } from "apollo-boost";

// Get set products
export const GET_SET_PRODUCTS = gql`
  query getProductsOfSetAdmin($search: SearchInput, $page: PageInput) {
    getProductsOfSetAdmin(search: $search, page: $page) {
      totalElements
      list {
        productName
        code
        firstCategoryName
        secondCategoryName
        thirdCategoryName
        products {
          productId
          sku
          firstTheme
          secondTheme
        }
      }
    }
  }
`;

// Get set product
export const GET_SET_PRODUCT = gql`
  query getProductsOfSet($code: String!) {
    getProductsOfSet(code: $code) {
      productName
      firstCategory
      secondCategory
      thirdCategory
      firstThemeName
      secondThemeName
      products {
        productId
        sku
        firstTheme
        secondTheme
      }
    }
  }
`;

// Save set product
export const SAVE_SET_PRODUCT = gql`
  mutation setProductSave($input: SetInput) {
    setProductSave(input: $input) {
      statusCode
      data
    }
  }
`;
