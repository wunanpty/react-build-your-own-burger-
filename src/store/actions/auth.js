import * as actionTypes from './actionTypes';
//import axios from '../../axios-orders';

// TODO: set a loading state, show a spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

// async
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
    };
};