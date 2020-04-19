import * as QLLTHandler from 'handlers/QLLTHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const parseNHToNumber = nh => {
  switch (nh) {
    case '16-17':
      return 1;
    case '17-18':
      return 2;
    case '18-19':
      return 3;
    case '19-20':
      return 4;
    default:
      return 5;
  }
};

const getAllListWithFilter = filter => async dispatch => {
  const response = await QLLTHandler.GetListWithFilter(filter);
  logger.info('QLLTAction:: getListAll: reponse: ', response);
  const data = Object.keys(response).map(key => {
    response[key].ktx = response[key]['Nội trú']['KTX'];
    if (response[key]['Nội trú']['Cập nhật Portal'] !== ''){
      response[key].portal =
        response[key]['Nội trú']['Cập nhật Portal'] === 'Đã cập nhật';
    }
    else{
      response[key].xnnt =
        response[key]['Xác nhận ngoại trú'] === 'Đã xác nhận';
    }
    response[key].nh = parseNHToNumber(response[key].NH);
      return response[key];
  });
  dispatch({ type: Types.GET_ALLLIST, payload: data });
  history.push('/qllt');
};

const getKtxListWithFilter = filter => async dispatch => {
  const response = await QLLTHandler.GetListWithFilter(filter);
  logger.info('QLLTAction:: getListKTX: reponse: ', response);
  const data = Object.keys(response).map(key => {
    response[key].nh =parseNHToNumber(response[key].NH);
      return response[key];
  });  
  dispatch({ type: Types.GET_KTX_LIST, payload: data });
  history.push('/qllt');
};

const updateOneStudentByType = (data, type) => async dispatch => {
  const response = await QLLTHandler.UpdateOneStudentByType(data,type);
  logger.info('QLLTAction:: update: reponse: ', response);
  dispatch({ type: Types.UPDATE_STUDENT});
  history.push('/qllt');
};

// const exportWithFilter = (filter) => async dispatch => {
//   logger.info('QLLTAction:: filter: filter: ', filter);

//   const response = await QLLTHandler.exportWithFilter(filter);
//   logger.info('QLLTAction:: Exportfilter: reponse: ', response);
//   history.push('/qllt');
// };

export default {
  getAllListWithFilter,
  getKtxListWithFilter,
  updateOneStudentByType
  // exportWithFilter
};
