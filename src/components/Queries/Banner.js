import { gql } from 'apollo-boost';

// Get banners
export const GET_BANNERS = gql`
  query getBanner ($type: String!) {
    getBanner (type: $type) {
      id
      imageUrl
      url
      type
    }
  }
`;

// Save banners
export const SAVE_BANNER = gql`
  mutation saveBanner($banner: [BannerInput]) {
    saveBanner(banner: $banner) {
      statusCode
      data
    }
  }
`;

// Upload image
export const UPLOAD_IMAGE_BANNER = gql`
  mutation uploadImageBanner($image: Upload!) {
    uploadImageBanner(image: $image) {
      statusCode
      data
    }
  }
`;