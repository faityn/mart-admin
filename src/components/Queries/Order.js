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
        country
        city
        state
        postalCode
        address
        invoiceNumber
      }
    }
  }
`;

// GET_ORDERS
export const GET_ORDERS_BY_USER = gql`
  query getUserOrdersById($page: PageInput, $id: String!){
    getUserOrdersById(page: $page, id: $id) {
      totalElements,
      list {
        orderNumber
        registerDate
        status
        products {
          id
          name
          sku
          price
          count
        }
        totalPrice
      }
    }
  }
`;

// GET_ORDER_PRINT_SHEET
export const GET_ORDER_PRINT_SHEET = gql`
  query orderPrintSheet($orderNumber: String!) {
    orderPrintSheet(orderNumber: $orderNumber) {
      orderNumber
      paymentMethod
      registerDate
      shippingType
      status
      paymentDate
      confirmDate
      invoiceNumber
      subTotal
      totalDiscount
      totalPoint
      shippingPrice
      totalTax
      refundAmount
      totalPrice
      email
      firstName
      lastName
      phoneCode
      phoneNumber
      qrImageUrl
      address {
          postalCode
          country
          city
          state
          address
          phoneCode
          phoneNumber
      }
      products {
          id
          name
          nameEng
          sku
          price
          weight
          count
          imageUrl
          tax
          point
          discount
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

// SAVE invoice number
export const SAVE_INVOICENUMBER_ORDER = gql`
  mutation saveInvoiceNumber($invoiceInput: [OrderInvoiceInput]) {
    saveInvoiceNumber(invoiceInput: $invoiceInput) {
      statusCode
      data
    }
  }
`;


// UPDATE_ORDER_QR
export const UPDATE_ORDER_QR =gql`
  mutation updateQrVerification($orderNumber: String!, $imageUrl: String!) {
    updateQrVerification(orderNumber: $orderNumber, imageUrl: $imageUrl) {
      statusCode
      data
    }
  }
`;

// UPLOAD_IMAGE_ORDER_QR
export const UPLOAD_IMAGE_ORDER_QR =gql`
  mutation qrVerificationImage($file: Upload!) {
    qrVerificationImage(file: $file) {
      statusCode
      data
    }
  }
`;


// UPDATE_STATUS
export const UPDATE_ORDER_STATUS = gql`
  mutation updateStatus($status: OrderStatusInput) {
    updateStatus(status: $status) {
      statusCode
      data
    }
  }
`;

// SAVE INVOICE NUMBER
export const FIND_ORDER = gql`
  mutation saveInvoiceNumber($invoiceInput: [OrderInvoiceInput]) {
    saveInvoiceNumber(invoiceInput: $invoiceInput) {
      statusCode
      data
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

// QNA
export const GET_ORDER_NUMBER = gql`
  query getOrders($search: OrderSearchInput, $page: PageInput){
    getOrders(search: $search, page: $page) {
      totalElements,
      list {
        orderNumber
      }
    }
  }
`;