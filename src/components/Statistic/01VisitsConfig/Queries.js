import { gql } from 'apollo-boost';

export const GET_DATA = gql`
    query getDictionaryByType($search: DictionarySearchInput!) {
        getObservablePage {
            totalElements
            list {
                id
                dictionaryId
                dickey
                dicvalue
                name
                enabled
            }
        }
        getDictionaryByType(search: $search) {
            totalElements
            list {
                id
                dickey
                dicvalue
            }
        }
    }
`;

export const GET_OBSERVABLE_PAGE = gql`
    query {
        getObservablePage {
            totalElements
            list {
                id
                dictionaryId
                dickey
                dicvalue
                name
                enabled
            }
        }
    }
`;

export const GET_DICTIONARY = gql`
    query getDictionaryByType($search: DictionarySearchInput!) {
        getDictionaryByType(search: $search) {
            totalElements
            list {
                id
                dickey
                dicvalue
            }
        }
    }
`;

export const SAVE_OBSERVABLE_PAGE = gql`
    mutation saveObservablePage($observablePage: StatisticsObservablePageInput!) {
        saveObservablePage(observablePage: $observablePage) {
            statusCode
            data
        }
    }
`;

