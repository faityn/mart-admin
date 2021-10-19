import { types } from "./Types";

import {
    setApolloClient,
    setLoggedUser,
    setToken,
    setOrdersPrint,
    setSelectedProduct,
    setNotSelectedProduct,
    setClearSelectedProduct,
} from "./Actions";

import rootReducer from "./Reducers";

import store from "./Store";

export {
    types,
    setApolloClient,
    setLoggedUser,
    rootReducer,
    setToken,
    setOrdersPrint,
    setSelectedProduct,
    setNotSelectedProduct,
    setClearSelectedProduct,
    store,
};
