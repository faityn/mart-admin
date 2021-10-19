import { gql } from 'apollo-boost';

// GET_ORDERS
export const GET_ORDERS = gql`
  query getOrders($search: OrderSearchInput, $page: PageInput){
    getOrders(search: $search, page: $page) {
      totalElements,
      list {
        orderNumber
        registerDate
        status
        product {
          id
          name
          sku
          price
          count
        }
        hasManyProducts
        totalPrice
        paymentMethod
        shippingType
      } 
    }
  }
`;

// CREATE_ORDER
export const CREATE_ORDER = gql`
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

// UPDATE_ORDER
export const UPDATE_ORDER = gql`
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

// Get ORDER
export const FIND_ORDER = gql`
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

// ORDER_PRODUCTS
export const ORDER_PRODUCTS = gql`
  query getOrderProducts($orderNumber: String!) {
    getOrderProducts(orderNumber: $orderNumber) {
      id
      name
      nameEng
      sku
      price
      weight
      count
      imageUrl
    }
  }
`;

// DELETE_ORDER
export const DELETE_ORDER = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id)
  }
`;
