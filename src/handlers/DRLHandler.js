import * as HttpClient from 'core/services/HttpClient';
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
      return null;
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

export const FillterListData = async fillter => {
  const {type, time, xeploai} = fillter;
  const url = `drl/sv-type?type=${type}&time=${time}$xeploai=${xeploai}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const AddCertificate = async value => {
  const url = `drl/add-certificate`;

  const response = await HttpClient.sendPost(url, value);
  return response;
};

export const GetListCertificate = async status => {
  const url = `drl/getListCertificates?status=${status}`;

  const response = await HttpClient.sendGet(url);
  const items = response.Items;

  logger.info('PrintList:: getListNotPrintYet: ', items);

  const payload = items.map((item, index) => {
    return {
      stt: index + 1,
      name: item.SinhVien.Ten,
      mssv: item.SinhVien.MSSV,
      case: item.LoaiXN,
      isPrint: item.status !== 'Chưa In',
      date: moment(item.ngayThem).format('DD/MM/YYYY'),
      pk: item.PK,
      sk: item.SK
    };
  });

  return payload;
};

export const DeleteOneCertificate = async (pk, sk) => {
  const url = `drl/delete-certificate`;

  logger.info('DRLhandler:: deleteOneCertificate: URL: ', url);

  const response = await HttpClient.sendDelete(url, { data: {pk, sk} });

  logger.info('DRLhandler:: deleteOneCertificate: response: ', response);
};

export const ExportToDocx = async type => {
  const url = `drl/printf?type=${type}&status=ChuaIn`;

  const response = await HttpClient.sendPatch(url);
  logger.info('DRLHandler:: exporttodocx: response: ', response);

  return response;
};

export const PrintOneStudent = async (PK, SK) => {
  const url = `drl/printfmulti`;

  const response = await HttpClient.sendPatchWithBody(url, { keys: [{ PK, SK }] });

  return response;
};

export const PrintAllStudent = async (keys) => {
  const url = `drl/printfmulti`;

  const response = await HttpClient.sendPatchWithBody(url, { keys });

  return response;
};


export const GetPrintListByDate = async (from, to) => {
  const url = `drl/printf?from=${from}&to=${to}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const GetURLFileImport = async (nh,hk) => {
  const cvNH = convertNamHoc(nh);
  const url = `drl/exportFiles?nh=${cvNH}&hk=${hk}`;

  const response = await HttpClient.sendGet(url);

  logger.info('GetURLFileImport:: GetURLFileImport: ', response);

  const payload = response.map((item, index) => {
    return {
      stt: index + 1,
      url: item
    };
  });

  return payload;
};

