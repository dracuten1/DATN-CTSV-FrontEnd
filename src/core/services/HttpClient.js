import axios from "axios";
import { logger } from "./AppLogger";
import appConfig from "../../config/app-config";
import SensitiveStorage from '../services/SensitiveStorage';
import store from '../../store';

const sensitiveStorage = new SensitiveStorage();

/**
 * Axios basic configuration
 * Some general configuration can be added like timeout, headers, params etc. More details can be found on https://github.com/axios/axios
 */
const config = {
    baseURL: appConfig.api.BASE_URL,
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

        const { jwtToken } = store.getState().auth.cognitoUser.signInUserSession.accessToken;
        
        configuration.headers.Auth_token = jwtToken;

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

    const startTime = window.performance.now();

    logger.debug("START sending API POST request:: " + url, requestBody);

    const response = await httpClient.post(url, requestBody);
    const responseData = response.data;

    const totalExecutionTime = (window.performance.now() - startTime);

    logger.debug("END sending API POST request. Total execution time: " + totalExecutionTime + ". Response: ", responseData);

    return responseData;
};

/**
 *
 * @param {*} url
 */
export const sendGet = async (url) => {

    const startTime = window.performance.now();
    logger.debug("HttpClient::START sending API GET request: " + url);

    const response = await httpClient.get(url);

    const totalExecutionTime = (window.performance.now() - startTime);
    logger.debug("HttpClient::END sending API GET request. Total execution time: " + totalExecutionTime + ". Response: ", response);

    return response;
};