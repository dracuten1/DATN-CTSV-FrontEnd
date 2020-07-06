import * as TTSVHandler from 'handlers/TTSVHandler';
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


const changeColumnMSSV = () => async dispatch => {
    dispatch({ type: Types.MSSV });
}

const getListWithMSSV = filter => async dispatch => {
  logger.info('TTSVAction:: getListAll: filter: ', filter);
  const response = await TTSVHandler.GetListWithMSSV(filter);
  logger.info('TTSVAction:: getListAll: reponse: ', response);
  const {statusCode, body} = response;
  if (statusCode !== 200 || body === "Không có dữ liệu"){
    dispatch({ type: Types.GET_TTSV_WITH_MSSV, payload: [] });
    dispatch({ type: HIDE_PROGRESS });
    return [];
  } 

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NamHoc);
    body[key].GhiChu = body[key]["data"].GhiChu;
    return body[key];
  });
  dispatch({ type: Types.GET_TTSV_WITH_MSSV, payload: data });
  history.push('/ttsv');
  dispatch({ type: HIDE_PROGRESS });
  return data;
};

const getListWithFilter = filter => async dispatch => {
  logger.info('TTSVAction:: getListAll: filter: ', filter);
  const response = await TTSVHandler.GetListWithFilter(filter);
  logger.info('TTSVAction:: getListAll: reponse: ', response);
  const { type } = filter;
  const {statusCode, body} = response;
  if (statusCode !== 200 || body === "Không có dữ liệu"){
    switch (type) {
      case 'SINH VIÊN NƯỚC NGOÀI':
        dispatch({ type: Types.GET_LIST_SVNN, payload: [] });
        break;
      case 'ĐIỂM TRUNG BÌNH':
        dispatch({ type: Types.GET_LIST_DTB, payload: [] });
        break;
      case 'TỐT NGHIỆP':
        dispatch({ type: Types.GET_LIST_DSTN, payload: [] });
        break;
      case 'HOÀN TẤT CHƯƠNG TRÌNH':
        dispatch({ type: Types.GET_LIST_HTCT, payload: [] });
        break;
      case 'ĐANG HỌC':
        dispatch({ type: Types.GET_LIST_DH, payload: [] });
        break;
      case 'CẢNH CÁO HỌC VỤ':
        dispatch({ type: Types.GET_LIST_CCHV, payload: [] });
        break;
      case 'BUỘC THÔI HỌC':
        dispatch({ type: Types.GET_LIST_BTH, payload: [] });
        break;
      case 'ĐĂNG KÝ HỌC PHẦN':
        dispatch({ type: Types.GET_LIST_DKHP, payload: [] });
        break;
      case 'BẢO LƯU':
        dispatch({ type: Types.GET_LIST_BL, payload: [] });
        break;  
      default:
        break;
    }
    dispatch({ type: HIDE_PROGRESS });
    return [];
  } 
  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NamHoc);
    body[key].type = body[key]["data"].LoaiTotNghiep;
    body[key].month = body[key]["data"].DotThang;
    body[key].DTB = body[key]["data"].DTB;
    body[key].GhiChu = body[key]["data"].GhiChu;
    body[key].MaMonHoc = body[key]["data"].MaMonHoc;
    body[key].TenMonHoc = body[key]["data"].TenMonHoc;
    body[key].Lop = body[key]["data"].Lop;
    body[key].Nhom = body[key]["data"].Nhom;
    body[key].LyDo = body[key]["data"].LyDo;
    body[key].DonViDeCu = body[key]["data"].DonViDeCu;
    body[key].NgayCap = body[key]["data"].NgayCap;
    body[key].NoiDen = body[key]["data"].NoiDen;
    body[key].SoQuyetDinh = body[key]["data"].SoQuyetDinh;
    body[key].TenChuongTrinh = body[key]["data"].TenChuongTrinh;
    body[key].TheLoai = body[key]["data"].TheLoai;
    body[key].ThoiGianThamDu = body[key]["data"].ThoiGianThamDu;
    body[key].KinhPhi = body[key]["data"].KinhPhi;

    if (type === 'BUỘC THÔI HỌC')
    {
    body[key].DTB1 = body[key].DTB[0].Diem + ' - HK' + body[key].DTB[0].HK + '/' + body[key].DTB[0].NH;
    body[key].DTB2 = body[key].DTB[1].Diem + ' - HK' + body[key].DTB[1].HK + '/' + body[key].DTB[1].NH;
    }
    if (type === 'CẢNH CÁO HỌC VỤ')
    {
    body[key].DTB1 = body[key]["data"].DTB1;
    body[key].DTB2 = body[key]["data"].DTB2;
    }
    if (type === 'BẢO LƯU')
    {
      body[key].Start = 'HK' + body[key]["data"]["Tu"].HK + '/' + body[key]["data"]["Tu"].NH;
      body[key].Finish = 'HK' + body[key]["data"]["Den"].HK + '/' + body[key]["data"]["Den"].NH;
      body[key].Submit = 'HK' + body[key]["data"]["ThoiDiemNopDon"].HK + '/' + body[key]["data"]["ThoiDiemNopDon"].NH;
    }
    return body[key];
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
  dispatch({ type: HIDE_PROGRESS });
  return data;
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
  changeColumnMSSV,
  // updateOneStudentByType
  exportWithFilter
};
