import * as HttpClient2 from 'core/services/HttpClient2';
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

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const GetListWithFilter = async (filter, type) => {
    filter.nh     = convertNamHoc(filter.nh);
    logger.info('QLBHHandler:: getListAll: filter: ', filter, type);
    const url     = `bh/list?type=${type}&nh=${filter.nh}&hk=${filter.hk}`;
    const response = await HttpClient2.sendGet(url);
    return response;
};

export const UpdateOneStudentByType = async (data) => {
    const url = `bh/list`;
    const response = await HttpClient2.sendPutWithBodyGetStatus(url, data);
    logger.info('QLBHHandler: response', response); 
    return response;
};

export const DeleteOneCertificate = async (PK, SK, type) => {
  const url = `bh/list`;
  logger.info('QLBHHandler: ', PK, SK, type);
  const response = await HttpClient2.sendDeleteWithStatusCode(url, { PK, SK, type });
  logger.info('QLBHHandler: response', response);
  return response;
};

export const ExportWithFilter = async (filter, type) => {
    const {nh, hk}  = filter;
    const cvNH = convertNamHoc(nh);

    const url = `bh/list?nh=${cvNH}&hk=${hk}&type=${type}`;

    const response = await HttpClient2.sendPatch(url);

    return response;
};

export const CountingWithMSSV = async (filter) => {
  const {fromHK, fromNH, toHK, toNH, mssv, type}  = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvType;
  if (type === 'BHYT'){
    cvType = 'YT';
  }else if (type === 'BHTN'){
    cvType = 'TN';
  }else {
    cvType = 'BT';
  }

  const url = `bh/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=${cvType}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const ExportCountingWithMSSV = async (filter) => {
  const {fromHK, fromNH, toHK, toNH, mssv, type}  = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `bh/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=BT`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutGetStatus(url);

  return response;
};