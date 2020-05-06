import * as TTSVHandler from 'handlers/TTSVHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const parseNHToNumber = nh => {
  const dt = new Date();
  const year = dt.getFullYear();

  switch (nh) {
    case `${(year - 6)}-${(year - 5)}`:
      return 1;
    case `${(year - 5)}-${(year - 4)}`:
      return 2;
    case `${(year - 4)}-${(year - 3)}`:
      return 3;
    case `${(year - 3)}-${(year - 2)}`:
      return 4;
    case `${(year - 2)}-${(year - 1)}`:
      return 5;
    case `${(year - 1)}-${year}`:
          return 6;      
    default:
      return 7;
  }
};

const getListWithFilter = filter => async dispatch => {
  const response = await TTSVHandler.GetListWithFilter(filter);
  logger.info('TTSVAction:: getListAll: reponse: ', response);
  const { type } = filter;
  const data = Object.keys(response).map(key => {
    response[key].NamHoc = parseNHToNumber(response[key].NamHoc);
    response[key].type = response[key]["data"].LoaiTotNghiep;
    response[key].month = response[key]["data"].DotThang;
    response[key].DTB = response[key]["data"].DTB;
    response[key].note = response[key]["data"].GhiChu;
    return response[key];
  });
  
  switch (type) {
    case 'Sinh viên nước ngoài':
      dispatch({ type: Types.GET_LIST_SVNN, payload: data });
      break;
    case 'Điểm trung bình':
      dispatch({ type: Types.GET_LIST_DTB, payload: data });
      break;
    case 'Tốt nghiệp':
      dispatch({ type: Types.GET_LIST_DSTN, payload: data });
      break;
    case 'Hoàn tất chương trình':
      dispatch({ type: Types.GET_LIST_HTCT, payload: data });
      break;
    case 'Đang học':
      dispatch({ type: Types.GET_LIST_DH, payload: data });
      break;
    case 'Cảnh cáo học vụ':
      dispatch({ type: Types.GET_LIST_CCHV, payload: data });
      break;
    case 'Buộc thôi học':
      dispatch({ type: Types.GET_LIST_BTH, payload: data });
      break;
    case 'Đăng ký học phần':
      dispatch({ type: Types.GET_LIST_DKHP, payload: data });
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
  // updateOneStudentByType
  exportWithFilter
};
