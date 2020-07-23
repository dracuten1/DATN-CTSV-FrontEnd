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

export const CountingWithFilter = async filter => {
  const { fromHK, fromNH, toHK, toNH, typeCDCS, DoiTuong } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvDoiTuong  = DoiTuong;
  if (!Array.isArray(DoiTuong)){
    cvDoiTuong    = [DoiTuong];
  }

  const url = `chinhsach/thongke?typeCDCS=${typeCDCS}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('CDCSHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPatchWithBody(url, {DoiTuong: cvDoiTuong});

  return response;
};

export const ListWithFilter = async filter => {
  const { fromHK, fromNH, typeCDCS } = filter;
  const cvFromNH = convertNamHoc(fromNH);

  const url = `chinhsach/thongke?typeCDCS=${typeCDCS}&fromHK=${fromHK}&fromNH=${cvFromNH}`;
  logger.info('CDCSHanlder:: ListWithFilter: url: ', url);

  const response = await HttpClient2.sendPatchWithBody(url);

  return response;
};

export const ExportCountingWithFilter = async filter => {
  const { fromHK, fromNH, toHK, toNH, typeCDCS, DoiTuong } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvDoiTuong  = DoiTuong;
  if (!Array.isArray(DoiTuong)){
    cvDoiTuong    = [DoiTuong];
  }

  const url = `chinhsach/thongke?typeCDCS=${typeCDCS}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('CDCSHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutWithBodyGetStatus(url, {DoiTuong: cvDoiTuong});;

  return response;
};

export const ExportListWithFilter = async filter => {
  const { fromHK, fromNH, typeCDCS } = filter;
  const cvFromNH = convertNamHoc(fromNH);

  const url = `chinhsach/thongke?typeCDCS=${typeCDCS}&fromHK=${fromHK}&fromNH=${cvFromNH}`;
  logger.info('CDCSHanlder:: ExportListWithFilter: url: ', url);

  const response = await HttpClient2.sendPutWithBodyGetStatus(url);;

  return response;
};

export const CountingWithMSSV = async filter => {
  const { fromHK, fromNH, toHK, toNH, mssv, DoiTuong } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvDoiTuong  = DoiTuong;
  if (!Array.isArray(DoiTuong)){
    cvDoiTuong    = [DoiTuong];
  }

  const url = `chinhsach/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('CDCSHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPatchWithBody(url, {DoiTuong: cvDoiTuong});

  return response;
};

export const ExportCountingWithMSSV = async filter => {
  const { fromHK, fromNH, toHK, toNH, mssv, DoiTuong } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvDoiTuong  = DoiTuong;
  if (!Array.isArray(DoiTuong)){
    cvDoiTuong    = [DoiTuong];
  }

  const url = `chinhsach/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('CDCSHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutWithBodyGetStatus(url, {DoiTuong: cvDoiTuong});

  return response;
};

export const GetDataFilter = async () => {
  const url = `hb/common`;

  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const DeleteData = async (PK, SK) => {
  const url = `chinhsach/thongke`;

  logger.info('CDCSHanlder:: DeleteData: URL: ', url);

  const response = await HttpClient2.sendDeleteWithStatusCode(url, { data: { PK, SK } });

  logger.info('CDCSHanlder:: DeleteData: response: ', response);
  return response;
};