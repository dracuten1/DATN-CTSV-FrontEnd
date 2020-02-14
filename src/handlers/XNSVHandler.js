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

export const PrintByType = async (type) => {

  const url = `xnsv/printf?type=${type}`;

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

  const response = await HttpClient.sendGet(url);

  return response;
};

export const ExportWithFillter = async (fillter) => {
  const {nh, hk, type, fromDate, toDate} = fillter;
  const url = `xnsv/exportExcelXNSVPrinted?fromDate=${fromDate}&toDate=${toDate}&nh=${nh}&hk=${hk}&type=${type}`;

  const response = await HttpClient.sendPatch(url);

  return response;
};

export const GetListExport = async (fillter) => {
  const {nh, hk, type, fromDate, toDate} = fillter;
  const url = `xnsv/exportExcelXNSVPrinted?fromDate=${fromDate}&toDate=${toDate}&nh=${nh}&hk=${hk}&type=${type}`;

  const response = await HttpClient.sendPut(url);
  const {Items} = response;
  const payload = Items.map((item, index) => {
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

