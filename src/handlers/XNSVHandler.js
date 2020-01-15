import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';
import moment from 'moment';

export const FindStudentInfoById = async (id) => {

    const url = `xnsv/ttsv?mssv=${id}`;

    const response = await HttpClient.sendGet(url);

    return response;

};

export const GetDRLByIdAndType = async (id, type) => {

    const url = `drl/mssv-type?mssv=${id}&type=${type}`;

    const reponse = await HttpClient.sendGet(url);

    return reponse;

};