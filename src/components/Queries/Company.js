import { gql } from 'apollo-boost';

// Get company
export const GET_COMPANY = gql`
  query getCompany( $search: CompanySearchInput!, $page: CompanyPageInput!) {
    getCompanies(search: $search, page: $page) {
      totalElements
      list {
        id
        registrationNumber
        name
        representativeName
        postalCode
        zipCode
        detailedAddress
        businessType
        event
        instagramLink
        instagramLinkIsHidden
        facebookLink
        facebookLinkIsHidden
        twitterLink
        twitterLinkIsHidden
        youtubeLink
        youtubeLinkIsHidden
      }
    }
  }
`;

// Save company
export const SAVE_COMPANY = gql`
  mutation saveCompany($company: CompanyInput!) {
    saveCompany(company: $company) {
      statusCode
      data
    }
  }
`;

// Delete company
export const DELETE_COMPANY = gql`
  mutation deleteCompany($id: String!) {
    deleteCompany(id: $id) {
      statusCode
      data
    }
  }
`;