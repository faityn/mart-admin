import { gql } from 'apollo-boost';

// Get aboutus
export const GET_AFFILIATE_LIST = gql`
query getAffiliate($search: AffiliateSearchInput!, $page: PageInput) {
  getAffiliateList(search: $search, page: $page) {
    totalElements
    list {
      id
      userId
      affiliateName
      name
      email
      paypalAccount
      createdDate
    }
  }
}
`;

// Save affiliate plicy
export const SAVE_AFFILIATE_POLICY = gql`
  mutation saveAffiliatePolicy($affiliatePolicy: AffiliatePolicyInput!) {
    saveAffiliatePolicy(affiliatePolicy: $affiliatePolicy) {
      statusCode
      data
    }
  }
`;


// Save affiliate
export const SAVE_AFFILIATE = gql`
  mutation saveAffiliate($affiliate: AffiliateInput!) {
    saveAffiliate(affiliate: $affiliate) {
      statusCode
      data
    }
  }
`;


// Get term
export const GET_AFFILIATE_TERM = gql`
  query {
    getAffiliateTerm {
      text
    }
  }
`;

// Save term
export const SAVE_AFFILIATE_TERM = gql`
  mutation saveAffiliateTerm($termInput: TermInput) {
    saveAffiliateTerm(termInput: $termInput) {
      statusCode
      data
    }
  }
`;

// Get FAQ
export const GET_AFFILIATE_FAQ = gql`
  query {
    getAffiliateFaqs {
      totalElements
      list {
        id
        title
        description
      }
    }
  }
`;

export const SAVE_AFFILIATE_FAQ = gql`
  mutation saveAffiliateFaq($faq: FaqInput) {
    saveAffiliateFaq(faq: $faq) {
      statusCode
      data
    }
  }
`;

export const DELETE_AFFILIATE_FAQ = gql`
  mutation deleteAffiliateFaq($id: String!) {
    deleteAffiliateFaq(id: $id) {
      statusCode
      data
    }
  }
`;

export const GET_AFFILIATE_PAYMENT_LIST = gql`
  query getAffiliatePaymentList($search: AffiliatePaymentSearchInput, $page: PageInput) {
    getAffiliatePaymentList(search: $search, page: $page) {
      totalElements
	    list {
        id
        affiliateId
        amount
        processedDate
        createdDate
        type
        status
        affiliateName
        paypalAccount
        email
        balance
      }
    }
  }
`;

export const DECIDE_AFFILIATE_PAYMENT_REQUEST = gql`
  mutation decideAffiliatePaymentAdmin($affiliatePayment: AffiliatePaymentInput!) {
    decideAffiliatePaymentAdmin(affiliatePayment: $affiliatePayment) {
      statusCode
      data
    }
  }
`;

// Get aboutus
export const GET_AFFILIATE_PRODUCTS = gql`
query getAffiliate($search: AffiliateSearchInput!, $page: PageInput) {
  getAffiliateProductList(search: $search, page: $page) {
    totalElements
	  list {
      id
      affiliateId
      affiliateName
      sku
      productId
      clicks
      orders
      orderedRevenue
      itemName
      link
    }
  }
}
`;

export const GET_AFFILIATE_POLICY_LIST = gql`
  query getAffiliatePolicyList($page: PageInput) {
    getAffiliatePolicyList(page: $page) {
      totalElements
	    list {
        category1
        category2
        category3
        percentage
      }
    }
  }
`;