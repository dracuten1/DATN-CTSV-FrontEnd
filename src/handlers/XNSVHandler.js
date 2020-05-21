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

  const response = await HttpClient.sendPut(url);
  logger.info(response);

  const payload = response.map((item, index) => {
    return {
      scn: item.SCN,
      name: item.ThongTinSinhVien.Ten,
      mssv: item.ThongTinSinhVien.MSSV,
      case: parseCase(item.LoaiGiayXN),
      reason: item.LyDoXN,
      isPrint: item.TrangThai !== 'Chưa In',
      date: moment(item.ngayThem).format('DD/MM/YYYY'),
      pk: item.PK,
      sk: item.SK,
      ngayin: item.NgayIn ? moment(parseFloat(item.NgayIn)).format('DD/MM/YYYY') : null,
      link: item.linkDownloadPrint ? item.linkDownloadPrint : null
    };
  });

  return payload;
};

export const PrintByType = async (type, language) => {

  const url = `xnsv/printf?type=${type}&language=${language}`;

  const response = await HttpClient.sendPatch(url);

  return response;
};

export const PrintOneStudent = async (data) => {

  const url = `xnsv/printf`;
  console.log("dataaaa:", data);
  const response = await HttpClient.sendPutWithBody(url, data);
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

  const response = await HttpClient.sendDelete(url, { data: { pk, sk } });

  logger.info("XNSVhandler:: deleteOneCertificate: response: ", response);

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
  const {nh, hk, type, username, fromDate, toDate} = filter;
  const cvNH = convertNamHoc(nh);
  const url = `xnsv/exportExcelXNSVPrinted?fromDate=${fromDate}&toDate=${toDate}&nh=${cvNH}&hk=${hk}&type=${type}&username=${username}`;

  const response = await HttpClient.sendPatch(url);

  return response;
};

export const GetListExport = async (filter) => {
  const {nh, hk, type, fromDate, toDate, username} = filter;
  const cvNH = convertNamHoc(nh);
  const url = `xnsv/exportExcelXNSVPrinted?fromDate=${fromDate}&toDate=${toDate}&nh=${cvNH}&hk=${hk}&type=${type}&username=${username}`;

  const response = await HttpClient.sendPut(url);
  logger.info("XNSVhandler:: GetListExport: url: ", url);
  const payload = response.map((item, index) => {
    return {
      scn: item.SCN,
      name: item.Ten,
      mssv: item.MSSV,
      case: parseCase(item.LoaiGiayXN),
      reason: item.LyDoXN,
      isPrint: item.TrangThai !== 'Chưa In',
      ngayin: item.NgayIn ? moment(parseFloat(item.NgayIn)).format('DD/MM/YYYY') : null,
      link: item.linkDownloadPrint ? item.linkDownloadPrint : null
    };
  });
  return payload;
};

