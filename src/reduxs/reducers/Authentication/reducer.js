import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initialState = {
    cognitoUser:null,
    userName: null,
    error: null,
    loading: false,
    resetPassword: false,
    forgotPassword: false,
    authRedirectPath: '/dashboard'
};

const forgotPass = (state) => {
    return updateObject(state, { error: null, loading: false, forgotPassword: true });
};
const authStart = (state) => {
    return updateObject(state, { error: null, loading: true });
};
const resetPassword = (state, action) => {
    return updateObject(state, { error: null, loading: false, resetPassword: true, forgotPassword:false, userName: action.userName });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        cognitoUser: action.cognitoUser,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state) => {
    return updateObject(state, { token: null, userId: null, cognitoUser:null });
};

const changPassSuccess = (state) => {
    return updateObject(state, { error: false, loading: false, token: null, userId: null, cognitoUser:null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.CHANGE_PASSWORD: return changPassSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.RESET_PASSWORD: return resetPassword(state, action);
        case actionTypes.FORGOT_PASSWORD: return forgotPass(state, action);
        default:
            return state;
    }
};

export default reducer;