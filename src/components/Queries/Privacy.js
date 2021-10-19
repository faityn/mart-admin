import { gql } from 'apollo-boost';

// Get privacy
export const GET_PRIVACY = gql`
  query {
    getPrivacy {
      text
    }
  }
`;

// Save privacy
export const SAVE_PRIVACY = gql`
  mutation savePrivacy($privacyInput: PrivacyInput) {
    savePrivacy(privacyInput: $privacyInput) {
      statusCode
      data
    }
  }
`;