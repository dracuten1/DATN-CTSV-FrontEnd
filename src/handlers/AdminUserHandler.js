import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

export const getAllUsers = async () => {

    const url = `admin/users`;

    const response = await HttpClient.sendGet(url);

    return response.Users;
};

export const togleEnable = async (data) => {

    const url = `admin/disableUser`;

    return await HttpClient.sendPutWithBody(url, data);

};

export const togleGroups = async (data) => {

    const url = `admin/changeUserGroup`;
    return await HttpClient.sendPutWithBody(url, data);

};

export const addUser = async (data) => {

    const url = `admin/createUser`;
    return await HttpClient.sendPost(url, data);
}