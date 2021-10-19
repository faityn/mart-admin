import { gql } from 'apollo-boost';

// Get term
export const GET_TERM = gql`
  query {
    getTerm {
      text
    }
  }
`;

// Save term
export const SAVE_TERM = gql`
  mutation saveTerm($termInput: TermInput) {
    saveTerm(termInput: $termInput) {
      statusCode
      data
    }
  }
`;