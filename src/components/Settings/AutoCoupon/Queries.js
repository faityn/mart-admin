import { gql } from "apollo-boost";

// Get sellers
export const SAVE_AUTOCOUPON = gql`
  mutation saveAutoCoupon($coupons: [AutoCouponInput]) {
    saveAutoCoupon(coupons: $coupons) {
      statusCode
      data
    }
  }      
`;

// Get sellers
export const GET_AUTOCOUPON = gql`
  query {
    getAutoCoupons {
      status
      name
      couponId
    }
  } 
`;