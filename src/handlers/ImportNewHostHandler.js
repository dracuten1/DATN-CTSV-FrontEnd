import * as HttpClient2 from 'core/services/HttpClient2';
import { logger } from 'core/services/Apploger';

export const GetUploadURL = async (type) => {
  const url = `s3?type=${type}`;
  logger.info('ImportDialog:: type: ', type);
  const response = await HttpClient2.sendGet(url);

  return response;
};

/* Import QLBH */
export const GetImportQLBHInfo = async (value) => {
  const url = `bh/process-import`;

  const response = await HttpClient2.sendPost(url, value);;

  return response;
};


export const GetImportStatusQLBH = async (key) => {
  const url = `ttluutru/getLog?key=${key}`;
 
  const response = await HttpClient2.sendGet(url);

  return response;
};


