import { gql } from 'apollo-boost';

// Get sellers
export const GET_SELLERS = gql`
  query getSeller($search: SellerSearchInput!, $page: SellerPageInput!) {
    getSellerList(search: $search, page: $page) {
      totalElements
      list {
        id
        sellerId
        userId
        contact
        brand
        email
        paypalAccount
        joinedDate
      }
    }
  }
`;

// Get sellers
export const GET_SELLER_POLICY = gql`
  query getSellerPolicy($sellerId: String!) {
    getSellerPolicyBySellerId(sellerId: $sellerId) {
      id
      sellerId
      category1
      category2
      category3
      percentage
      contract
      productFileGuideline
      premiumService {
        id
        field1
        field2
      }
    }
  }
`;

// SAVE sellers
export const SAVE_SELLER_POLICY = gql`
  mutation saveSellerPolicy($sellerPolicy: SellerPolicyInput!) {
    saveSellerPolicy(sellerPolicy: $sellerPolicy) {
      statusCode
      data
    }
  }
`;