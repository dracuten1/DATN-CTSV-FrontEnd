import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

const convertNamHoc = nh => {
  const dt = new Date();
  const year = dt.getFullYear();
  const convert = year % 100;

  switch (nh) {
    case `${year}-${(year + 1)}`:
      return `${convert}-${(convert + 1)}`;
    case `${(year - 1)}-${year}`:
      return `${(convert - 1)}-${convert}`;
    case `${(year - 2)}-${(year - 1)}`:
      return `${(convert - 2)}-${(convert - 1)}`;
    case `${(year - 3)}-${(year - 2)}`:
      return `${(convert - 3)}-${(convert - 2)}`;
    case `${(year - 4)}-${(year - 3)}`:
      return `${(convert - 4)}-${(convert - 3)}`;
    case `${(year - 5)}-${(year - 4)}`:
      return `${(convert - 5)}-${(convert - 4)}`;
    case `${(year - 6)}-${(year - 5)}`:
      return `${(convert - 6)}-${(convert - 5)}`;
    default:
      return nh;
  }
};

export const GetListWithFilter = async filter => {
  const url     = `ttluutru/sv`;
  filter.limit  = 10000;
  filter.nh     = convertNamHoc(filter.nh);
  const response = await HttpClient.sendPutWithBodyGetStatus(url, filter);
  return response;
};

export const UpdateOneStudentByType = async (data, type) => {
  const url = `ttluutru/sv`;
  const keys = { data, type };
  logger.info('keys: ', keys);
  const response = await HttpClient.sendPostGetData(url, keys);
  return response;
};

export const ExportWithFilter = async (filter) => {
  const {nh, hk}  = filter;
  let   { type }      = filter;
  const cvNH = convertNamHoc(nh);
  switch (filter.type){
    case 'all': case 'All':
      type = 'All';
      break;
    case 'ktx': case 'KTX':
      type = 'KTX';
      break;
    default:
      type = '';
  }

  const url = `ttluutru/get?nh=${cvNH}&hk=${hk}&type=${type}&limit=10000`;

  const response = await HttpClient.sendGetData(url);

  return response;
};