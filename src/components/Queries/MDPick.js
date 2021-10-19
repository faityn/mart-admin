import { gql } from 'apollo-boost';

// Get coupons
export const GET_MDPICK = gql`
  query {
    getMdPick {
      id
      stickerId
      products {
        productId
        name
        idx
      }
    }
  }
`;

// Save mdpick
export const SAVE_MDPICK = gql`
  mutation saveMDPick($mdPick: MDPickInput) {
    saveMDPick(mdPick: $mdPick) {
      statusCode
      data
    }
  }
`;