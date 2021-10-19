import { gql } from "apollo-boost";

// GET_USERS
export const GET_USERS = gql`
  query getUsers($search: UserSearchInput, $page: PageInput) {
    getUsers(search: $search, page: $page) {
      totalElements
      list {
        id
        lastName
        firstName
        email
        status
        createdDate
        visit
        note
        type
      }
    }
  }
`;

// SAVE_USER
export const SAVE_USER = gql`
  mutation saveUser($user: UserInput) {
    saveUser(user: $user) {
      statusCode
      data
    }
  }
`;

// CHECK_MAIL
export const CHECK_MAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email)
  }
`;

// FIND_USER
export const FIND_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      email
      lastName
      middleName
      firstName
      birthday
      gender
      nation
      city
      state
      address1
      address2
      address3
      postalCode
      phoneNumber
      status
      roleName
      note  
    }
  }
`;

// TOGGLE_USER
export const TOGGLE_USER = gql`
  mutation toggleUser($id: String!) {
    toggleUser(id: $id) {
      email
    }
  }
`;

// DELETE_PRODUCT
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id)
  }
`;

// GET LEAVE MEMBERS
export const GET_LEAVE_USERS = gql`
  query getWithdrawalUsers($search: UserSearchInput, $page: PageInput) {
    getWithdrawalUsers(search: $search, page: $page) {
      totalElements
      list {
        id
        email
        username
        nation
        gender
        withdrawalDate
      }
    }
  }
`;

// DELETE_USER
export const DELETE_USER = gql`
  mutation deleteUser($ids: [String]!) {
    deleteUser(ids: $ids) {
      statusCode
      data
    }
  }
`;
