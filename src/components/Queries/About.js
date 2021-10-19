import { gql } from 'apollo-boost';

// Get aboutus
export const GET_ABOUTUS = gql`
  query about($id: String!) {
    about(id: $id) {
      id
      description
      youtubeUrl
      aboutFiles {
        fileUrl
        url
        description
        fileOrder
      }
    }
  }
`;

// Save aboutus
export const SAVE_ABOUTUS = gql`
  mutation saveAbout($about: AboutInput) {
    saveAbout(about: $about) {
        statusCode
        data
    }
  }
`;

// Save upload photo
export const UPLOAD_IMAGE_ABOUTUS = gql`
  mutation uploadFileAboutUs($file: Upload!) {
    uploadFileAboutUs(file: $file) {
      statusCode
      data
    }
  }
`;