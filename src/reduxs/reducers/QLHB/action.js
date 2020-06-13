import * as QLHBHandler from 'handlers/QLHBHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const parseNHToNumber = nh => {
  const dt = new Date();
  const year = dt.getFullYear();
  const convert = year % 100;

  switch (nh) {
    case `${(convert - 6)}-${(convert - 5)}`:
      return 1;
    case `${(convert - 5)}-${(convert - 4)}`:
      return 2;
    case `${(convert - 4)}-${(convert - 3)}`:
      return 3;
    case `${(convert - 3)}-${(convert - 2)}`:
      return 4;
    case `${(convert - 2)}-${(convert - 1)}`:
      return 5;
    case `${(convert - 1)}-${convert}`:
          return 6;      
    default:
      return 7;
  }
};
const changeCountingColumns = () => async dispatch => {
    dispatch({type: Types.TK});

  history.push('/qlhb');
};

const getListWithFilter = (filter, type) => async dispatch => {
  const response = await QLHBHandler.GetListWithFilter(filter, type);
  logger.info('QLHBAction:: getListAll: reponse: ', response);
  if (response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_NULL_DATA});
    return;
  }  
  const { body } = response;
  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].ID = body[key].ID ? body[key].ID : '';
    return body[key];
  });
  if (type === "KK")
    dispatch({ type: Types.GET_DATA_HBKK, payload: data });
  else
    dispatch({ type: Types.GET_DATA_HBTT, payload: data });

  history.push('/qlhb');
};

const exportWithFilter = (filter, type) => async dispatch => {
  logger.info('QLHBAction:: filter: filter: ', filter, type);

  const response = await QLHBHandler.ExportWithFilter(filter, type);
  logger.info('QLHBAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qlhb');
  }
};

const deleteOneCertificate = (PK, SK, type, id) => async dispatch => {
  const response = await QLHBHandler.DeleteOneCertificate(PK, SK, type, id);

  logger.info('QLHBAction:: deleteOneCertificate: reponse: ', response);

  dispatch({ type: Types.DELETE_ONE_CERTIFICATE, payload: null });
  history.push('/qlhb');
};

const countingWithMSSV = (filter) => async dispatch => {
  const response = await QLHBHandler.CountingWithMSSV(filter);

  logger.info('QLHBAction:: CountingWithMSSV: reponse: ', response);
  if (response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_NULL_DATA});
    return;
  }  
  
  const { body } = response;
  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].type = body[key].type === 'TT' ? 'Tài trợ' : 'Khuyến khích';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_TKMSSV, payload: data });
  history.push('/qlhb');
};

const countingWithFilter = (filter) => async dispatch => {
  const {LoaiHB, DoiTuong, DonViTaiTro}  = filter;

  const response = await QLHBHandler.CountingWithMSSV(filter);
  logger.info('QLHBAction:: CountingWithFilter: reponse: ', response);
  if (response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_NULL_DATA});
    return;
  }  
  
  const { body } = response;

  const arrLoaiHB   = [];
  const arrDoiTuong = [];
  const arrDVTT     = [];

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].type = body[key].type === 'TT' ? 'Tài trợ' : 'Khuyến khích';
    if (body[key].LoaiHB        === LoaiHB)    arrLoaiHB.push(body[key]);
    if (body[key].DoiTuong      === DoiTuong)  arrDoiTuong.push(body[key]);
    if (body[key].DonViTaiTro   === DonViTaiTro) arrDVTT.push(body[key]);
    return body[key];
  });

  if (LoaiHB !== ''){
    dispatch({ type: Types.GET_DATA_COUNTING, payload: arrLoaiHB });
  }else if (DoiTuong !== ''){
    dispatch({ type: Types.GET_DATA_COUNTING, payload: arrDoiTuong });
  }else if (DonViTaiTro !== ''){
    dispatch({ type: Types.GET_DATA_COUNTING, payload: arrDVTT });
  }else{
    dispatch({ type: Types.GET_NULL_DATA });
  }

  history.push('/qlhb');
};

const exportCountingWithFilter = (filter) => async dispatch => {
  logger.info('QLHBAction:: filter: filter: ', filter);

  const response = await QLHBHandler.ExportCountingWithMSSV(filter);
  logger.info('QLHBAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qlhb');
  }
};

const getDataFilter = () => async dispatch => {
  const payload = await QLHBHandler.GetDataFilter();

  logger.info('QLHBAction:: deleteOneCertificate: reponse: ', payload);

  dispatch({ type: Types.GET_DATA_FILTER, payload });
  history.push('/qlhb');
};

export default {
  getListWithFilter,
  exportWithFilter,
  deleteOneCertificate,
  countingWithMSSV,
  getDataFilter,
  changeCountingColumns,
  countingWithFilter,
  exportCountingWithFilter
};
