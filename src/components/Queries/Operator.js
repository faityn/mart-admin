import { gql } from 'apollo-boost';

// Get operator
export const GET_OPERATORS = gql`
  query getOperator($search: OperatorSearchInput!, $page: OperatorPageInput!) {
    getOperators(search: $search, page: $page) {
      totalElements
      list {
        id
        operatorId
        password
        firstname
        realname
        email
        contact
        allowLogin
        personalInformationManager
        remark
        menuAccess {
          id
          menuId
          menuName
          hasAccess
        }
      }
    }
  }
`;

// Get operator
export const GET_OPERATOR = gql`
  query getOperator($id: String!) {
    getOperatorById(id: $id) {
      id
      operatorId
      password
      firstname
      realname
      email
      contact
      allowLogin
      personalInformationManager
      remark
      menuAccess {
        id
        menuId
        menuName
        hasAccess
      }
    },
  }
`;

// Save operator
export const SAVE_OPERATOR = gql`
  mutation saveOperator($operator: OperatorInput!) {
    saveOperator(operator: $operator) {
      statusCode
      data
    }
  }
`;

// Delete operator
export const DELETE_OPERATOR = gql`
  mutation deleteOperator($id: String!) {
    deleteOperator(id: $id) {
      statusCode
      data
    }
  }
`;