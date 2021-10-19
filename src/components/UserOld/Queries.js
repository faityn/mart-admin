import { gql } from 'apollo-boost';

// GET_PRODUCTS
export const GET_PRODUCTS = gql`
  query getProducts($search: SearchInput, $page: PageInput){
    getProducts(search: $search, page: $page) {
      totalElements,
      list {
          id,
          category
          code
          name
          name
          nameEng
          sku
          price
          inventory
          weight
      }
    }
  }
`;

// CREATE_PRODUCT
export const CREATE_PRODUCT = gql`
  mutation createProduct($product: ProductInput) {
    createProduct(product: $product) {
        category
        code
        name
        nameEng
        sku
        price
        inventory
        weight
    }
  }
`;

// UPDATE_PRODUCT
export const UPDATE_PRODUCT = gql`
  mutation ($id: String, $product: ProductInput) {
    updateProduct(id: $id, product: $product) {
        category
        code
        name
        nameEng
        sku
        price
        inventory
        weight
    }
  }
`;

// Get product
export const FIND_PRODUCT = gql`
  query findProduct($id: String) {
    findProduct(id: $id) {
        category
        code
        name
        name
        nameEng
        sku
        price
        inventory
        weight
    }
  }
`;

// DELETE_PRODUCT
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id)
  }
`;
