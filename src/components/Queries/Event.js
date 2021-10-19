import { gql } from "apollo-boost";

// Get event pick one
export const GET_EVENTPICKONE_AND_STICKER_CATEGORY = gql`
  query {
    getEventPickOne {
      id
      name
      description
      imageUrl
      stickerId
      categoryId
      products {
        productId
        stickerUrl
        imageUrl
        name
        price
      }
    }
    getStickers {
      id
      name
      active
      imageUrl
      position
    }
    categories {
      first {
        id
        name
        parentId
      }
      second {
        id
        name
        parentId
      }
      third {
        id
        name
        parentId
      }
    }
  }
`;

// Get event pick one
export const GET_EVENTPICKTWO_AND_STICKER_CATEGORY = gql`
  query {
    getEventPickTwo {
      id
      name
      description
      imageUrl
      stickerId
      categoryId
      products {
        productId
        stickerUrl
        imageUrl
        name
        price
      }
    }
    getStickers {
      id
      name
      active
      imageUrl
      position
    }
    categories {
      first {
        id
        name
        parentId
      }
      second {
        id
        name
        parentId
      }
      third {
        id
        name
        parentId
      }
    }
  }
`;

// Save event pick one
export const SAVE_EVENTPICKONE = gql`
  mutation saveEventPickOne($eventPickOne: [EventPickOneInput]) {
    saveEventPickOne(eventPickOne: $eventPickOne) {
      statusCode
      data
    }
  }
`;

// Save event pick two
export const SAVE_EVENTPICKTWO = gql`
  mutation saveEventPickTwo($eventPickTwo: [EventPickTwoInput]) {
    saveEventPickTwo(eventPickTwo: $eventPickTwo) {
      statusCode
      data
    }
  }
`;

// Upload Image event
export const UPLOAD_IMAGE_EVENT = gql`
  mutation uploadEventPickImage($file: Upload!) {
    uploadEventPickImage(file: $file) {
      statusCode
      data
    }
  }
`;
