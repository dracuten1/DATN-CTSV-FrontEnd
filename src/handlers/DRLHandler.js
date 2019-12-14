import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

export const FindStudentInfoById = async (id) => {

    const url = `drl/ttsv?mssv=${id}`;

    const response = await HttpClient.sendGet(url);

    return response;

};