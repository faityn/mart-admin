import { gql } from "apollo-boost";

// Get qnas
export const GET_QNAS = gql`
  query getQnas($search: QnaSearchInput, $page: PageInput) {
    getQnas(search: $search, page: $page) {
      totalElements
      list {
        id
        category
        title
        question
        status
        username
        createdDate
      }
    }
  }
`;

// SAVE qnas
export const SAVE_QNA = gql`
  mutation saveQna($qna: QnaInput) {
    saveQna(qna: $qna) {
      statusCode
      data
    }
  }
`;

// SAVE qna chat
export const SAVE_QNA_CHAT = gql`
  mutation saveQnaChat($qnaChat: QnaChatInput) {
    saveQnaChat(qnaChat: $qnaChat) {
      statusCode
      data
    }
  }
`;

// GET_USER_QNAS
export const GET_USER_QNAS = gql`
  query {
    getUserQnas {
      id
      category
      title
      question
      status
    }
  }
`;

// GET_USER_QNAS_BY_ID
export const GET_USER_QNAS_BY_ID = gql`
  query getUserQnasById($id: String!) {
    getUserQnasById(id: $id) {
      id
      category
      title
      question
      status
    }
  }
`;

// GET_QNA_CHATS
export const GET_QNA_CHATS = gql`
  query getQnaChats($id: String!) {
    getQnaChats(id: $id) {
      date
      chats {
        writer
        description
        attachUrl
      }
    }
  }
`;

// UPLOAD_QNA_ATTACH
export const UPLOAD_QNA_ATTACH = gql`
  mutation uploadQnaImage($file: Upload!) {
    uploadQnaImage(file: $file){
      statusCode 
      data
    }
  }
`;
