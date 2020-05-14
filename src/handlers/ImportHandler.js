import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

export const GetUploadURL = async (type) => {
  const url = `s3?type=${type}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const GetImportDRLInfo = async (key) => {
  const url = `import/studentInfo/importDRLInfo?key=${key}`;

  const response = await HttpClient.sendGet(url);

  return response;
};


export const ImportDRLInfo = async (value) => {
  const {key, startStudentID, endStudentID, nh, hk} = value;
  const url = `import/studentInfo/confirm?key=${key}&importType=2&startStudentID=${startStudentID}&endStudentID=${endStudentID}&nh=${nh}&hk=${hk}`;

  const response = await HttpClient.sendPostWithParams(url);

  return response;
};

export const GetImportStatus = async () => {
  const url = `import/studentInfo/getDRLResultLog`;

  const response = await HttpClient.sendGet(url);

  return response;
};


/* Import QLLT */
export const GetImportQLLTInfo = async (importCase, key) => {
  let url = null;
  importCase === 2 ? url = `ttluutru/ktx/import?key=${key}` : url = `ttluutru/all/import?key=${key}`;

  const response = await HttpClient.sendGet(url);

  return response;
};

export const ImportQLLTInfo = async (importCase, value) => {
  let url = null;
  importCase === 2 ? url = `ttluutru/ktx/import` : url = `ttluutru/all/import`;
  logger.info('ImportDialog:: value: ', value);
  const response = await HttpClient.sendPost(url, value);

  return response;
};

export const GetImportStatusQLLT = async (key) => {
  const url = `ttluutru/getLog?key=${key}`;
 
  const response = await HttpClient.sendGet(url);

  return response;
};

/* Import TTSV */
// const convertType = ttsvCase => {
//   switch (ttsvCase) {
//     case 1:
//         return 'NN';
//       case 2:
//         return 'DiemTrungBinh';
//       case 3:
//         return 'TotNghiep';
//       case 4:
//         return 'HTCT';
//       case 5:
//         return 'DangHoc';
//       case 6:
//         return 'CanhCaoHV';
//       case 7:
//         return 'BuocThoiHoc';
//       case 8:
//         return 'BaoLuu';
//       case 9:
//         return 'DKHP';
//       default:
//         return '';
//   }
// };

export const GetImportTTSVInfo = async (ttsvCase, key) => {
  // const type = convertType(ttsvCase);

  const url = `tthocvu/process-import?type=${ttsvCase}&key=${key}`;
  logger.info('ImportDialog:: url: ', url);

  const response = await HttpClient.sendGet(url);

  return response;
};

export const ImportTTSVInfo = async (ttsvCase, value) => {
  const url = `/tthocvu/process-import`;
  // const type = convertType(ttsvCase);
  // value.type = ttsvCase;
  logger.info('ImportDialog:: value: ', value);
  const response = await HttpClient.sendPost(url, value);

  return response;
};

export const GetImportStatusTTSV = async (key) => {
  const url = `ttluutru/getLog?key=${key}`;
 
  const response = await HttpClient.sendGet(url);

  return response;
};