import { gql } from 'apollo-boost';

// Get exhibitions
export const GET_EXHIBITIONS = gql`
  query getExhibitions($search: ExhibitionSearchInput, $page: PageInput){
    getExhibitions(search: $search, page: $page) {
      totalElements,
      list {
        id
        title
        description
        active
        startDate
        endDate
        type
        imageUrl
      }
    }
  }
`;

// Get exhibition by one
export const GET_EXHIBITION = gql`
  query exhibition($id: String!) {
    exhibition(id: $id) {
      id
      title
      description
      imageUrl
      active
      startDate
      endDate
      type
      products {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

// Save exhibition
export const SAVE_EXHIBITION = gql`
  mutation saveExhibition($exhibition: ExhibitionInput) {
    saveExhibition(exhibition: $exhibition) {
      statusCode
      data
    }
  }
`;

// Upload Image exhibition
export const UPLOAD_IMAGE_EXHIBITION = gql`
  mutation uploadImageExhibition($image: Upload!) {
    uploadImageExhibition(image: $image) {
      statusCode
      data
    }
  }
`;

// Delete exhibition
export const DELETE_EXHIBITIONS = gql`
  mutation deleteExhibition($ids: [String]) {
    deleteExhibition(ids: $ids) {
      statusCode
      data
    }
  }
`;