import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';
import moment from 'moment';
import { fil } from 'date-fns/locale';

export const GetListWithFilter = async filter => {
  const url = `ttluutru/sv`;
  filter.limit = 100;
  const response = await HttpClient.sendPutWithBody(url,filter);
  return response;
};
