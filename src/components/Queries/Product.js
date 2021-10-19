import { gql } from "apollo-boost";

// Get products
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
                imageUrl
                inventory
                price
                sku
                registerDate
                brand
                isDisplay
            }
        }
    }
`;

// Get options
export const GET_OPTIONS = gql`
    query getOptions($page: PageInput) {
        getOptions(page: $page) {
            totalElements
            list {
                id
                productId
                productName
                name
            }
        }
    }
`;

// Save product
export const SAVE_PRODUCT = gql`
    mutation saveProduct($product: ProductInput) {
        saveProduct(product: $product) {
            statusCode
            data
        }
    }
`;

// Get product
export const PRODUCT = gql`
    query product($id: String, $affiliateLink: String) {
        product(id: $id, affiliateLink: $affiliateLink) {
            info {
                firstCategory
                secondCategory
                thirdCategory
                name
                sku
                price
                inventory
                width
                length
                height
                weight
                actualWeight
                description
                shortDescription
                manufacturer
                releaseDate
                brand
                ean
                isAutomaticDate
                registerDate
                isHideName
                isDisplay
                status
            }
            images {
                imageUrl
            }
            attachments {
                fileUrl
            }
            externalLinks {
                name
                url
            }
            stickers {
                name
                color
                position
                imageUrl
            }
            productPremiumServices {
                field1
            }
        }
    }
`;

// Premium service
export const GET_PREMIUM_SERVICE = gql`
    query getSellerPremiumServiceList {
        getSellerPremiumServiceList {
            field1
        }
    }
`;
