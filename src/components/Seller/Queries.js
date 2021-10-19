import { gql } from "apollo-boost";

export const FORGET_PASSWORD = gql`
  mutation forgetPassword($input: ForgetPasswordInput) {
    forgetPassword(input: $input) {
      statusCode
      data
    }
  }
`;

// CHECK_MAIL
export const CHECK_MAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email)
  }
`;

// Register seller
export const SAVE_SELLER = gql`
  mutation saveUser($user: UserInput) {
    saveUser(user: $user) {
      statusCode
      data
    }
  }
`;

// Upload seller certificate
export const UPLOAD_CERTIFICATE = gql`
  mutation uploadAgentCertificate($file: Upload!) {
    uploadAgentCertificate(file: $file) {
      statusCode
      data
    }
  }
`;

// Get seller information
export const GET_SELLER = gql`
  query {
    userLogged {
      id
      email
      firstName
      middleName
      lastName
      birthday
      gender
      nation
      city
      state
      address1
      address2
      address3
      postalCode
      phoneNumber
      status
      memberType
      bank
      accountNumber
      agentCertificate
      agreement
      companyName
      businessCopy
      passbookCopy
    }
  }
`;

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
        brand
        isDisplay
        status
        reqCount
        shipmentDate
        reason
        request {
          createdDate
          price
          tradePrice
          count
          shipmentDate
        }
      }
    }
  }
`;

// Get product list
export const GET_PRODUCT_HYSTORIES = gql`
  query getSellerProductHistory($productId: String!) {
    getSellerProductHistory(productId: $productId) {
      createdDate
      tradePrice
      price
      updatedDate
      count
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

// Seller products request
export const SELLER_PRODUCTS_REQUEST = gql`
  mutation requestProduct($products: [RequestProductInput]) {
    requestProduct(products: $products) {
      statusCode
      data
    }
  }
`;

// Get total amount of sold products
export const GET_PRODUCTS_SOLD = gql`
  query {
    getProductSold {
      productId
      sku
      price
      count
      totalPrice
    }
  }
`;

// Get total amount of products by date
export const GET_PRODUCTS_SOLD_DETAIL = gql`
  query getProductSoldDetail($productId: String!) {
    getProductSoldDetail(productId: $productId) {
      registerDate
      price
      count
      totalPrice
    }
  }
`;

// Sales status
export const GET_SOLD_LIST = gql`
  query getProductSoldList($search: SearchInput, $page: PageInput) {
    getProductSoldList(search: $search, page: $page) {
      totalElements
      totalPrice
      list {
        firstName
        lastName
        registerDate
        orderNumber
        name
        sku
        price
        totalPrice
        count
        reqCount
        shipmentDate
        status
        paymentDate
        requestProductCount
        son {
          orderNumber
          productId
          number
          count
          price
          memo
        }
        paymentStatus
      }
    }
  }
`;

// NOT USED

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

export const GET_USER_REG = gql`
  query getUserDailyRegistAgeAndSex($search: UserStatisticSearchInput) {
    getUserDailyRegistAgeAndSex(search: $search) {
      registDate
      registCount
      femaleCount
      maleCount
      unknownSexCount
      teenAgerCount
      twentyAprxCount
      thirtyAprxCount
      fortyAprxCount
      fiftyAprxCount
      sixtyAboveCount
    }
  }
`;

// Activation
export const ACTIVATION = gql`
  mutation activation($token: String!) {
    activation(token: $token) {
      statusCode
      data
    }
  }
`;