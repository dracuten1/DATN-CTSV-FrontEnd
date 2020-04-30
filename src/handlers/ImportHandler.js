import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';
import moment from 'moment';

export const GetUploadURL = async (type) => {
  const url = `s3?type=${type}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const GetImportDRLInfo = async (key) => {
  const url = `import/studentInfo/importDRLInfo?key=${key}`;

  const response = await HttpClient.sendGet(url);

  return response;
};


export const ImportDRLInfo = async (value) => {
  const url = `import/studentInfo/confirm`;

  const response = await HttpClient.sendPost(url, value);

  return response;
};

export const GetImportStatus = async () => {
  const url = `import/studentInfo/getDRLResultLog`;

  const response = await HttpClient.sendGet(url);

  return response;
};


/* Import QLLT */
export const GetImportQLLTInfo = async (importCase, key) => {
  let url = null;
  importCase === 2 ? url = `ttluutru/ktx/import?key=${key}` : url = `ttluutru/all/import?key=${key}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const ImportQLLTInfo = async (importCase, value) => {
  let url = null;
  importCase === 2 ? url = `ttluutru/ktx/import` : url = `ttluutru/all/import`;
  logger.info('ImportDialog:: value: ', value);
  const response = await HttpClient.sendPost(url, value);

  return response;
};

export const GetImportStatusQLLT = async (key) => {
  const url = `ttluutru/getLog?key=${key}`;
 
  const response = await HttpClient.sendGet(url);

  return response;
};
