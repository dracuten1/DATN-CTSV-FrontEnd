import * as QLLTHandler from 'handlers/QLLTHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const parseNHToNumber = nh => {
  const dt = new Date();
  const year = dt.getFullYear();
  const convert = year % 100;

  switch (nh) {
    case `${convert - 6}-${convert - 5}`:
      return 1;
    case `${convert - 5}-${convert - 4}`:
      return 2;
    case `${convert - 4}-${convert - 3}`:
      return 3;
    case `${convert - 3}-${convert - 2}`:
      return 4;
    case `${convert - 2}-${convert - 1}`:
      return 5;
    case `${convert - 1}-${convert}`:
      return 6;
    default:
      return 7;
  }
};

const getNullData = () => async dispatch => {
  dispatch({ type: Types.GET_NULL_DATA });
};

const getAllListWithFilter = filter => async dispatch => {
  filter.type = 'all';
  logger.info('QLLTAction:: getListAll: filter: ', filter);
  const response = await QLLTHandler.GetListWithFilter(filter);
  logger.info('QLLTAction:: getListAll: reponse: ', response);

  const { statusCode, body } = response;
  if (statusCode !== 200 || body.length === 0) {
    dispatch({ type: Types.GET_NULL_DATA });
    return;
  }
  const data = Object.keys(body).map(key => {
    body[key].ktx = body[key]['Nội trú']['KTX'];
    body[key].portal = body[key]['Nội trú']['Cập nhật Portal'];
    body[key].xnnt = body[key]['Xác nhận ngoại trú'];
    body[key].nh = parseNHToNumber(body[key].NH);
    return body[key];
  });
  dispatch({ type: Types.GET_ALLLIST, payload: data });
  history.push('/qllt');
};

const getKtxListWithFilter = filter => async dispatch => {
  filter.type = 'ktx';
  logger.info('QLLTAction:: getListAll: filter: ', filter);
  const response = await QLLTHandler.GetListWithFilter(filter);
  logger.info('QLLTAction:: getListKTX: reponse: ', response);
  const { statusCode, body } = response;
  if (statusCode !== 200 || body.length === 0) {
    dispatch({ type: Types.GET_NULL_DATA });
    return;
  }
  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key].NH);
    return body[key];
  });
  dispatch({ type: Types.GET_KTX_LIST, payload: data });
  history.push('/qllt');
};

const updateOneStudentByType = (data, type) => async dispatch => {
  const response = await QLLTHandler.UpdateOneStudentByType(data, type);
  logger.info('QLLTAction:: update: reponse: ', response);
  dispatch({ type: Types.UPDATE_STUDENT });
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
  exportWithFilter,
  getNullData
};
