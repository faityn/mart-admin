import { gql } from "apollo-boost";

// Get product list
export const GET_PRODUCTS = gql`
  query getProducts($search: SearchInput, $page: PageInput) {
    getProducts(search: $search, page: $page) {
      totalElements
      list {
        id
        firstCategory
        secondCategory
        thirdCategory
        name
        nameEng
        imageUrl
        inventory
        price
        weight
        sku
        registerDate
        updatedDate
        brand
        isDisplay
        isSeller
        status
        reqCount
        shipmentDate
        reason
        manufacturer
        request {
          createdDate
          price
          tradePrice
          count
          shipmentDate
        }
        premiumServices
      }
    }
  }
`;

export const UPDATE_INVENTORY_PLACES = gql`
  mutation updateInventoryPrice($inventoryPrices: [InventoryPriceInput]) {
    updateInventoryPrice(inventoryPrices: $inventoryPrices) {
      statusCode
      data
    }
  }
`;

// Get product list
export const GET_PRODUCTS_OLD = gql`
  query getProducts($search: SearchInput, $page: PageInput) {
    getProducts(search: $search, page: $page) {
      totalElements
      list {
        id
        firstCategory
        secondCategory
        thirdCategory
        name
        nameEng
        imageUrl
        inventory
        price
        sku
        registerDate
        brand
        isDisplay
      }
    }
  }
`;

// Delete product
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id) {
      statusCode
      data
    }
  }
`;

// Subscribe product
export const SUBSCRIPTION_PRODUCT = gql`
  subscription($id: String) {
    onProductUpdate(id: $id) {
      name
    }
  }
`;

// Upload product image
export const UPLOAD_IMAGE = gql`
  mutation uploadImageProduct($image: Upload!) {
    uploadImageProduct(image: $image) {
      statusCode
      data
    }
  }
`;

// Upload file
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      statusCode
      data
    }
  }
`;

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

// Get categories
export const GET_CATEGORIES_FOR_SEARCH = gql`
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

    getStickers {
      id
      name
      active
      imageUrl
      position
    }
  }
`;

// Update inventory and price
export const UPDATE_INVENTORY_AND_PRICE = gql`
  mutation updateInventoryPrice($inventoryPrices: [InventoryPriceInput]) {
    updateInventoryPrice(inventoryPrices: $inventoryPrices) {
      statusCode
      data
    }
  }
`;

// Seller product request
export const SELLER_PRODUCT_REQUEST = gql`
  mutation acceptProduct($product: AcceptProductInput) {
    acceptProduct(product: $product) {
      statusCode
      data
    }
  }
`;

// Premium service
export const GET_PREMIUM_SERVICE = gql`
  query getSellerPremiumServiceList {
    getSellerPremiumServiceList {
      field1
    }
  }
`;
