import * as HttpClient from 'core/services/HttpClient';
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
      return nh;
  }
};

export const GetListWithFilter = async (filter, type) => {
  const cvNH = convertNamHoc(filter.nh);
  const url = `hb/list?type=${type}&nh=${cvNH}&hk=${filter.hk}`;
  logger.info('QLHBHandler:: getListAll: URL: ', url);
  const response = await HttpClient.sendGetData(url);
  return response;
};

export const UpdateOneStudentByType = async (data, type) => {
  const url = `hb/list`;

  if (type === 'KK') {
    const { SoTienMoiThang, SoThang } = data;
    const money = SoTienMoiThang.split('.').join('');
    data.TongSoTien = parseFloat(money) * parseInt(SoThang);
    data.SoTienMoiThang = money;
  }
  else{
    const { GiaTri } = data;
    const money = GiaTri.split('.').join('');
    data.GiaTri = money;
  }

  data.type = type;

  const response = await HttpClient.sendPostGetData(url, data);
  logger.info('QLHBHandler: response', response);
  return response;
};

export const DeleteOneCertificate = async (PK, SK, type, id) => {
  const url = `hb/list`;
  logger.info('QLHBHandler: ', PK, SK, type, id);
  const response =
    type === 'TT'
      ? await HttpClient.sendPatchWithBody(url, { PK, SK, type, id })
      : await HttpClient.sendPatchWithBody(url, { PK, SK, type });
  logger.info('QLHBHandler: response', response);
  return response;
};

export const ExportWithFilter = async (filter, type) => {
  const { nh, hk } = filter;
  const cvNH = convertNamHoc(nh);

  const url = `hb/list?nh=${cvNH}&hk=${hk}&type=${type}`;

  const response = await HttpClient.sendPutGetStatus(url);

  return response;
};

export const CountingWithMSSV = async filter => {
  const {
    fromHK,
    fromNH,
    toHK,
    toNH,
    mssv
  } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);

  const url = `hb/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPatch(url);

  return response;
};

export const ExportCountingWithMSSV = async filter => {
  const {
    fromHK,
    fromNH,
    toHK,
    toNH,
    mssv
  } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);

  const url = `hb/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutGetStatus(url);
  logger.info('QLHBHanlder:: CountingWithFilter: response: ', response);

  return response;
};

export const CountingWithLoaiHB = async filter => {
  const {
    fromHK,
    fromNH,
    toHK,
    toNH,
    LoaiHB
  } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvLoaiHB = '';
  if (LoaiHB !== '')
    cvLoaiHB = LoaiHB === 'HBKK' ? 'KK' : 'TT';
  const url = `hb/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&LoaiHB=${cvLoaiHB}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPatch(url);

  return response;
};

export const ExportCountingWithLoaiHB = async filter => {
  const {
    fromHK,
    fromNH,
    toHK,
    toNH,
    LoaiHB
  } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvLoaiHB = '';
  if (LoaiHB !== '')
    cvLoaiHB = LoaiHB === 'HBKK' ? 'KK' : 'TT';
    
  const url = `hb/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&LoaiHB=${cvLoaiHB}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutGetStatus(url);
  logger.info('QLHBHanlder:: CountingWithFilter: response: ', response);

  return response;
};

export const CountingWithDoiTuong = async filter => {
  const {
    fromHK,
    fromNH,
    toHK,
    toNH,
    DoiTuong
  } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvDoiTuong  = DoiTuong;
  if (!Array.isArray(DoiTuong)){
    cvDoiTuong    = [DoiTuong];
  }

  const url = `hb/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPatchWithBody(url, {DoiTuong: cvDoiTuong});

  return response;
};

export const ExportCountingWithDoiTuong = async filter => {
  const {
    fromHK,
    fromNH,
    toHK,
    toNH,
    DoiTuong
  } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvDoiTuong  = DoiTuong;
  if (!Array.isArray(DoiTuong)){
    cvDoiTuong    = [DoiTuong];
  }
  const url = `hb/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutWithBodyGetStatus(url, {DoiTuong: cvDoiTuong});
  logger.info('QLHBHanlder:: CountingWithFilter: response: ', response);

  return response;
};

export const CountingWithDVTT = async filter => {
  const {
    fromHK,
    fromNH,
    toHK,
    toNH,
    DonViTaiTro
  } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  let cvDonViTaiTro  = DonViTaiTro;
  if (!Array.isArray(DonViTaiTro)){
    cvDonViTaiTro    = [DonViTaiTro];
  }
  const url = `hb/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPatchWithBody(url, {DonViTaiTro: cvDonViTaiTro});

  return response;
};

export const ExportCountingWithDVTT = async filter => {
  const {
    fromHK,
    fromNH,
    toHK,
    toNH,
    DonViTaiTro
  } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);

  const url = `hb/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutWithBodyGetStatus(url, {DonViTaiTro});
  logger.info('QLHBHanlder:: CountingWithFilter: response: ', response);

  return response;
};

export const GetDataFilter = async () => {
  const url = `hb/common`;

  const response = await HttpClient2.sendGetData(url);

  return response;
};
