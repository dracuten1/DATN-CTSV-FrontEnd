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
    case 'BẢO LƯU':
      return 'BaoLuu';
    case 'ĐANG HỌC':
      return 'DangHoc';
    case 'SINH VIÊN NƯỚC NGOÀI':
      return 'NN';
    case 'TỐT NGHIỆP':
      return 'TotNghiep';
    case 'HOÀN TẤT CHƯƠNG TRÌNH':
      return 'HTCT';
    case 'BUỘC THÔI HỌC':
      return 'BuocThoiHoc';
    case 'CẢNH CÁO HỌC VỤ':
      return 'CanhCaoHV';
    case 'ĐĂNG KÝ HỌC PHẦN':
      return 'DKHP';
    case 'ĐIỂM TRUNG BÌNH':
      return 'DiemTB';
    default:
      return '';
  }
};

export const GetListWithFilter = async filter => {
  const { type, hk, nh, mssv } = filter;
  const cvNH = convertNamHoc(nh);
  const cvType = convertType(type);
  const url = `xnsv/ttsv?type=${cvType}&hk=${hk}&nh=${cvNH}&mssv=${mssv}`;
  logger.info('TTSVAction:: getListAll: url: ', url);
  const response = await HttpClient.sendPut(url);
  return response;
};

// export const UpdateOneStudentByType = async (data, type) => {
//   const url = `ttluutru/sv`;
//   const keys = { data, type };
//   const response = await HttpClient.sendPost(url, keys);
//   return response;
// };

export const ExportWithFilter = async (filter) => {
  const { type, hk, nh } = filter;
  const cvNH = convertNamHoc(nh);
  const cvType = convertType(type);
  const url = `xnsv/ttsv?type=${cvType}&hk=${hk}&nh=${cvNH}`;

  const response = await HttpClient.sendPatch(url);

  return response;
};

export const UpdateStudentStatus = async (body) => {

  const url = `xnsv/updateTTHV`;
  logger.info('TTSVHandler:: update status:: body: ', body);
  const response = await HttpClient.sendGetBody(url, body)
}