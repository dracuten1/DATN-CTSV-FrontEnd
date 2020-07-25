import * as QLBHHandler from 'handlers/QLBHHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';
import { HIDE_PROGRESS } from '../LinearProgress/ActionTypes';

const parseNHToNumber = nh => {
  const dt = new Date();
  const year = dt.getFullYear();
  const convert = year % 100;

  switch (nh) {
    case `${convert - 6}-${convert - 5}`:
      return 1;
    case `${convert - 5}-${convert - 4}`:
      return 2;
    case `${convert - 4}-${convert - 3}`:
      return 3;
    case `${convert - 3}-${convert - 2}`:
      return 4;
    case `${convert - 2}-${convert - 1}`:
      return 5;
    case `${convert - 1}-${convert}`:
      return 6;
    default:
      return 7;
  }
};

const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const changeCountingColumns = () => async dispatch => {
  dispatch({ type: Types.TK });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlbh');
};

const getNullData = () => async dispatch => {
  dispatch({ type: Types.NO_DATA });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlbh');
};

const getListWithFilter = (filter, type) => async dispatch => {
  const response = await QLBHHandler.GetListWithFilter(filter, type);
  logger.info('QLBHAction:: getListAll: reponse: ', response);
  const { statusCode, body } = response;
  if (statusCode !== 200 || body === 'Không có dữ liệu') {
    dispatch({ type: Types.NO_DATA });
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }

  const { Items } = body;
  let data;
  if (type === 'YT') {
    data = Object.keys(Items).map(key => {
      Items[key].HoTen = Items[key].DuLieu.HoTen;
      Items[key].MSSV = Items[key].DuLieu.MSSV;
      Items[key].NTNS = Items[key].DuLieu.NTNS;
      Items[key].SoCMND = Items[key].DuLieu.SoCMND;
      Items[key].GioiTinh = Items[key].DuLieu.GioiTinhNu;
      Items[key].MaTinh = Items[key].DuLieu.MaSo.MaTinh;
      Items[key].MaBHXH = Items[key].DuLieu.MaSo.MaBHXH;
      Items[key].DoiTuong = Items[key].DuLieu.MaSo.DoiTuong;
      Items[key].MaBV = Items[key].DuLieu.NoiDKKCB.MaBV;
      Items[key].TenBV = Items[key].DuLieu.NoiDKKCB.TenBV;
      Items[key].DaNhan = Items[key].DuLieu.TinhTrangNhanThe.DaNhan;
      Items[key].NgayNhanThe = Items[key].DuLieu.TinhTrangNhanThe.Ngay;
      Items[key].HSDTu = Items[key].DuLieu.HSD.Tu;
      Items[key].HSDDen = Items[key].DuLieu.HSD.Den;
      Items[key].nh = parseNHToNumber(Items[key].DuLieu.NH);
      Items[key].HK = Items[key].DuLieu.HK;
      return Items[key];
    });
    dispatch({ type: Types.GET_DATA_BHYT, payload: data });
  } else if (type === 'TN') {
    data = Object.keys(Items).map(key => {
      Items[key].HoTen = Items[key].DuLieu.HoTen;
      Items[key].MSSV = Items[key].DuLieu.MSSV;
      Items[key].NTNS = Items[key].DuLieu.NTNS;
      Items[key].CongTyBH = Items[key].DuLieu.CongTyBH;
      Items[key].SoTienBH = formatNumber(Items[key].DuLieu.SoTienBH || 0);
      Items[key].HSDTu = Items[key].DuLieu.HSD.Tu;
      Items[key].HSDDen = Items[key].DuLieu.HSD.Den;
      Items[key].nh = parseNHToNumber(Items[key].DuLieu.NH);
      return Items[key];
    });
    dispatch({ type: Types.GET_DATA_BHTN, payload: data });
  } else {
    data = Object.keys(Items).map(key => {
      Items[key].HoTen = Items[key].DuLieu.HoTen;
      Items[key].MSSV = Items[key].DuLieu.MSSV;
      Items[key].CongTyBH = Items[key].DuLieu.CongTyBH;
      Items[key].SoTienBT = formatNumber(Items[key].DuLieu.SoTienBH || 0);
      Items[key].BiTaiNan = Items[key].DuLieu.BiTaiNan === 'x';
      Items[key].hk = Items[key].DuLieu.HK;
      Items[key].nh = parseNHToNumber(Items[key].DuLieu.NH);
      return Items[key];
    });
    dispatch({ type: Types.GET_DATA_TTBT, payload: data });
  }

  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlbh');
  return data;
};

const exportWithFilter = (filter, type) => async dispatch => {
  logger.info('QLBHAction:: filter: filter: ', filter, type);

  const response = await QLBHHandler.ExportWithFilter(filter, type);
  logger.info('QLBHAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qlbh');
  }
};

const deleteOneCertificate = (PK, SK, type) => async dispatch => {
  const response = await QLBHHandler.DeleteOneCertificate(PK, SK, type);

  logger.info('QLBHAction:: deleteOneCertificate: reponse: ', response);

  dispatch({ type: Types.DELETE_ONE_CERTIFICATE, payload: null });
  history.push('/qlbh');
};

const countingWithMSSV = filter => async dispatch => {
  const response = await QLBHHandler.CountingWithMSSV(filter);

  logger.info('QLBHAction:: CountingWithMSSV: reponse: ', response);
  const { statusCode, body } = response;
  if (statusCode !== 200 || body === 'Không có dữ liệu') {
    dispatch({ type: Types.NO_DATA });
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].SoTien =
      filter.type === 'BHTN' ? formatNumber(body[key].SoTienBH || 0) : formatNumber(body[key].SoTien || 0);
    body[key].CongTyBH = filter.type === 'BHYT' ? '' : body[key].CongTyBaoHiem;

    body[key].MaBV = filter.type === 'BHYT' ? body[key].NoiDKKCB.MaBV : '';
    body[key].TenBV = filter.type === 'BHYT' ? body[key].NoiDKKCB.TenBV : '';
    body[key].HSDTu = filter.type === 'BHYT' ? body[key].HSD.Tu : '';
    body[key].HSDDen = filter.type === 'BHYT' ? body[key].HSD.Den : '';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_COUNTING, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlbh');
  return data;
};

const exportCountingWithFilter = filter => async dispatch => {
  logger.info('QLBHAction:: filter: filter: ', filter);

  const response = await QLBHHandler.ExportCountingWithMSSV(filter);
  logger.info('QLBHAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qlbh');
  }
};

export default {
  getListWithFilter,
  exportWithFilter,
  deleteOneCertificate,
  countingWithMSSV,
  changeCountingColumns,
  exportCountingWithFilter,
  getNullData
};
