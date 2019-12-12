import * as HttpClient from 'core/services/HttpClient';
// import { Logger } from 'core/services/Apploger';

export const FindStudentInfoById = async (id) => {

    const url = `drl/ttsv?mssv=${id}`;

    const response = await HttpClient.sendGet(url);


    const { body } = response;

    console.log(body);

    // Logger.info("FindStudentInfoById: ", body);

    return response;

};