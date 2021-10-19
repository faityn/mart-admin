import { gql } from "apollo-boost";

// Get coupons
export const GET_COUPONS = gql`
  query getCoupons($search: CouponSearchInput, $page: PageInput) {
    getCoupons(search: $search, page: $page) {
      totalElements
      list {
        id
        code
        name
        category
        discountType
        discount
        startDate
        endDate
        count
      }
    }
  }
`;

// Save coupon
export const SAVE_COUPON = gql`
  mutation saveCoupon($coupon: CouponInput) {
    saveCoupon(coupon: $coupon) {
      statusCode
      data
    }
  }
`;

// Get coupons
export const GET_COUPON = gql`
  query coupon($id: String!) {
    coupon(id: $id) {
      id
      code
      categoryId
      name
      age
      discountType
      discount
      startDate
      endDate
      count
      moreThanType
      moreThan
      description
      gender
      isUse
      productId
      productName
      purchaseProductId
      purchaseProductName
      status
      userId
      userName
      userType
      enableProduct
      enablePurchaseProduct
      enableUser
      limitation
    }
  }
`;
