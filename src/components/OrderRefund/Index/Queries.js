import { gql } from "apollo-boost";

// Get order refunds
export const GET_ORDER_REFUNDS = gql`
  query getOrdersRefund($search: OrderRefundSearchInput, $page: PageInput) {
    getOrdersRefund(search: $search, page: $page) {
      totalElements
      totalPaymentAmount
      list {
        id
        orderDate
        cancelDate
        username
        orderNumber
        refundNumber
        quantity
        cancellationAmount
        type
        status
        orderAmount
      }
    }
  }
`;

// Set order refund status
export const SET_ORDER_REFUND_STATUS = gql`
  mutation orderRefundStatus($orderNumbers: [String]) {
    orderRefundStatus(orderNumbers: $orderNumbers) {
      statusCode
      data
    }
  }
`;

// Set order refund amount
export const SET_ORDER_REFUND_AMOUNT = gql`
  mutation orderRefundAmount($refundAmounts: [OrderRefundAmountInput]) {
    orderRefundAmount(refundAmounts: $refundAmounts) {
      statusCode
      data
    }
  }
`;
