import { gql } from 'apollo-boost';


export const GET_DAILY_SALES_COUNT = gql`
    query getDailySalesCount($search: SaleStatisticSearchInput) {
        getDailySalesCount(search: $search) {
            registerDate
            count
            firstCategory
            secondCategory
            thirdCategory
        }
    }
`;
export const GET_DAILY_SALES_PRICE = gql`
    query getDailySalesPrice($search: SaleStatisticSearchInput) {
        getDailySalesPrice(search: $search) {
            registerDate
            price
            firstCategory
            secondCategory
            thirdCategory
        }
    }
`;


export const GET_MONTHLY_SALES_COUNT = gql`
    query getMonthlySalesCount($search: SaleStatisticSearchInput) {
        getMonthlySalesCount(search: $search) {
            registerDate
            count
            firstCategory
            secondCategory
            thirdCategory
        }
    }
`;

export const GET_MONTHLY_SALES_PRICE = gql`
    query getMonthlySalesPrice($search: SaleStatisticSearchInput) {
        getMonthlySalesPrice(search: $search) {
            registerDate
            price
            firstCategory
            secondCategory
            thirdCategory
        }
    }
`;


export const GET_NATIONS_BY_SALES_COUNT = gql`
    query {
        getNationsBySaleCount {
            nation
            count
        }
    }
`;



export const GET_NATIONS_BY_SALES_PRICE = gql`
    query {
        getNationsBySalePrice {
            nation
            price
        }
    }
`;




export const GET_SALE_PRODUCTS = gql`
    query getProductsForStatistics($search: SaleStatisticSearchInput, $page: PageInput){
        getProductsForStatistics(search: $search, page: $page) {
            totalElements,
            list {
                id
                firstCategory
                secondCategory
                thirdCategory
                name
                sku
                price
                inventory
                weight
                shortDescription
                imageUrl
                isDisplay
                brand
                registerDate
                registerUser
            }
        }
    }
`;



export const GET_SALE_PRODUCT_BY_CODE = gql`
    query getSaleProductByCode($search: SaleStatisticSearchInput, $page: PageInput){
        getSaleProductByCode(search: $search, page: $page) {
            totalElements,
            list {
                name
                saleDate
                count
                price
                salePrice
            }
        }
    }
`;



export const GET_SALE_PRODUCT_DAILY = gql`
    query getSaleProductDaily($search: SaleStatisticSearchInput) {
        getSaleProductDaily(search: $search) {
            name
            sku
            saleDate
            count
            price
            salePrice
        }
    }
`;

export const GET_SALE_PRODUCT_MONTHLY = gql`
    query getSaleProductMonthly($search: SaleStatisticSearchInput) {
        getSaleProductMonthly(search: $search) {
            name
            sku
            saleDate
            count
            price
            salePrice
        }
    }
`;



export const GET_PRODUCT_VIEW = gql`
    query getProductAllViewCount($search: ProductStatisticSearchInput, $page: PageInput){
        getProductAllViewCount(search: $search, page: $page) {
            totalElements,
            list {
                saleDate
                viewCount
                wishCount
                cartCount
            }
        }
    }
`;


export const GET_PRODUCT_VIEW_COUNT = gql`
    query getProductViewTotalCount($search: ProductStatisticSearchInput) {
        getProductViewTotalCount(search: $search) {
            saleDate
            viewCount
            wishCount
            cartCount
        }
    }
`;

// Get categories
export const GET_CATEGORIES = gql`
  query getCategories {
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
