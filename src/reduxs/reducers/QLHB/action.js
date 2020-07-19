import * as QLHBHandler from 'handlers/QLHBHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';
import { HIDE_PROGRESS } from '../LinearProgress/ActionTypes';

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

const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const changeCountingColumns = () => async dispatch => {
  dispatch({type: Types.TK});
  history.push('/qlhb');
};

const getListWithFilter = (filter, type) => async dispatch => {
  const response = await QLHBHandler.GetListWithFilter(filter, type);
  logger.info('QLHBAction:: getListAll: reponse: ', response);
  if (response === null ||response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_NULL_DATA});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  const { body } = response;
  const data = Object.keys(body).map(key => {
    if (body[key].type === 'KK') {
      const { SoTienMoiThang, SoThang } = body[key];
      const money = SoTienMoiThang.split('.').join('');
      body[key].SoTienMoiThang = formatNumber(SoTienMoiThang);
      body[key].TongSoTien = formatNumber(parseFloat(money)*parseInt(SoThang));
    }
    else {
      const { GiaTri } = body[key];
      // const money = GiaTri.split('.').join('');
      body[key].GiaTri = formatNumber(GiaTri);
    }
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].id = body[key].id ? body[key].id : '';
    return body[key];
  });
  if (type === "KK")
    dispatch({ type: Types.GET_DATA_HBKK, payload: data });
  else
    dispatch({ type: Types.GET_DATA_HBTT, payload: data });

  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlhb');
  return data;
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
  if (response === null || response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_COUNTING, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;
  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].TongSoTien = formatNumber(body[key].TongSoTien);
    body[key].type = body[key].type === 'TT' ? 'Tài trợ' : 'Khuyến khích';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_COUNTING, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlhb');
  return data;
};

const countingWithLoaiHB = (filter) => async dispatch => {
  const response = await QLHBHandler.CountingWithLoaiHB(filter);
  logger.info('QLHBAction:: CountingWithFilter: reponse: ', response);
  if (response === null ||response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_COUNTING, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].TongSoTien = formatNumber(body[key].TongSoTien);
    body[key].type = body[key].type === 'TT' ? 'Tài trợ' : 'Khuyến khích';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_COUNTING, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlhb');
  return data;
};

const countingWithDoiTuong = (filter) => async dispatch => {
  const response = await QLHBHandler.CountingWithDoiTuong(filter);
  logger.info('QLHBAction:: CountingWithFilter: reponse: ', response);
  if (response === null ||response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_COUNTING, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].TongSoTien = formatNumber(body[key].TongSoTien);
    body[key].type = body[key].type === 'TT' ? 'Tài trợ' : 'Khuyến khích';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_COUNTING, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlhb');
  return data;
};

const countingWithDVTT = (filter) => async dispatch => {
  const response = await QLHBHandler.CountingWithDVTT(filter);
  logger.info('QLHBAction:: CountingWithFilter: reponse: ', response);
  if (response === null ||response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_COUNTING, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    body[key].TongSoTien = formatNumber(body[key].TongSoTien);
    body[key].type = body[key].type === 'TT' ? 'Tài trợ' : 'Khuyến khích';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_COUNTING, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/qlhb');
  return data;
};

const exportCountingWithMSSV = (filter) => async dispatch => {
  logger.info('QLHBAction:: filter: filter: ', filter);

  const response = await QLHBHandler.ExportCountingWithMSSV(filter);
  logger.info('QLHBAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qlhb');
  }
};

const exportCountingWithLoaiHB = (filter) => async dispatch => {
  logger.info('QLHBAction:: filter: filter: ', filter);

  const response = await QLHBHandler.ExportCountingWithLoaiHB(filter);
  logger.info('QLHBAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qlhb');
  }
};

const exportCountingWithDoiTuong = (filter) => async dispatch => {
  logger.info('QLHBAction:: filter: filter: ', filter);

  const response = await QLHBHandler.ExportCountingWithDoiTuong(filter);
  logger.info('QLHBAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qlhb');
  }
};

const exportCountingWithDVTT = (filter) => async dispatch => {
  logger.info('QLHBAction:: filter: filter: ', filter);

  const response = await QLHBHandler.ExportCountingWithDVTT(filter);
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
  return payload;
};

export default {
  getListWithFilter,
  exportWithFilter,
  deleteOneCertificate,
  getDataFilter,
  changeCountingColumns,
  countingWithMSSV,
  countingWithLoaiHB,
  countingWithDoiTuong,
  countingWithDVTT,
  exportCountingWithMSSV,
  exportCountingWithLoaiHB,
  exportCountingWithDoiTuong,
  exportCountingWithDVTT
};
