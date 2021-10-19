import { gql } from 'apollo-boost';



export const GET_USER_REG = gql`
    query getUserDailyRegistAgeAndSex($search: UserStatisticSearchInput) {
        getUserDailyRegistAgeAndSex(search: $search) {
            registDate
            registCount
            femaleCount
            maleCount
            unknownSexCount
            teenAgerCount
            twentyAprxCount
            thirtyAprxCount
            fortyAprxCount
            fiftyAprxCount
            sixtyAboveCount
        }
    }
`;



export const GET_SALE_COUNT_NATION = gql`
    query {
        getNationsBySaleCount {
            nation
            count
        }
    }
`;

