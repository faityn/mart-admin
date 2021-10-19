import { gql } from 'apollo-boost';

// Get discount
export const GET_FREE_SHIPPING = gql`
  query {
    getFreeShipping {
      id
      isHideAddToCart
      stickerId
      startDate
      endDate
      discountType
      discount
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
`;

// Save discount
export const SAVE_FREE_SHIPPING = gql`
  mutation saveFreeShipping($freeShipping: [FreeShippingInput]) {
    saveFreeShipping(freeShipping: $freeShipping) {
      statusCode
      data
    }
  }
`;