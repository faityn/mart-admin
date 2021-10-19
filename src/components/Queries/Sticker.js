import { gql } from 'apollo-boost';

// Get coupons
export const GET_STICKERS = gql`
  query {
    getStickers {
      id
      name
      active
      imageUrl
      position
    }
  }
`;