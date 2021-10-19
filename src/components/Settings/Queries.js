import { gql } from 'apollo-boost';

// GET_USERS
export const GET_USERS = gql`
  query getUsers($search: UserSearchInput, $page: PageInput){
    getUsers(search: $search, page: $page) {
      totalElements,
      list {
        id
        lastName
        firstName
        email
        status
        createdDate
        visit
      }
    }
  }
`;