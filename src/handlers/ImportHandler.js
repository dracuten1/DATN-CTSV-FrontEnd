import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';
import moment from 'moment';

export const GetUploadURL = async (type) => {
  const url = `s3?type=${type}`;

  const reponse = await HttpClient.sendGet(url);

  return reponse;
};

export const GetImportDRLInfo = async (key) => {
  const url = `import/studentInfo/importDRLInfo?key=${key}`;

  const reponse = await HttpClient.sendGet(url);

  return reponse;
};


export const ImportDRLInfo = async (value) => {
  const url = `import/studentInfo/confirm`;

  const reponse = await HttpClient.sendPost(url, value);

  return reponse;
};
