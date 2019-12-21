import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

export const FindStudentInfoById = async (id) => {

    const url = `drl/ttsv?mssv=${id}`;

    const response = await HttpClient.sendGet(url);

    return response;

};

export const GetDRLByIdAndType = async (id, type) => {

    const url = `drl/mssv-type?mssv=${id}&type=${type}`;

    const reponse = await HttpClient.sendGet(url);

    return reponse;

};

export const AddCertificate = async (value) => {

    const url = `drl/add-certificate`;

    const response = await HttpClient.sendPost(url, value);

    return response;
};

export const GetListCertificate = async (status) => {

    const url = `drl/getListCertificates?status=${status}&limit=10`;

    const reponse = await HttpClient.sendGet(url);

    return reponse;
};