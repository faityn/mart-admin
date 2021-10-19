import { gql } from "apollo-boost";

// Get users
export const GET_USERS = gql`
    query getUsers($search: UserSearchInput, $page: PageInput) {
        getUsers(search: $search, page: $page) {
            totalElements
            list {
                id
                lastName
                firstName
                email
                status
                createdDate
                visit
            }
        }
    }
`;

// Get member type
export const GET_USERS_TYPE = gql`
    query {
        getMemberType {
            id
            type
            percent
            duration
            frequency
            price
            cancelDuration
        }
    }
`;

// Get logged user
export const GET_LOGGED_USER = gql`
    query {
        userLogged {
            email
            firstName
            middleName
            lastName
            birthday
            gender
            roleName
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
            companyName
        }
    }
`;

export const SAVE_USER = gql`
    mutation saveUser($user: UserInput) {
        saveUser(user: $user) {
            statusCode
            data
        }
    }
`;

// Save member type
export const SAVE_MEMBER_TYPE = gql`
    mutation saveMemberType($memberType: [MemberTypeInput]) {
        saveMemberType(memberType: $memberType) {
            statusCode
            data
        }
    }
`;
