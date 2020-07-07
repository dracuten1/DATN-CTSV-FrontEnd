import axios from "axios";
// import { logger } from "./AppLogger";
import { logger } from 'core/services/Apploger';
import appConfig from "../../config/app-config";
import store from '../../store';
import * as AWS from 'aws-sdk/global';
import {
    CognitoUserPool,
    CognitoUser
} from 'amazon-cognito-identity-js';
/**
 * Axios basic configuration
 * Some general configuration can be added like timeout, headers, params etc. More details can be found on https://github.com/axios/axios
 */
const config = {
    baseURL: appConfig.api.BASE_URL2,
};

/**
 * Creating the instance of Axios
 * It is because, in large scale application we may need to consume APIs from more than single server,
 * So, may need to create multiple http client with different config
 * Only this client will be used rather than axios in the application
 */
const httpClient = axios.create(config);

const loggerInterceptor = (configuration) => {
    /** Add logging here */
    return configuration;
};

/** Adding the request interceptors */
httpClient.interceptors.request.use(
    (configuration) => {

        const refresh_token = store.getState().auth.cognitoUser.signInUserSession.refreshToken.token;
        if (AWS.config.credentials && AWS.config.credentials.needsRefresh()) {
            const poolData = {
                UserPoolId: 'ap-southeast-1_6pX9mWgjh',
                ClientId: '32gh8i178tatha2f01gps8k014'
            };
            const userPool = new CognitoUserPool(poolData);
            const cognitoUser = new CognitoUser({
                Username: store.getState().auth.cognitoUser.signInUserSession.username,
                Pool: userPool
            });
            cognitoUser.refreshSession(refresh_token, (err, session) => {
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
                            console.log('TOKEN SUCCESSFULLY UPDATED');
                        }
                    });
                }
            });
        }

        const { jwtToken } = store.getState().auth.cognitoUser.signInUserSession.idToken;

        const contentType = 'application/json';

        const headers = {
            'Auth_Token': jwtToken,
            'Content-Type': contentType,
        };

        configuration.headers = headers;

        return configuration;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpClient.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Response error
        return Promise.reject(error);
    },
);

/**
 *
 * @param {*} url
 * @param {*} requestBody
 */
export const sendPost = async (url, requestBody) => {

    const response = await httpClient.post(url, requestBody);

    const { body } = response.data;

    return body;
};

export const sendPostGetData = async (url, requestBody) => {

    const response = await httpClient.post(url, requestBody);

    return response.data;
};

export const sendPostWithParams = async (url) => {

    const response = await httpClient.post(url);

    return response.data;
};

export const sendPut = async (url) => {

    const response = await httpClient.put(url);

    const { body } = response.data;

    return body;
};

export const sendPutGetStatus = async (url) => {

    const response = await httpClient.put(url);

    return response.data;
};

export const sendPutWithBody = async (url, requestBody) => {
    const response = await httpClient.put(url, requestBody);

    const { body } = response.data;

    return body;
};

export const sendPutWithBodyGetStatus = async (url, requestBody) => {
    const response = await httpClient.put(url, requestBody);

    return response.data;
};

/**
 *
 * @param {*} url
 */
export const sendGet = async (url) => {

    const response = await httpClient.get(url);

    const { body } = response.data;

    return body;
};

export const sendGetBody = async (url, requestBody) => {

    const response = await httpClient.get(url, requestBody);

    const { body } = response.data;

    return body;
};

export const sendGetData = async (url) => {

    const response = await httpClient.get(url);

    const { data } = response;

    return data;
};

/**
 *
 * @param {*} url
 * @param {*} requestBody
 */
export const sendDelete = async (url, requestBody) => {

    const response = await httpClient.delete(url, requestBody);

    const { body } = response.data;
    return body;
};

export const sendDeleteWithStatusCode = async (url, requestBody) => {

    const response = await httpClient.delete(url, requestBody);

    return response.data;
};

export const sendPatch = async (url) => {
    const response = await httpClient.patch(url);

    return response.data;
};

export const sendPatchWithBody = async (url, requestBody) => {
    const response = await httpClient.patch(url, requestBody);
    logger.info('QLHBHanlder:: CountingWithFilter: requestBody: ', requestBody);
    return response.data;
};