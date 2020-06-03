import * as HttpClient2 from 'core/services/HttpClient2';
import { logger } from 'core/services/Apploger';

export const GetInfoStudent = async (mssv) => {
    logger.info('HSSVHandler:: GetInfoStudent: mssv: ', mssv);
    const url     = `hssv/getOne?mssv=${mssv}`;
    const response = await HttpClient2.sendGet(url);
    return response;
};

export const UpdateStudentInfo = async (data) => {
    const url = `hssv/getOne`;

    logger.info('HSSVHandler: data', data); 
    const response = await HttpClient2.sendPutWithBody(url, data);
    return response;
};

export const PrintStudentInfo = async (data) => {
  const url = `hssv/printf`;
  logger.info('HSSVHandler: data::', data);
  const response = await HttpClient2.sendPatchWithBody(url, data);
  return response;
};
