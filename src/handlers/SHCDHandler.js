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
      return '';
  }
};

export const GetUploadURL = async (fileName, nh, hk) => {
  const cvNH = convertNamHoc(nh);
  const url = `shcd/upload?type=SHCD&fileName=${fileName}&nh=${cvNH}&hk=${hk}`;
  logger.info('ImportDialog:: url: ', url);
  const response = await HttpClient2.sendGet(url);

  return response;
};

export const GetFileWithFilter = async filter => {
  const { status, nh, hk } = filter;
  const cvNH = convertNamHoc(nh);
  let stt;
  switch (status) {
    case 'Đang Lưu Trữ':
      stt = 1;
      break;
    case 'Xóa Tạm Thời':
      stt = 0;
      break;
    default:
      stt = -1;
  }

  const url = `shcd/files?mode=GetFiles&limit=1000&lastEvaluatedKey=&status=${stt}&nh=${cvNH}&hk=${hk}`;

  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const DownloadFile = async keyS3 => {
  const url = `shcd/files?mode=Download&fileKey=${keyS3}`;

  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const UpdateStatusFile = async (pkskArr, status) => {
  const url = `shcd/files`;
  logger.info('SHCDHandler:: UpdateStatusFile: pkskArr: ', pkskArr);
  const response = await HttpClient2.sendPutWithBodyGetStatus(url, {
    pkskArr,
    status
  });

  return response;
};

export const GetContentFile = async fileKey => {
  const url = `shcd/files?mode=GetContent&fileKey=${fileKey}`;
  logger.info('SHCDHandler:: GetContentFile: fileKey: ', fileKey);
  const response = await HttpClient2.sendGetData(url);

  return response;
};
