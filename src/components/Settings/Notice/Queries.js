import { gql } from "apollo-boost";

// Get notices
export const GET_NOTICES = gql`
  query getNotices($search: NoticeSearchInput, $page: PageInput) {
    getNotices(search: $search, page: $page) {
      totalElements
      list {
        id
        type
        title
        status
        description
        createdDate
      }
    }
  }
`;

// Get notice
export const GET_NOTICE = gql`
  query notice($id: String!) {
    notice(id: $id) {
      id
      type
      title
      status
      description
      createdDate
      email
    }
  }
`;

// Save notice
export const SAVE_NOTICE = gql`
  mutation saveNotice($notice: NoticeInput) {
    saveNotice(notice: $notice) {
      statusCode
      data
    }
  }
`;

// Delete notice
export const DELETE_NOTICES = gql`
  mutation deleteNotice($ids: [String]) {
    deleteNotice(ids: $ids) {
      statusCode
      data
    }
  }
`;

// Toggle notice
export const TOGGLE_NOTICES = gql`
  mutation toggleNotice($ids: [String], $status: String!) {
    toggleNotice(ids: $ids, status: $status) {
      statusCode
      data
    }
  }
`;

// Q&A

// Qna reception status check
export const CHECK_QNA_RECEPTION_STATUS = gql`
  query {
    checkQnaPowerStatus
  }
`;

// Qna reception status update
export const UPDATE_QNA_RECEPTION_STATUS = gql`
  mutation updateQnaPowerStatus($powerStatus: Boolean) {
    updateQnaPowerStatus(powerStatus: $powerStatus) {
      statusCode
      data
    }
  }
`;

// Get qna onlys
export const GET_QNA_ONLYS = gql`
  query getQnaOnlys($search: QnaOnlySearchInput, $page: PageInput) {
    getQnaOnlys(search: $search, page: $page) {
      totalElements
      list {
        id
        mailTo
        title
        question
        createdDate
        answerYn
        status
      }
    }
  }
`;


// Get qna only all
export const GET_QNA_ONLY_ALL = gql`
  query getQnaOnlyList($page: PageInput) {
    getQnaOnlyList(page: $page) {
        id
        title
        question
        mailTo
        status
        answerYn
        createdDate
    }
  }
`;

// Get qna only
export const GET_QNA_ONLY = gql`
  query getQnaOnly($id: String!) {
    getQnaOnly(id: $id) {
      id
      mailTo
      title
      question
      createdDate
      answerYn
      status
    }
  }
`;

// Qna reception update answer status
export const UPDATE_QNA_ANSWER_STATUS = gql`
  mutation updateQnaOnlyAnswer($ids: [String], $answerYn: Boolean) {
    updateQnaOnlyAnswer(ids: $ids, answerYn: $answerYn) {
      statusCode
      data
    }
  }
`;

// FAQ

// Get faq categories
export const GET_FAQ_CATEGORIES = gql`
  query {
    getFaqCategories {
      text
      value
    }
  }
`;

// Ipdate faq categories
export const UPDATE_FAQ_CATEGORIES = gql`
  mutation updateFaqCategories($faqCategories: [FaqCategoryInput]) {
    updateFaqCategories(faqCategories: $faqCategories) {
      statusCode
      data
    }
  }
`;

// Get faqs
export const GET_FAQS = gql`
  query getFaqs($search: FaqSearchInput, $page: PageInput) {
    getFaqs(search: $search, page: $page) {
      totalElements
      list {
        id
        title
        description
        createdDate
        category
        categoryText
      }
    }
  }
`;

// Get faq
export const GET_FAQ = gql`
  query faq($id: String!) {
    faq(id: $id) {
      id
      title
      description
      category
      createdDate
    }
  }
`;

// Save faq
export const SAVE_FAQ = gql`
  mutation saveFaq($faq: FaqInput) {
    saveFaq(faq: $faq) {
      statusCode
      data
    }
  }
`;
