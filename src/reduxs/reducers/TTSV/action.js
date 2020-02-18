import * as TTSVHandler from 'handlers/TTSVHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const parseNHToNumber = nh => {
  switch (nh) {
    case '2016-2017':
      return 1;
    case '2017-2018':
      return 2;
    case '2018-2019':
      return 3;
    case '2019-2020':
      return 4;
    default:
      return 5;
  }
};

const getListWithFilter = filter => async dispatch => {
  const response = await TTSVHandler.GetListWithFilter(filter);
  logger.info('TTSVAction:: getListAll: reponse: ', response);
  const { type } = filter;
  const data = Object.keys(response).map(key => {
    response[key].nh = parseNHToNumber(response[key].NamHoc);
    return response[key];
  });
  switch (type) {
    case 'SinhVienNuocNgoai':
      dispatch({ type: Types.GET_LIST_SVNN, payload: data });
      break;
    case 'DiemTrungBinh':
      dispatch({ type: Types.GET_LIST_DTB, payload: data });
      break;
    case 'TotNghiep':
      dispatch({ type: Types.GET_LIST_DSTN, payload: data });
      break;
    case 'HoanTatChuongTrinh':
      dispatch({ type: Types.GET_LIST_HTCT, payload: data });
      break;
    case 'DangHoc':
      dispatch({ type: Types.GET_LIST_DH, payload: data });
      break;
    case 'CanhCaoHocVu':
      dispatch({ type: Types.GET_LIST_CCHV, payload: data });
      break;
    case 'BuocThoiHoc':
      dispatch({ type: Types.GET_LIST_BTH, payload: data });
      break;
    case 'DangKyHocPhan':
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
