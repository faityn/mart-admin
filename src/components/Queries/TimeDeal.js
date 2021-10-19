import { gql } from 'apollo-boost';

// Get time deal
export const GET_TIMEDEAL = gql`
  query {
    getTimeDeal {
      id
      discountType
      discount
      startDate
      endDate
      stickerId
      products {
        productId
        name
      }
    }
  }
`;

// Save time deal
export const SAVE_TIMEDEAL = gql`
  mutation saveTimeDeal($timeDeal: TimeDealInput) {
    saveTimeDeal(timeDeal: $timeDeal) {
      statusCode
      data
    }
  }
`;