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

const getListWithFilter = filter => async dispatch => {
  const response = await QLLTHandler.GetListWithFilter(filter);
  logger.info('QLLTAction:: getListAll: reponse: ', response);
  const data = Object.keys(response).map(key => {
    response[key].ktx = response[key]['Nội trú']['KTX'];
    response[key].portal =
      response[key]['Nội trú']['Cập nhật Portal'] === 'Đã cập nhật';
    response[key].NH =parseNHToNumber(response[key].NH);
      return response[key];
  });
  dispatch({ type: Types.GET_ALLLIST, payload: data });
  history.push('/qllt');
};

// const exportWithFillter = (fillter) => async dispatch => {
//   logger.info('QLLTAction:: Fillter: fillter: ', fillter);

//   const response = await QLLTHandler.ExportWithFillter(fillter);
//   logger.info('QLLTAction:: ExportFillter: reponse: ', response);
//   history.push('/qllt');
// };

export default {
  getListWithFilter
  // exportWithFillter
};
