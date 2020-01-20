import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

export const createUser = async data => {
  const url = `admin/createUser`;

  logger.info('AdminHandler:: createUser: URL: ', url);

  const response = await HttpClient.sendPost(url, data);

  logger.info('AdminHandler:: createUser: reponse: ', response);
};

export const disalbeUser = async data => {
  const url = `admin/disableUser`;

  logger.info('AdminHandler:: disalbeUser: URL: ', url);

  const response = await HttpClient.sendPost(url, data);

  logger.info('AdminHandler:: disalbeUser: reponse: ', response);
};

