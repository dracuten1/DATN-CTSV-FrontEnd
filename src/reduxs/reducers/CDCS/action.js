import * as CDCSHanlder from 'handlers/CDCSHandler';
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

const getListWithMSSV = filter => async dispatch => {
  logger.info('CDCSAction:: getListAll: filter: ', filter);
  const response = await CDCSHanlder.CountingWithMSSV(filter);
  logger.info('CDCSAction:: getListAll: reponse: ', response);
  const data = Object.keys(response).map(key => {
    response[key].nh = parseNHToNumber(response[key]["DuLieu"].NH);
    response[key].hk              = response[key]["DuLieu"].hk;
    response[key].GhiChu = response[key]["DuLieu"].GhiChu;
    response[key].DoiTuong        = response[key]["DuLieu"].DoiTuong;
    if (response[key]["DuLieu"].TongTien)     response[key].TongTien        = response[key]["DuLieu"].TongTien;
    if (response[key]["DuLieu"].KinhPhi)      response[key].TongTien        = response[key]["DuLieu"].KinhPhi;
    if (response[key]["DuLieu"].ThanhTien)    response[key].TongTien        = response[key]["DuLieu"].ThanhTien;
    if (response[key]["DuLieu"].SoTien)       response[key].TongTien        = response[key]["DuLieu"].SoTien;
    response[key].DoiTuong        = response[key]["DuLieu"].DoiTuong;
    response[key].MSSV            = response[key]["DuLieu"].MSSV;
    response[key].HoTen           = response[key]["DuLieu"].HoTen;

    return response[key];
  });
  dispatch({ type: Types.GET_LIST_MSSV, payload: data });
  history.push('/cdcs');
};

const getListWithFilter = filter => async dispatch => {
  logger.info('CDCSAction:: getListAll: filter: ', filter);
  const response = await CDCSHanlder.CountingWithFilter(filter);
  logger.info('CDCSAction:: getListAll: reponse: ', response);
  
  if (response.statusCode !== 200 || response.body === "Không có dữ liệu")  return;
  
  const { typeCDCS } = filter;
  const data = Object.keys(response).map(key => {
    response[key].nh              = parseNHToNumber(response[key]["DuLieu"].NH);
    response[key].hk              = response[key]["DuLieu"].hk;
    response[key].ChiNhanh        = response[key]["DuLieu"].ChiNhanh;
    response[key].MucHB           = response[key]["DuLieu"].MucHB;
    response[key].NganHang        = response[key]["DuLieu"].NganHang;
    response[key].MucHoTroCPPT    = response[key]["DuLieu"].MucHoTroCPPT;
    response[key].TongTien        = response[key]["DuLieu"].TongTien;
    response[key].MSSV            = response[key]["DuLieu"].MSSV;
    response[key].DoiTuong        = response[key]["DuLieu"].DoiTuong;
    response[key].SoTK            = response[key]["DuLieu"].SoTK;
    response[key].GhiChu          = response[key]["DuLieu"].GhiChu;
    response[key].HoTen           = response[key]["DuLieu"].HoTen;
    response[key].CMND            = response[key]["DuLieu"].CMND;
    response[key].SoThang         = response[key]["DuLieu"].SoThang;
    response[key].MucHoTro        = response[key]["DuLieu"].MucHoTro;
    response[key].KinhPhi         = response[key]["DuLieu"].KinhPhi;
    response[key].MucGiamHP       = response[key]["DuLieu"].MucGiamHP;
    response[key].MucTroCap       = response[key]["DuLieu"].MucTroCap;
    response[key].ThanhTien       = response[key]["DuLieu"].ThanhTien;
    response[key].SoTien          = response[key]["DuLieu"].SoTien;

    return response[key];
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
};

const getDataFilter = () => async dispatch => {
  const payload = await CDCSHanlder.GetDataFilter();

  logger.info('CDCSAction:: GET_DATA_FILTER: reponse: ', payload);

  dispatch({ type: Types.GET_DATA_FILTER, payload });
  history.push('/cdcs');
};


export default {
  getListWithFilter,
  getListWithMSSV,
  getDataFilter
};
