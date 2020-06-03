import * as HttpClient from 'core/services/HttpClient';
import * as HttpClient2 from 'core/services/HttpClient2';
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
      return nh;
  }
};

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const GetListWithFilter = async (filter, type) => {
    filter.nh     = convertNamHoc(filter.nh);
    logger.info('QLHBHandler:: getListAll: filter: ', filter, type);
    const url     = `hb/list?type=${type}&nh=${filter.nh}&hk=${filter.hk}`;
    const response = await HttpClient.sendGet(url);
    return response;
};

export const UpdateOneStudentByType = async (data, type) => {
    const url = `hb/list`;

    if (type === 'KK'){
      const {SoTienMoiThang, SoThang} = data;
      const money = SoTienMoiThang.split('.').join('');
      data.TongSoTien = formatNumber(parseFloat(money)*parseInt(SoThang));
      data.SoTienMoiThang = formatNumber(SoTienMoiThang);
    }
    
    data.type = type;

    const response = await HttpClient.sendPostGetData(url, data);
    logger.info('QLHBHandler: response', response); 
    return response;
};

export const DeleteOneCertificate = async (PK, SK, type, id) => {
  const url = `hb/list`;
  logger.info('QLHBHandler: ', PK, SK, type, id);
  const response = type === 'TT' ? await HttpClient.sendPatchWithBody(url, { PK, SK, type, id }) : await HttpClient.sendPatchWithBody(url, { PK, SK, type });
  logger.info('QLHBHandler: response', response);
  return response;
};

export const ExportWithFilter = async (filter, type) => {
    const {nh, hk}  = filter;
    const cvNH = convertNamHoc(nh);

    const url = `hb/list?nh=${cvNH}&hk=${hk}&type=${type}`;

    const response = await HttpClient.sendPutGetStatus(url);

    return response;
};

export const CountingWithMSSV = async (filter) => {
  const {fromHK, fromNH, toHK, toNH, mssv}  = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  
  const url = `hb/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendGet(url);

  return response;
};

export const GetDataFilter = async () => {
  const url = `hb/common`;

  const response = await HttpClient2.sendGetData(url);

  return response;
};

export const ExportCountingWithMSSV = async (filter) => {
  const {fromHK, fromNH, toHK, toNH, mssv, LoaiHB, DoiTuong, DonViTaiTro}  = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  
  const url = `hb/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&LoaiHB=${LoaiHB}&DonViTaiTro=${DonViTaiTro}&DoiTuong=${DoiTuong}`;
  logger.info('QLHBHanlder:: CountingWithFilter: url: ', url);

  const response = await HttpClient2.sendPutGetStatus(url);

  return response;
};