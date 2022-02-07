import { types } from "./Types";

/**
 * @summary Set apollo client
 * @param {Object} client
 * @returns {Object}
 */

 export const getUserInfo = (apolloClient) => ({
    type: types.SET_APOLLO_CLIENT,
    apolloClient: apolloClient,
});

export const setApolloClient = (apolloClient) => ({
    type: types.SET_APOLLO_CLIENT,
    apolloClient: apolloClient,
});

/**
 * @summary Set logged user
 * @param {Object} loggedUser
 * @returns {Object}
 */
export const setLoggedUser = (loggedUser) => ({
    type: types.SET_LOGGED_USER,
    loggedUser: loggedUser,
});

/**
 * @summary Set token
 * @param {Object} token
 * @returns {Object}
 */
export const setToken = (token) => ({
    type: types.SET_TOKEN,
    token: token,
});

/**
 * @summary Set printData
 * @param {[]} printData
 * @returns []
 */

export const setOrdersPrint = (printData) => ({
    type: types.SET_ORDERS_PRINT,
    printData: printData,
});

export const setSelectedProduct = ({ product }) => ({
    type: types.SET_SELECTED_PRODUCT,
    product: product,
});

export const setNotSelectedProduct = ({ id }) => ({
    type: types.SET_NOT_SELECTED_PRODUCT,
    id: id,
});

export const setClearSelectedProduct = () => ({
    type: types.SET_CLEAR_SELECTED_PRODUCT,
});
