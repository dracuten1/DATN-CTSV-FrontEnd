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
      return '';
  }
};

const convertType = type => {
  switch (type) {
    case 'Bảo Lưu':
      return 'BaoLuu';
    case 'Đang Học':
      return 'DangHoc';
    case 'Sinh Viên Nước Ngoài':
      return 'NN';
    case 'Tốt Nghiệp':
      return 'TotNghiep';
    case 'Hoàn Tất Chương Trình':
      return 'HTCT';
    case 'Buộc Thôi Học':
      return 'BuocThoiHoc';
    case 'Cảnh Cáo Học Vụ':
      return 'CanhCaoHV';
    case 'Đăng Ký Học Phần':
      return 'DKHP';
    case 'Điểm Trung Bình':
      return 'DiemTB';
    default:
      return '';
  }
};

export const GetListWithFilter = async filter => {
  const { type, hk, nh } = filter;
  const cvNH = convertNamHoc(nh);
  const cvType = convertType(type);
  const url = `xnsv/ttsv?type=${cvType}&hk=${hk}&nh=${cvNH}`;
  logger.info('TTSVAction:: getListAll: url: ', url);
  const response = await HttpClient.sendPutGetStatus(url);
  return response;
};

export const GetListWithMSSV = async filter => {
  const {  hk, nh, mssv } = filter;
  const cvNH = convertNamHoc(nh);
  const url = `xnsv/ttsv?hk=${hk}&nh=${cvNH}&mssv=${mssv}`;
  logger.info('TTSVAction:: getListAll: url: ', url);
  const response = await HttpClient.sendPutGetStatus(url);
  return response;
};

// export const UpdateOneStudentByType = async (data, type) => {
//   const url = `ttluutru/sv`;
//   const keys = { data, type };
//   const response = await HttpClient.sendPost(url, keys);
//   return response;
// };

export const ExportWithFilter = async (filter) => {
  const { type, hk, nh, mssv } = filter;
  const cvNH = convertNamHoc(nh);
  const cvType = convertType(type);
  const url = mssv === '' ? `xnsv/ttsv?type=${cvType}&hk=${hk}&nh=${cvNH}` : `xnsv/ttsv?mssv=${mssv}`;
  logger.info('TTSVHandler:: update status:: url: ', url);

  const response = await HttpClient.sendPatch(url);

  return response;
};

export const UpdateStudentStatus = async (body) => {

  const url = `xnsv/updateTTHV`;
  logger.info('TTSVHandler:: update status:: body: ', body);
  const response = await HttpClient.sendPutWithBody(url, body);
  logger.info('TTSVHandler:: update status:: response: ', response);

}
