import { gql } from "apollo-boost";

// Get sellers
export const GET_SELLERS = gql`
    query getSeller($search: SellerSearchInput!, $page: SellerPageInput!) {
        getSellerList(search: $search, page: $page) {
            totalElements
            list {
                id
                name
                createdDate
                username
                phoneNumber
                brand
                email
                agentCertificate
                bank
                accountNumber
                businessCopy
                passbookCopy
                companyName
            }
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

// CHECK_MAIL
export const CHECK_MAIL = gql`
    query checkEmail($email: String!) {
        checkEmail(email: $email)
    }
`;

// Get product list
export const GET_PRODUCT_HYSTORIES = gql`
    query getSellerProductHistory($productId: String!) {
        getSellerProductHistory(productId: $productId) {
            createdDate
            tradePrice
            price
            updatedDate
            count
        }
    }
`;

// Register seller
export const SAVE_SELLER = gql`
    mutation saveUser($user: UserInput) {
        saveUser(user: $user) {
            statusCode
            data
        }
    }
`;

// Upload seller certificate
export const UPLOAD_CERTIFICATE = gql`
    mutation uploadAgentCertificate($file: Upload!) {
        uploadAgentCertificate(file: $file) {
            statusCode
            data
        }
    }
`;

// Get seller information
export const GET_SELLER = gql`
    query {
        userLogged {
            id
            email
            firstName
            middleName
            lastName
            birthday
            gender
            nation
            city
            state
            address1
            address2
            address3
            postalCode
            phoneNumber
            status
            memberType
            bank
            accountNumber
            agentCertificate
            agreement
            companyName
            businessCopy
            passbookCopy
        }
    }
`;
// Get categories
export const GET_CATEGORIES_FOR_SEARCH = gql`
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

        getStickers {
            id
            name
            active
            imageUrl
            position
        }
    }
`;

// Sales status
export const GET_SOLD_LIST = gql`
    query getProductSoldList($search: SearchInput, $page: PageInput) {
        getProductSoldList(search: $search, page: $page) {
            totalElements
            totalPrice
            list {
                firstName
                lastName
                registerDate
                orderNumber
                productId
                name
                sku
                price
                totalPrice
                count
                reqCount
                shipmentDate
                status
                paymentDate
                requestProductCount
                son {
                    orderNumber
                    productId
                    number
                    count
                    price
                    memo
                }
                paymentStatus
            }
        }
    }
`;

// Sales status
export const GET_SELLER_PRODUCT_HISTORY = gql`
    query getSellerProductHistory(
        $search: SellerProductHistorySearchInput
        $page: SellerPageInput!
    ) {
        getSellerProductHistory(search: $search, page: $page) {
            totalElements
            centerTotal
            insideTotal
            total
            totalPayment
            list {
                id
                createdDate
                sellerName
                brand
                sku
                price
                tradePrice
                status
                centerWarehouse
                insideWarehouse
                paymentDate
                paymentStatus
                description
                paidNumber
            }
        }
    }
`;

// Sales status
export const GET_SELLER_PRODUCT = gql`
    query getSellerProduct($sku: String, $page: PageInput) {
        getSellerProduct(sku: $sku, page: $page) {
            totalElements
            centerTotal
            insideTotal
            total
            list {
                id
                sku
                price
                centerWarehouse
                insideWarehouse
                tradePrice
            }
        }
    }
`;

// update warehouse
export const UPDATE_WAREHOUSE = gql`
    mutation changeWarehouse($dtos: [SellerChangeWarehouseInput]) {
        changeWarehouse(dtos: $dtos) {
            statusCode
            data
        }
    }
`;

// update count
export const UPDATE_COUNT = gql`
    mutation changeCount($dtos: [SellerChangeCountInput]) {
        changeCount(dtos: $dtos) {
            statusCode
            data
        }
    }
`;

// update count
export const UPDATE_HISTORY = gql`
    mutation editHistory($dtos: [SellerEditHistoryInput]) {
        editHistory(dtos: $dtos) {
            statusCode
            data
        }
    }
`;

// update count
export const UPDATE_PAYMENT = gql`
    mutation sellerPayment($dtos: [SellerPaymentInput]) {
        sellerPayment(dtos: $dtos) {
            statusCode
            data
        }
    }
`;

// Seller order notes
export const SELLER_ORDER_NOTES = gql`
    mutation sellerOrderNotes($notes: SellerOrderNotesInput) {
        sellerOrderNotes(notes: $notes) {
            statusCode
            data
        }
    }
`;

// Update payment status
export const UPDATE_PAYMENT_STATUS = gql`
    mutation updatePaymentStatus($products: [PaymentStatusInput]) {
        updatePaymentStatus(products: $products) {
            statusCode
            data
        }
    }
`;

// Save setting
export const SAVE_SETTINGS = gql`
    mutation saveSettings($settings: [SettingsInput]) {
        saveSettings(settings: $settings) {
            statusCode
            data
        }
    }
`;

export const GET_SETTINGS_PREFIX = gql`
    query getSettingsByCodePrefix($codePrefix: String!) {
        getSettingsByCodePrefix(codePrefix: $codePrefix) {
            totalElements
            list {
                code
                value
                description
            }
        }
    }
`;

// UPLOAD_IMAGE_CATEGORY - REMOVE
export const UPLOAD_IMAGE_ICON = gql`
    mutation uploadIconCategory($image: Upload!) {
        uploadIconCategory(image: $image) {
            statusCode
            data
        }
    }
`;

// Premium service
export const GET_PREMIUM_SERVICE = gql`
    query getSellerPremiumServiceList {
        getSellerPremiumServiceList {
            field1
            field2
        }
    }
`;

export const SAVE_PREMIUM_SERVICE = gql`
    mutation saveSellerPremiumService(
        $sellerPolicy: [SellerPolicyPremiumServiceInput!]
    ) {
        saveSellerPremiumService(sellerPolicy: $sellerPolicy) {
            statusCode
            data
        }
    }
`;

// SELLER POLICY
export const SAVE_SELLER_POLICY = gql`
    mutation saveSellerPolicy($sellerPolicy: SellerPolicyInput!) {
        saveSellerPolicy(sellerPolicy: $sellerPolicy) {
            statusCode
            data
        }
    }
`;

export const GET_SELLER_POLICY = gql`
    query getSellerPolicy {
        getSellerPolicy {
            file
            description
            description2
        }
    }
`;

export const UPLOAD_POLICY_DRAFT = gql`
    mutation uploadImagePolicy($image: Upload!) {
        uploadImagePolicy(image: $image)
        statusCode
        data
    }
`;

// DELETE_SELLER
export const DELETE_SELLER = gql`
    mutation deleteUser($ids: [String]!) {
        deleteUser(ids: $ids) {
            statusCode
            data
        }
    }
`;
