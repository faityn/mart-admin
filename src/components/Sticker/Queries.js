import { gql } from 'apollo-boost';

// GET_STICKERS
export const GET_STICKERS = gql`
  query {
    getStickers {
      id
      name
      active
      imageUrl
      position
      startDate
      endDate
      priority
    }
  }
`;

// SAVE_STICKER
export const SAVE_STICKER = gql`
  mutation saveSticker($sticker: StickerInput) {
    saveSticker(sticker: $sticker) {
      statusCode
      data
    }
  }
`;

// UPDATE_IMAGE_STICKER
export const UPDATE_IMAGE_STICKER = gql`
  mutation updateStickerImage($stickerImage: StickerImageInput) {
    updateStickerImage(stickerImage: $stickerImage) {
        statusCode
        data
    }
  }
`;

// SAVE_STICKER
export const SAVE_PRODUCT_STICKER = gql`
  mutation saveProductSticker($productSticker: ProductStickerInput) {
    saveProductSticker(productSticker: $productSticker) {
      statusCode
      data
    }
  }
`;

// STICKER
export const STICKER = gql`
  query sticker($id: String!) {
    sticker(id: $id) {
      id
      name
      position
      imageUrl
      active
      color
      startDate
      endDate
      priority
      products {
        id
        name
      }
    }
  }
`;

// DELETE_PRODUCT
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id)
  }
`;

// Subscribe product
export const SUBSCRIPTION_PRODUCT = gql`
  subscription($id: String) {
    onProductUpdate(id: $id) {
        id
    }
  }
`;

// Upload File
export const UPLOAD_IMAGE = gql`
  mutation uploadImageSticker($image: Upload!) {
    uploadImageSticker(image: $image) {
      statusCode
      data
    }
  }
`;

// Get product list
export const GET_PRODUCTS = gql`
query getProducts($search: SearchInput, $page: PageInput) {
  getProducts(search: $search, page: $page) {
    totalElements
    list {
      id
      firstCategory
      secondCategory
      thirdCategory
      name
      nameEng
      imageUrl
      inventory
      price
      weight
      sku
      registerDate
      brand
      isDisplay
      status
      reqCount
      shipmentDate
      reason
      request {
        createdDate
        price
        tradePrice
        count
        shipmentDate
      }
    }
  }
}
`;