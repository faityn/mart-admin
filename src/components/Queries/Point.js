import { gql } from 'apollo-boost';

// Get point
export const GET_POINT = gql`
  query {
    point {
      id
      status
      name
      signup
      taken
      given
      spend
      photoReview
      textReview
    }
  }
`;

// Save point
export const SAVE_POINT = gql`
  mutation savePoint($point: PointInput) {
    savePoint(point: $point) {
      statusCode
      data
    }
  }
`;