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

export const GET_PAGE_VISIT_ANALYSIS = gql`
    query getPageVisitAnalysis($search: StatisticsPageVisitAnalysisInput!) {
        getPageVisitAnalysis(search: $search) {
            list {
                timeframe
                visits
                dickey
                country
            }
            list2 {
                country
                average
                timeframe
                visits
                dickey
            }
            list3 {
                country
                average
            }
        }
    }
`;