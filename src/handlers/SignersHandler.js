import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

const url = `signer`;

export const getAllSigners = async () => {

    logger.info('SignersHandler:: getAllSigners: URL: ', url);

    const response = await HttpClient.sendGet(url);

    logger.info('SignersHandler:: getAllSigners: reponse: ', response);

    return response.Items;
};

export const addSingleSigner = async data => {

    const response = await HttpClient.sendPost(url, data);

    return response;
}

export const updateSignerStatus = async data => {

    return await HttpClient.sendPutWithBody(url, data);

}