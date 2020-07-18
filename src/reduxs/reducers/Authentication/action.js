import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import hisory from 'historyConfig';
import { logger } from 'core/services/Apploger';
// import * as AdminHandler from 'handlers/AdminHandler';
import * as actionTypes from './actionTypes';

const poolData = {
    UserPoolId: 'ap-southeast-1_6pX9mWgjh',
    ClientId: '32gh8i178tatha2f01gps8k014'
};
const userPool = new CognitoUserPool(poolData);
const redirectPath = '/dashboard';

export const forgotPass = () => {

    return {
        type: actionTypes.FORGOT_PASSWORD
    };
};

export const forgotPassSuccess = () => {

    return {
        type: actionTypes.FORGOT_PASSWORD_SUCCESS
    };
};

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
export const changPassSuccess = (error) => {
    return {
        type: actionTypes.CHANGE_PASSWORD,
        error
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
                dispatch(authResetPassword());
            },
            onFailure: (err) => {
                logger.info(err);
            },
        });
    };
};

export const changePassWhenForgot = (username, code, newPassword) => {
    return dispatch => {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool
        });
        cognitoUser.confirmPassword(code, newPassword, {
            onSuccess() {
                logger.info('Password confirmed!');
                dispatch(forgotPass());
            },
            onFailure(err) {
                logger.info('Password not confirmed!');
            },
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
                logger.info('Confirm error', err);
                dispatch(confirmFail(err));
            },
            onSuccess(result) {
                logger.info('Confirm success', result);
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
                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                AWS.config.region = 'ap-southeast-1';

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'ap-southeast-1:ce9f600e-f483-42b2-877d-5204e76e4a66', // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_6pX9mWgjh': result
                            .getIdToken()
                            .getJwtToken(),
                    },
                });

                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh(error => {
                    if (error) {
                        console.error(error);
                    } else {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        // example: var s3 = new AWS.S3();
                        console.log('Successfully logged!');
                        
                    }
                });
                logger.info(result);
                dispatch(authSuccess(cognitoAuthUser));
                hisory.push(redirectPath);
            },
            onFailure: (err) => {
                if (err.code === "NotAuthorizedException")
                    dispatch(authFail(err));
                logger.info(err);
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
export const refreshToken = () => {
    return dispatch => {
        console.log("aaa::",cognitoAuthUser);
        cognitoAuthUser.getSession((err, session) => {
            if (err) dispatch(logout());
            var refresh_token = session.getRefreshToken(); 
            if (AWS.config.credentials.needsRefresh()) {
                cognitoAuthUser.refreshSession(refresh_token, (err, session) => {
                    if (err) {
                        console.log(err);
                    } else {
                        AWS.config.credentials.params.Logins[
                            'cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_6pX9mWgjh'
                        ] = session.getIdToken().getJwtToken();
                        AWS.config.credentials.refresh(err => {
                            if (err) {
                                console.log(err);
                            } else {
                                //dispatch()
                                console.log('aaa: ',cognitoAuthUser);
                                console.log('TOKEN SUCCESSFULLY UPDATED');
                            }
                        });
                    }
                });
            }
            dispatch(authSuccess(cognitoAuthUser));
            // else {
            //     if (session.isValid()) {
            //         dispatch(authSuccess(cognitoAuthUser));
            //     }
            //     else {
            //         dispatch(logout());
            //     };
            // }
        });
        
    }
}
export const handleNewPassword = (newPassword) => {
    return dispatch => {
        dispatch(authStart());
        cognitoAuthUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes, {
            onSuccess: (result) => {
                logger.info(result);
                dispatch(authSuccess(cognitoAuthUser));
            },
            onFailure: (err) => {
                logger.info(err);
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
        cognitoAuthUser = userPool.getCurrentUser();
        if (cognitoAuthUser) {
            cognitoAuthUser.getSession((err, session) => {
                if (err) dispatch(logout());
                else {
                    if (session.isValid()) {
                        dispatch(authSuccess(cognitoAuthUser));
                    }
                    else {
                        dispatch(logout());
                    };
                }
            });
        }
    };
};

// export const ChangePass = (newPassword) =>  async dispatch => {
//     const response = await AdminHandler.ChangePass(newPassword);
//     logger.info('AdminAction:: update: reponse: ', response);

//     if (response.statusCode === 200)
//         dispatch(logout());
// };
