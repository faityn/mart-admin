import { gql } from 'apollo-boost';

// Get nPlus one
export const GET_NPLUSONE = gql`
  query {
    getNPlusOne {
        id
        count
        total
        stickerId
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

// Save nPlus one
export const SAVE_NPLUSONE = gql`
  mutation saveNPlusOne($nplus: [NPlusOneInput]) {
    saveNPlusOne(nplus: $nplus) {
        statusCode
        data
    }
  }
`;