import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';
import moment from 'moment';

export const FindStudentInfoById = async id => {
  const url = `drl/ttsv?mssv=${id}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const GetDRLByIdAndType = async (id, type) => {
  const url = `drl/mssv-type?mssv=${id}&type=${type}`;

  const reponse = await HttpClient.sendGet(url);

  return reponse;
};

export const FillterListData = async fillter => {
  const {type, time, xeploai} = fillter;
  const url = `drl/sv-type?type=${type}&time=${time}$xeploai=${xeploai}`;

  const reponse = await HttpClient.sendGet(url);

  return reponse;
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

  logger.info('DRLhandler:: deleteOneCertificate: reponse: ', response);
};

export const ExportToDocx = async type => {
  const url = `drl/printf?type=${type}&status=ChuaIn`;

  const reponse = await HttpClient.sendPatch(url);

  return reponse;
};

export const PrintOneStudent = async (PK, SK) => {
  const url = `drl/printfmulti`;

  const reponse = await HttpClient.sendPatchWithBody(url, { keys: [{ PK, SK }] });

  return reponse;
};

export const GetPrintListByDate = async (from, to) => {
  const url = `drl/printf?from=${from}&to=${to}`;

  const reponse = await HttpClient.sendGet(url);

  return reponse;
};
