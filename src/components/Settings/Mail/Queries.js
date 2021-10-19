import { gql } from 'apollo-boost';


export const GET_MAIL_CONF = gql`
    query getMailConf($id: String!) {
        getMailConf(id: $id) {
            id
            registerUseYn
            registerMailId
            levelUseYn
            levelMailId
            notifyUseYn
            notifyMailId
            dormantUseYn
            dormantMailId
            purchaseUseYn
            purchaseMailId
            shipmentUseYn
            shipmentMailId
            withdrawUseYn
            withdrawMailId
            createdDate
        }
    }
`;

export const GET_MAIL_REQS = gql`
    query getMailReqs($search: MailReqSearchInput, $page: PageInput){
        getMailReqs(search: $search, page: $page) {
            totalElements,
            list {
                id
                mailType
                mailTitle
                mailEmail
                mailDescription
                createdDate
            }
        }
    }
`;

export const GET_MAIL_REQ = gql`
    query mailreq($id: String!) {
        mailreq(id: $id) {
            id
            mailType
            mailTitle
            mailEmail
            mailDescription
            createdDate
        }
    }
`;


export const GET_MAIL_REQ_BY_TYPE = gql`
    query getMailReqByMailType($mailType: String!, $mailEmail: String!, $startDate: String!, $endDate: String! ) {
        getMailReqByMailType(mailType: $mailType, mailEmail: $mailEmail, startDate: $startDate, endDate: $endDate) {
            id
            mailType
            mailTitle
            mailEmail
            mailDescription
            createdDate
        }
    }
`;
export const GET_MAIL_MARKETS = gql`
    query getMailMarkets($search: MailMarketSearchInput, $page: PageInput){
        getMailMarkets(search: $search, page: $page) {
            totalElements,
            list {
                id
                marketTitle
                marketTemplate
                marketEmail
                marketDescription
                createdDate
            }
        }
    }
`;


export const GET_MAIL_MARKET_REQS = gql`
    query getMailMarketReqs($search: MailMarketSearchInput, $page: PageInput){
        getMailMarketReqs(search: $search, page: $page) {
            totalElements,
            list {
                id
                recipientType
                sender
                receiver
                mailType
                mailMarketId
                marketTitle
                marketDescription
                createdDate
            }
        }
    }
`;


export const SAVE_MAIL_REQ = gql`
    mutation saveMailReq($mailreq: MailReqInput) {
        saveMailReq(mailreq: $mailreq) {
            statusCode
            data
        }
    }
`;
export const SAVE_MAREKT_MAIL = gql`
    mutation saveMailMarket($mailmarket: MailMarketInput) {
        saveMailMarket(mailmarket: $mailmarket) {
            statusCode
            data
        }
    }
`;

export const SAVE_MARKET_MAIL_REQ = gql`
    mutation saveMailMarketReq($mailmarketreq: MailMarketReqInput) {
        saveMailMarketReq(mailmarketreq: $mailmarketreq) {
            statusCode
            data
        }
    }
`;

export const SAVE_MAIL_CONFIG = gql`
    mutation saveMailConf($mailconf: MailConfInput) {
        saveMailConf(mailconf: $mailconf) {
            statusCode
            data
        }
    }
`;


export const DELETE_MAIL_REQ = gql`
    mutation deleteMailReq($id: String!) {
        deleteMailReq(id: $id) {
            statusCode
            data
        }
    }
`;


export const DELETE_MARKET_MAIL = gql`
    mutation deleteMailMarket($id: String!) {
        deleteMailMarket(id: $id) {
            statusCode
            data
        }
    }
`;


export const GET_ROLES = gql`
    query {
        getRoles {
            name
            description
        }
    }
`;
