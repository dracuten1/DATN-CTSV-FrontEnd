import * as SHCDHandler from 'handlers/SHCDHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';
import { HIDE_PROGRESS } from '../LinearProgress/ActionTypes';

const getNullData = () => async dispatch => {
  dispatch({ type: Types.GET_NULL_DATA });
  dispatch({ type: HIDE_PROGRESS });
};

const getFileWithFilter = filter => async dispatch => {
  logger.info('SHCDAction:: getListAll: filter: ', filter);
  const response = await SHCDHandler.GetFileWithFilter(filter);
  logger.info('SHCDAction:: getListAll: reponse: ', response);

  const { statusCode, body } = response;
  if (statusCode !== 200 || body === "Không có dữ liệu") {
    dispatch({ type: Types.GET_LIST_FILE, payload: [] });
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }

  const {Items} = body;

  const data = Object.keys(Items).map(key => {
    Items[key].stt = parseInt(key) + 1;
    Items[key].keyS3 = Items[key]['info']['keyS3'];
    Items[key].fileName = Items[key]['info']['fileName'];
    return Items[key];
  });
  dispatch({ type: Types.GET_LIST_FILE, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/shcd');
  return data;
};

export default {
  getFileWithFilter,
  getNullData
};
