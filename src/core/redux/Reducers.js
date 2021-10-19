import { types } from "./Types";

/**
 * Initial state for root reducer
 */
const initialState = {
    apolloClient: null,
    loggedUser: null,
    token: {},
    printSheets: [],
    selectedProducts: [],
};

/**
 * @summary Root reducer
 * @param {Object} state
 * @param {Object} action
 */
function rootReducer(state = initialState, action) {
    switch (action.type) {
        // Access token
        case types.SET_APOLLO_CLIENT:
            return {
                ...state,
                apolloClient: action.apolloClient,
            };

        // User
        case types.SET_LOGGED_USER:
            return {
                ...state,
                loggedUser: action.loggedUser,
            };

        // Set token
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };

        // Set OrdersPrint
        case types.SET_ORDERS_PRINT:
            return {
                ...state,
                printSheets: action.printData,
            };

        // Set SelectedProduct
        case types.SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, action.product],
            };
        // Set NotSelectedProduct
        case types.SET_NOT_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProducts: state.selectedProducts.filter(
                    (product) => product.id !== action.id
                ),
            };
        //Set SelectedProduct clear
        case types.SET_CLEAR_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProducts: [],
            };
        default:
            return state;
    }
}

export default rootReducer;
