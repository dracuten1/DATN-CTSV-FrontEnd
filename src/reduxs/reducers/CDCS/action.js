import * as CDCSHanlder from 'handlers/CDCSHandler';
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

const changeCountingColumnsCounting = () => async dispatch => {
  dispatch({ type: Types.TK});
  dispatch({ type: HIDE_PROGRESS });
};

const changeCountingColumnsList = () => async dispatch => {
  dispatch({ type: Types.DS});
  dispatch({ type: HIDE_PROGRESS });
};

const countingWithMSSV = filter => async dispatch => {
  logger.info('CDCSAction:: getListAll: filter: ', filter);
  const response = await CDCSHanlder.CountingWithMSSV(filter);
  logger.info('CDCSAction:: getListAll: reponse: ', response);

  if (response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_NULL_DATA});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;
  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key]["DuLieu"].NH);
    body[key].hk              = body[key]["DuLieu"].HK;
    body[key].GhiChu = body[key]["DuLieu"].GhiChu;
    body[key].DoiTuong        = body[key]["DuLieu"].DoiTuong;
    if (body[key]["DuLieu"].TongTien)     body[key].TongTien        = body[key]["DuLieu"].TongTien;
    if (body[key]["DuLieu"].KinhPhi)      body[key].TongTien        = body[key]["DuLieu"].KinhPhi;
    if (body[key]["DuLieu"].ThanhTien)    body[key].TongTien        = body[key]["DuLieu"].ThanhTien;
    if (body[key]["DuLieu"].SoTien)       body[key].TongTien        = body[key]["DuLieu"].SoTien;
    body[key].MSSV            = body[key]["DuLieu"].MSSV;
    body[key].HoTen           = body[key]["DuLieu"].HoTen;

    return body[key];
  });
  dispatch({ type: Types.GET_LIST_MSSV, payload: data });
  history.push('/cdcs');
  dispatch({ type: HIDE_PROGRESS });
  return data;
};

const countingWithFilter = filter => async dispatch => {
  logger.info('CDCSAction:: getListAll: filter: ', filter);
  const response = await CDCSHanlder.CountingWithFilter(filter);
  logger.info('CDCSAction:: getListAll: reponse: ', response);
  
  const { typeCDCS }  = filter;
  const { body }      = response;

  if (response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    switch (typeCDCS) {
      case 'DTTS':
        dispatch({ type: Types.GET_LIST_DTTS, payload: [] });
        break;
      case 'HTDX':
        dispatch({ type: Types.GET_LIST_HTDX, payload: [] });
        break;
      case 'TCXH':
        dispatch({ type: Types.GET_LIST_TCXH, payload: [] });
        break;
      case 'MGHP':
        dispatch({ type: Types.GET_LIST_MGHP, payload: [] });
        break;
      case 'SVKT':
        dispatch({ type: Types.GET_LIST_SVKT, payload: [] });
        break;
      default:
        break;
    }
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }
  
  const data = Object.keys(body).map(key => {
    body[key].nh              = parseNHToNumber(body[key]["DuLieu"].NH);
    body[key].hk              = body[key]["DuLieu"].HK;
    body[key].ChiNhanh        = body[key]["DuLieu"].ChiNhanh;
    body[key].ChiNhanh        = body[key]["DuLieu"].ChiNhanh;
    body[key].NTNS            = body[key]["DuLieu"].NTNS;
    body[key].DanToc          = body[key]["DuLieu"].DanToc;
    body[key].MucHB           = body[key]["DuLieu"].MucHB;
    body[key].NganHang        = body[key]["DuLieu"].NganHang;
    body[key].MucHoTroCPPT    = body[key]["DuLieu"].MucHoTroCPPT;
    body[key].TongTien        = body[key]["DuLieu"].TongTien;
    body[key].MSSV            = body[key]["DuLieu"].MSSV;
    body[key].DoiTuong        = body[key]["DuLieu"].DoiTuong;
    body[key].SoTK            = body[key]["DuLieu"].SoTK;
    body[key].GhiChu          = body[key]["DuLieu"].GhiChu;
    body[key].HoTen           = body[key]["DuLieu"].HoTen;
    body[key].CMND            = body[key]["DuLieu"].CMND;
    body[key].SoThang         = body[key]["DuLieu"].SoThang;
    body[key].MucHoTro        = body[key]["DuLieu"].MucHoTro;
    body[key].KinhPhi         = body[key]["DuLieu"].KinhPhi;
    body[key].MucGiamHP       = body[key]["DuLieu"].MucGiamHP;
    body[key].MucTroCap       = body[key]["DuLieu"].MucTroCap;
    body[key].ThanhTien       = body[key]["DuLieu"].ThanhTien;
    body[key].SoTien          = body[key]["DuLieu"].SoTien;

    return body[key];
  });
  
  switch (typeCDCS) {
    case 'DTTS':
      dispatch({ type: Types.GET_LIST_DTTS, payload: data });
      break;
    case 'HTDX':
      dispatch({ type: Types.GET_LIST_HTDX, payload: data });
      break;
    case 'TCXH':
      dispatch({ type: Types.GET_LIST_TCXH, payload: data });
      break;
    case 'MGHP':
      dispatch({ type: Types.GET_LIST_MGHP, payload: data });
      break;
    case 'SVKT':
      dispatch({ type: Types.GET_LIST_SVKT, payload: data });
      break;
    default:
      break;
  }
  history.push('/cdcs');
  dispatch({ type: HIDE_PROGRESS });
  return data;
};

const getDataFilter = () => async dispatch => {
  const payload = await CDCSHanlder.GetDataFilter();

  logger.info('CDCSAction:: GET_DATA_FILTER: reponse: ', payload);

  dispatch({ type: Types.GET_DATA_FILTER, payload });
  history.push('/cdcs');
};


export default {
  countingWithFilter,
  countingWithMSSV,
  getDataFilter,
  changeCountingColumnsCounting,
  changeCountingColumnsList
};
