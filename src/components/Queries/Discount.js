import { gql } from 'apollo-boost';

// Get discount
export const GET_DISCOUNT = gql`
query getDiscount($page: PageInput) {
  getDiscount(page: $page) {
    totalElements
    list {
      id
      discountType
      discount
      startDate
      endDate
      stickerId
      total
      products {
        productId
        stickerUrl
        imageUrl
        name
        price
      }
    }
  }
}
`;

// Get discount
export const GET_DISCOUNT_AND_STICKERS = gql`
query getDiscount($page: PageInput) {
  getDiscount(page: $page) {
    totalElements
    list {
      id
      discountType
      discount
      startDate
      endDate
      stickerId
      total
      products {
        productId
        stickerUrl
        imageUrl
        name
        price
      }
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

// Save discount
export const SAVE_DISCOUNT = gql`
  mutation saveDiscount($discount: [DiscountInput]) {
    saveDiscount(discount: $discount) {
      statusCode
      data
    }
  }
`;