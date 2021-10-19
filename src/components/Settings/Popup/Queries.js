import { gql } from "apollo-boost";

// Get popups
export const GET_POPUPS = gql`
  query getPopups($search: PopupSearchInput, $page: PageInput){
    getPopups(search: $search, page: $page) {
      totalElements,
      list {
        id
        name
        imageUrl
        url
        startDate
        endDate
        active
      }
    }
  }
`;

// Get popup
export const GET_POPUP = gql`
  query getPopup($id: String!){
    getPopup(id: $id) {
      id
      name
      imageUrl
      url
      startDate
      endDate
      active
    }
  }
`;

// Save popup
export const SAVE_POPUP = gql`
  mutation savePopup($popup: PopupInput) {
    savePopup(popup: $popup) {
      statusCode
      data
    }
  }
`;

// Upload Image
export const UPLOAD_POPUP = gql`
  mutation uploadImagePopup($image: Upload!) {
    uploadImagePopup(image: $image) {
      statusCode
      data
    }
  }
`;

// DELETE POPUP
export const DELETE_POPUP = gql`
  mutation deletePopup($id: String!) {
    deletePopup(id: $id) {
      statusCode
      data
    }
  }
`;