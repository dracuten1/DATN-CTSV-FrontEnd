import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';
import moment from 'moment';

export const FindStudentInfoById = async (id) => {

  const url = `xnsv/ttsv?mssv=${id}`;

  const response = await HttpClient.sendGet(url);

  return response;

};

export const GetXNSVByType = async (type) => {

  const url = `xnsv/listCertificateByType?type=${type}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

const parseCase = key => {
  switch (key) {
    case 'Đang học':
      return 1;
    case 'Bảo lưu':
      return 2;
    case 'Chờ xét tốt nghiệp':
      return 3;
    case 'Chờ xét hoàn tất chương trình':
      return 4;
    case 'Vay vốn':
      return 5;
    case 'Giấy giới thiệu':
      return 6;
    case 'Thời gian học':
      return 7;
    default:
      return 8;
  }
};

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

export const GetListCertificate = async (status) => {

  const url = `xnsv/certificate?status=${status}`;

  const response = await HttpClient.sendPutGetStatus(url);

  const { statusCode, body } = response;

  if (statusCode !== 200 || body.length === 0) {
    return [];
  }

  const payload = body.map((item, index) => {
    item.scn = item.SCN;
    item.language = item.NgonNgu.trim() === "Tiếng Việt" ? 2 : 1;
    item.name = item.ThongTinSinhVien.Ten;
    item.mssv = item.ThongTinSinhVien.MSSV;
    item.case = parseCase(item.LoaiGiayXN);
    item.reason = item.LyDoXN;
    item.date = moment(item.NgayThemGXN).format('DD/MM/YYYY');
    item.pk = item.PK;
    item.sk = item.SK;
    item.ngayin = item.NgayIn ? moment(item.NgayIn).format('DD/MM/YYYY') : null;
    item.link = item.linkDownloadPrint ? item.linkDownloadPrint : null;
    return item;
  });

  return payload;
};

export const PrintByType = async (keys, type, language) => {

  const url = `xnsv/printf?type=${type}&language=${language}`;
  logger.info('XNSVHandler:: PrintByType: url: ', url);
  logger.info('XNSVHandler:: PrintByType: keys: ', keys);

  const response = await HttpClient.sendPatchWithBody(url, { keys });;

  return response;
};

export const PrintOneStudent = async (data) => {

  const url = `xnsv/printf`;
  const response = await HttpClient.sendPutWithBodyGetStatus(url, data);
  logger.info("XNSVhandler:: printOneCertificate: response: ", response);

  return response;
};

export const PrintAllCertificate = async (keys, language) => {
  const url = `xnsv/printfMultipleXnsv?language=${language}`;

  const response = await HttpClient.sendPatchWithBody(url, { keys });

  return response;
};

export const DeleteOneCertificate = async (pk, sk) => {

  const url = `xnsv/certificate`;

  logger.info("XNSVhandler:: deleteOneCertificate: URL: ", url);

  const response = await HttpClient.sendDeleteWithStatusCode(url, { data: { pk, sk } });

  logger.info("XNSVhandler:: deleteOneCertificate: response: ", response);
  return response;
};


export const AddCertificate = async value => {
  const url = `xnsv/certificate`;

  const response = await HttpClient.sendPost(url, value);

  return response;
};

export const GetCompany = async () => {
  const url = `xnsv/company`;

  const response = await HttpClient.sendGetData(url);

  return response;
};

export const ExportWithFilter = async (filter) => {
  const { nh, hk, type, username } = filter;
  const cvNH = convertNamHoc(nh);
  const url = `xnsv/exportExcelXNSVPrinted?nh=${cvNH}&hk=${hk}&type=${type}&username=${username}`;

  const response = await HttpClient.sendPatch(url);

  return response;
};

export const ExportWithFilterByDate = async (filter) => {
  const { username, fromDate, toDate } = filter;
  const url = `xnsv/exportExcelXNSVPrinted?fromDate=${fromDate}&toDate=${toDate}&username=${username}`;

  const response = await HttpClient.sendPatch(url);

  return response;
};

export const GetListExport = async (filter) => {
  const { nh, hk, type, /*fromDate, toDate,*/ username } = filter;
  const cvNH = convertNamHoc(nh);
  const url = `xnsv/exportExcelXNSVPrinted?nh=${cvNH}&hk=${hk}&type=${type}&username=${username}`;
  logger.info("XNSVhandler:: GetListExport: url: ", url);

  const response = await HttpClient.sendPutGetStatus(url);
  logger.info("XNSVhandler:: GetListExport: response: ", response);
  const { statusCode, body } = response;

  if (statusCode !== 200 || body.length === 0) {
    return [];
  }
  const payload = body.map((item, index) => {
    item.scn = item.SCN;
    item.language = item.NgonNgu.trim() === "Tiếng Việt" ? 2 : 1;
    item.name = item.Ten;
    item.mssv = item.MSSV;
    item.case = parseCase(item.LoaiGiayXN);
    item.reason = item.LyDoXN;
    item.date = moment(item.NgayThemGXN).format('DD/MM/YYYY');
    item.pk = item.PK;
    item.sk = item.SK;
    item.ngayin = item.NgayIn ? moment(item.NgayIn).format('DD/MM/YYYY') : null;
    item.link = item.linkDownloadPrint ? item.linkDownloadPrint : null;
    return item;
  });
  return payload;
};

export const GetListExportByDate = async (filter) => {
  const { fromDate, toDate, username } = filter;
  const url = `xnsv/exportExcelXNSVPrinted?fromDate=${fromDate}&toDate=${toDate}&username=${username}`;
  logger.info("XNSVhandler:: GetListExport: url: ", url);

  const response = await HttpClient.sendPutGetStatus(url);
  logger.info("XNSVhandler:: GetListExport: response: ", response);
  const { statusCode, body } = response;

  if (statusCode !== 200 || body.length === 0) {
    return [];
  }
  const payload = body.map((item, index) => {
    item.scn = item.SCN;
    item.language = item.NgonNgu.trim() === "Tiếng Việt" ? 2 : 1;
    item.name = item.Ten;
    item.mssv = item.MSSV;
    item.case = parseCase(item.LoaiGiayXN);
    item.reason = item.LyDoXN;
    item.date = moment(item.NgayThemGXN).format('DD/MM/YYYY');
    item.pk = item.PK;
    item.sk = item.SK;
    item.ngayin = item.NgayIn ? moment(item.NgayIn).format('DD/MM/YYYY') : null;
    item.link = item.linkDownloadPrint ? item.linkDownloadPrint : null;
    return item;
  });
  return payload;
};
