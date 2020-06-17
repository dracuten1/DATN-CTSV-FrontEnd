import * as HttpClient2 from 'core/services/HttpClient2';
import { logger } from 'core/services/Apploger';

const convertNamHoc = nh => {
  const dt = new Date();
  const year = dt.getFullYear();
  const convert = year % 100;

  switch (nh) {
    case `${year}-${year + 1}`:
      return `${convert}-${convert + 1}`;
    case `${year - 1}-${year}`:
      return `${convert - 1}-${convert}`;
    case `${year - 2}-${year - 1}`:
      return `${convert - 2}-${convert - 1}`;
    case `${year - 3}-${year - 2}`:
      return `${convert - 3}-${convert - 2}`;
    case `${year - 4}-${year - 3}`:
      return `${convert - 4}-${convert - 3}`;
    case `${year - 5}-${year - 4}`:
      return `${convert - 5}-${convert - 4}`;
    case `${year - 6}-${year - 5}`:
      return `${convert - 6}-${convert - 5}`;
    default:
      return nh;
  }
};

const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const CountingWithFilter = async filter => {
  const { fromHK, fromNH, toHK, toNH, typeCDCS, doituong } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);

  const url = `chinhsach/thongke?typeCDCS=${typeCDCS}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&doituong=${doituong}`;
  logger.info('CDCSHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const ExportCountingWithFilter = async filter => {
  const { fromHK, fromNH, toHK, toNH, typeCDCS, doituong } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);

  const url = `chinhsach/thongke?typeCDCS=${typeCDCS}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&doituong=${doituong}`;
  logger.info('CDCSHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutGetStatus(url);

  return response;
};

export const CountingWithMSSV = async filter => {
  const { fromHK, fromNH, toHK, toNH, mssv, doituong } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);

  const url = `chinhsach/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&doituong=${doituong}`;
  logger.info('CDCSHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const GetDataFilter = async () => {
  const url = `hb/common`;

  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const ExportCountingWithMSSV = async filter => {
  const { fromHK, fromNH, toHK, toNH, mssv, doituong } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);

  const url = `chinhsach/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&doituong=${doituong}`;
  logger.info('CDCSHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutGetStatus(url);

  return response;
};
