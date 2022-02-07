import { gql } from "apollo-boost";

export const MARKET_INFO = gql`
query marketInfo ($id: Long!) {
    marketInfo (id: $id) {
        id
        name
        ceoName
        companyPhone
        businessNumber
        address1
        address2
        address3
        postalCode
        status
        openHour
        closeHour
        deliveryFee
        deliveryFreePrice
    }
}
`;

export const GET_USER = gql`
query getUser ($id: String!) {
    getUser (id: $id) {
        userId
        username
        email
        phoneNumber
        allowMarketingMail
        
    }
  }
`;

export const UPDATE_MARKET = gql`
  mutation updateMarket($update: MarketUpdate!,$businessCertificate:Upload) {
    updateMarket(update: $update,businessCertificate:$businessCertificate) {
        statusCode
        message
        data
    }
  }
`;

export const UPLOAD_CERTIFICATE = gql`
  mutation uploadAgentCertificate($file: Upload!) {
    uploadAgentCertificate(file: $file) {
      statusCode
      data
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation uploadImageProduct($image: Upload!) {
    uploadImageProduct(image: $image) {
      statusCode
      data
    }
  }
`;

// Upload file
export const UPLOAD_FILE = gql`
  mutation marketUpload ($businessCertificate: Upload) {
    marketUpload (businessCertificate: $businessCertificate) {
        statusCode
        message
        data
    }
  }
`;
