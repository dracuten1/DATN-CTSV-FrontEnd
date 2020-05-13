import * as QLLTHandler from 'handlers/QLLTHandler';
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

const getAllListWithFilter = filter => async dispatch => {
  filter.type = 'all';
  logger.info('QLLTAction:: getListAll: filter: ', filter);
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
  filter.type = 'ktx';
  logger.info('QLLTAction:: getListAll: filter: ', filter);
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

const exportWithFilter = filter => async dispatch => {
  logger.info('QLLTAction:: filter: filter: ', filter);

  const response = await QLLTHandler.ExportWithFilter(filter);
  logger.info('QLLTAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qllt');
  }
};

export default {
  getAllListWithFilter,
  getKtxListWithFilter,
  updateOneStudentByType,
  exportWithFilter
};
