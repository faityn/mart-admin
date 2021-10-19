import { gql } from 'apollo-boost';

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