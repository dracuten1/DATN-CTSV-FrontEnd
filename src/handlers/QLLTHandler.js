import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

export const GetListWithFilter = async filter => {
  const url = `ttluutru/sv`;
  filter.limit = 1000;
  const response = await HttpClient.sendPutWithBody(url, filter);
  return response;
};

export const UpdateOneStudentByType = async (data, type) => {
  const url = `ttluutru/sv`;
  const keys = { data, type };
  const response = await HttpClient.sendPost(url, keys);
  return response;
};
