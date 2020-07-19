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
  const url = `bh/import-bhxh`;

  const response = await HttpClient2.sendPost(url, value);

  return response;
};

/* Import CDCS */
export const GetImportCDCSInfo = async (value) => {
  const url = `cdcs/import`;

  const response = await HttpClient2.sendPost(url, value);

  return response;
};

/* Import KTKL */
export const GetImportKTKLInfo = async (value) => {
  const url = `ktkl/import`;

  const response = await HttpClient2.sendPost(url, value);

  return response;
};

/* Get Status */
export const GetImportStatus = async (key) => {
  const url = `ttluutru/getLog?key=${key}`;
 
  const response = await HttpClient2.sendGet(url);

  return response;
};