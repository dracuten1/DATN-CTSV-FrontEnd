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