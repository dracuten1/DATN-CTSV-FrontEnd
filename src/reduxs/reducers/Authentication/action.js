import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from 'amazon-cognito-identity-js';
import hisory from 'historyConfig';
import * as actionTypes from './actionTypes';

const poolData = {
    UserPoolId: 'ap-southeast-1_6pX9mWgjh',
    ClientId: '32gh8i178tatha2f01gps8k014'
};
const userPool = new CognitoUserPool(poolData);
const redirectPath = '/drl';



export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (cognitoUser) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        cognitoUser
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};
export const confirmFail = (error) => {
    return {
        type: actionTypes.CONFIRM_FAIL,
        error
    };
};
export const authResetPassword = () => {
    return {
        type: actionTypes.RESET_PASSWORD,
    };
};
export const logout = () => {
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.signOut();
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};
export const resetPassword = (username) => {
    return dispatch => {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool
        });

        // call forgotPassword on cognitoUser
        cognitoUser.forgotPassword({
            onSuccess: (result) => {
                console.log(result);
                dispatch(authResetPassword());
            },
            onFailure: (err) => {
                console.log(err);
            }
        });
    };
};

//TO DO: 
export const confirmPassword = (username, verificationCode, newPassword) => {
    return dispatch => {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool
        });
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onFailure(err) {
                console.log('Confirm error', err);
                dispatch(confirmFail(err));
            },
            onSuccess(result) {
                console.log('Confirm success', result);
                dispatch(authSuccess(cognitoUser));
            },
        });
    };
};

let cognitoAuthUser;
let sessionUserAttributes;

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        //
        const authenticationData = {
            Username: email,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        const userData = {
            Username: email,
            Pool: userPool,
        };
        cognitoAuthUser = new CognitoUser(userData);
        cognitoAuthUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log(result);
                hisory.push(redirectPath);
                dispatch(authSuccess(cognitoAuthUser));
            },
            onFailure: (err) => {
                if (err.code === "NotAuthorizedException")
                    dispatch(authFail(err));
                console.log(err);
                dispatch(authFail(err));
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                // the api doesn't accept this field back
                delete userAttributes.email_verified;

                // store userAttributes on global variable
                sessionUserAttributes = userAttributes;
                sessionUserAttributes.name = email;
                dispatch(authResetPassword());
            }
        });
    };
};
export const handleNewPassword = (newPassword) => {
    return dispatch => {
        dispatch(authStart());
        cognitoAuthUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes, {
            onSuccess: (result) => {
                console.log(result);
                dispatch(authSuccess(cognitoAuthUser));
            },
            onFailure: (err) => {
                console.log(err);
                dispatch(authFail(err));
            }
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.getSession((err, session) => {
                if (err) dispatch(logout());
                else {
                    if (session.isValid()) {
                        dispatch(authSuccess(cognitoUser));
                    } else {
                        dispatch(logout());
                    };
                }
            });
        }
    };
};

