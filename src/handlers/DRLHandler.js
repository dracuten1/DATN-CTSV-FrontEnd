import * as HttpClient from 'core/services/HttpClient';
import * as HttpClient2 from 'core/services/HttpClient2';
import { logger } from 'core/services/Apploger';
import moment from 'moment';

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
      return '';
  }
};

export const FindStudentInfoById = async id => {
  const url = `drl/ttsv?mssv=${id}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const GetDRLByIdAndType = async (id, type) => {
  const url = `drl/mssv-type?mssv=${id}&type=${type}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const FilterListData = async fillter => {
  const { type, time, xeploai} = fillter;
  const nh = convertNamHoc(time);
  const url = `drl/sv-type?type=${type}&time=${nh}&xeploai=${xeploai}&limit=10000`;

  const response = await HttpClient.sendGetData(url);
  
  return response;
};

export const AddCertificate = async value => {
  const url = `drl/add-certificate`;

  const response = await HttpClient.sendPost(url, value);
  return response;
};

export const GetUser = async () => {
  const url = `xnsv/company`;

  const response = await HttpClient.sendGetData(url);

  return response;
};

export const GetListCertificate = async (status, username, fromDate, toDate) => {
  const url = `drl/getListCertificates?status=${status}&username=${username}&from=${fromDate}&to=${toDate}`;
  logger.info('PrintList:: getListNotPrintYet: ', url);

  const response = await HttpClient2.sendGetData(url);
  logger.info('PrintList:: getListNotPrintYet: ', response);

  const {statusCode, body} = response;
  const {Items} = body;

  if (statusCode !== 200 || Items.length === 0){
    return [];
  }

  const payload   = Items.map((item, index) => {
    item.stt      = index + 1;
    item.name     = item.SinhVien.Ten;
    item.mssv     = item.SinhVien.MSSV;
    item.case     = item.LoaiXN;
    item.isPrint  = item.status !== 'Chưa In';
    item.date     = moment(item.ngayThem).format('DD/MM/YYYY');
    item.pk       = item.PK;
    item.sk       = item.SK;
    return item;
  });

  return payload;
};

export const DeleteOneCertificate = async (pk, sk) => {
  const url = `drl/delete-certificate`;

  logger.info('DRLhandler:: deleteOneCertificate: URL: ', url);

  const response = await HttpClient.sendDeleteWithStatusCode(url, { data: { pk, sk } });

  logger.info('DRLhandler:: deleteOneCertificate: response: ', response);
  return response;
};

export const ExportToDocx = async (type, filter) => {
  const {username, from , to} = filter;
  const fromDate  = moment(new Date(from).setHours(0,0,0,0)).format('x');
  const toDate    = moment(new Date(to).setHours(23,59,59,999)).format('x');

  const url = `drl/printf?type=${type}&status=ChuaIn`;
  const url2 = `drl/getListCertificates?status=ChuaIn&username=${username}&from=${fromDate}&to=${toDate}`;

  const response = await HttpClient.sendPatch(url);
  const response2 = await HttpClient2.sendGet(url2);

  
  const data = {
    response,
    listData: response2
  };
  logger.info('DRLHandler:: exporttodocx: response: ', data);
  return data;
};

export const PrintOneStudent = async (PK, SK) => {
  const url = `drl/printfmulti`;

  const response = await HttpClient.sendPatchWithBody(url, { keys: [{ PK, SK }] });

  return response;
};

export const PrintAllStudent = async (keys) => {
  const url = `drl/printfmulti`;
  logger.info('DRLHandler:: PrintAllStudent: keys: ', keys);
  const response = await HttpClient.sendPatchWithBody(url, { keys });
  logger.info('DRLHandler:: PrintAllStudent: response: ', response);
  return response;
};


export const GetPrintListByDate = async (filter) => {
  const {from, to, username} = filter;
  const fromDate  = moment(new Date(from).setHours(0,0,0,0)).format('x');
  const toDate    = moment(new Date(to).setHours(23,59,59,999)).format('x');
  const url = `drl/printf?from=${fromDate}&to=${toDate}&username=${username}`;
  logger.info('GetPrintListByDate:: URL: ', url);
  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const GetURLFileImport = async (nh, hk) => {
  const cvNH = convertNamHoc(nh);
  const url = `drl/exportFiles?nh=${cvNH}&hk=${hk}`;

  logger.info('GetURLFileImport:: URL: ', url);

  const response = await HttpClient.sendGetData(url);

  logger.info('GetURLFileImport:: GetURLFileImport: ', response);

  const {statusCode, body} = response;
  const {urls} = body;

  if (statusCode !== 200 || urls.length === 0){
    return [];
  }

  const payload = urls.map((item, index) => {
    return {
      stt : index,
      url : item
      };
  });

  return payload;
};

export const ExportWithFilter = async (filter) => {
  const { nh,username, from, to } = filter;
  const fromDate  = moment(new Date(from).setHours(0,0,0,0)).format('x');
  const toDate    = moment(new Date(to).setHours(23,59,59,999)).format('x');
  const url = `drl/export?from=${fromDate}&to=${toDate}&username=${username}`;

  const response = await HttpClient2.sendGetData(url);
  logger.info('ExportWithFilter:: ExportWithFilter: ', response);

  return response;
};