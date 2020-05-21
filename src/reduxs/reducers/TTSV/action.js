import * as TTSVHandler from 'handlers/TTSVHandler';
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
  logger.info('TTSVAction:: getListAll: filter: ', filter);
  const response = await TTSVHandler.GetListWithFilter(filter);
  logger.info('TTSVAction:: getListAll: reponse: ', response);
  const data = Object.keys(response).map(key => {
    response[key].nh = parseNHToNumber(response[key]["data"].NH);
    response[key].note = response[key]["data"].GhiChu;
    return response[key];
  });
  dispatch({ type: Types.GET_TTSV_WITH_MSSV, payload: data });
  history.push('/ttsv');
};

const getListWithFilter = filter => async dispatch => {
  logger.info('TTSVAction:: getListAll: filter: ', filter);
  const response = await TTSVHandler.GetListWithFilter(filter);
  logger.info('TTSVAction:: getListAll: reponse: ', response);
  const { type } = filter;
  const data = Object.keys(response).map(key => {
    response[key].nh = parseNHToNumber(response[key]["data"].NH);
    response[key].type = response[key]["data"].LoaiTotNghiep;
    response[key].month = response[key]["data"].DotThang;
    response[key].DTB = response[key]["data"].DTB;
    response[key].note = response[key]["data"].GhiChu;
    response[key].MaMonHoc = response[key]["data"].MaMonHoc;
    response[key].TenMonHoc = response[key]["data"].TenMonHoc;
    response[key].Lop = response[key]["data"].Lop;
    response[key].Nhom = response[key]["data"].Nhom;
    if (type === 'BẢO LƯU')
    {
      response[key].Start = 'HK' + response[key]["data"]["Tu"].HK + '/' + response[key]["data"]["Tu"].NH;
      response[key].Finish = 'HK' + response[key]["data"]["Den"].HK + '/' + response[key]["data"]["Den"].NH;
      response[key].Submit = 'HK' + response[key]["data"]["ThoiDiemNopDon"].HK + '/' + response[key]["data"]["ThoiDiemNopDon"].NH;
    }
    return response[key];
  });
  
  switch (type) {
    case 'SINH VIÊN NƯỚC NGOÀI':
      dispatch({ type: Types.GET_LIST_SVNN, payload: data });
      break;
    case 'ĐIỂM TRUNG BÌNH':
      dispatch({ type: Types.GET_LIST_DTB, payload: data });
      break;
    case 'TỐT NGHIỆP':
      dispatch({ type: Types.GET_LIST_DSTN, payload: data });
      break;
    case 'HOÀN TẤT CHƯƠNG TRÌNH':
      dispatch({ type: Types.GET_LIST_HTCT, payload: data });
      break;
    case 'ĐANG HỌC':
      dispatch({ type: Types.GET_LIST_DH, payload: data });
      break;
    case 'CẢNH CÁO HỌC VỤ':
      dispatch({ type: Types.GET_LIST_CCHV, payload: data });
      break;
    case 'BUỘC THÔI HỌC':
      dispatch({ type: Types.GET_LIST_BTH, payload: data });
      break;
    case 'ĐĂNG KÝ HỌC PHẦN':
      dispatch({ type: Types.GET_LIST_DKHP, payload: data });
      break;
    case 'BẢO LƯU':
      dispatch({ type: Types.GET_LIST_BL, payload: data });
      break;  
    default:
      break;
  }
  history.push('/ttsv');
};

// const updateOneStudentByType = (data, type) => async dispatch => {
//   const response = await TTSVHandler.UpdateOneStudentByType(data, type);
//   logger.info('TTSVAction:: update: reponse: ', response);
//   dispatch({ type: Types.UPDATE_STUDENT });
//   history.push('/qllt');
// };

const exportWithFilter = (filter) => async dispatch => {
  logger.info('TTSVAction:: filter: filter: ', filter);

  const response = await TTSVHandler.ExportWithFilter(filter);
  logger.info('TTSVAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
  }
  history.push('/ttsv');
};

export default {
  getListWithFilter,
  getListWithMSSV,
  // updateOneStudentByType
  exportWithFilter
};
