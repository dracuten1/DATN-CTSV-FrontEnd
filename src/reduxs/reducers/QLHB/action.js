import * as QLHBHandler from 'handlers/QLHBHandler';
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

const getListWithFilter = (filter, type) => async dispatch => {
  const response = await QLHBHandler.GetListWithFilter(filter, type);
  logger.info('QLHBAction:: getListAll: reponse: ', response);
  const data = Object.keys(response).map(key => {
    response[key].nh = parseNHToNumber(response[key].NH);
    response[key].id = response[key].id ? response[key].id : '';
    return response[key];
  });
  if (type === "KK")
    dispatch({ type: Types.GET_DATA_HBKK, payload: data });
  else
    dispatch({ type: Types.GET_DATA_HBTT, payload: data });

  history.push('/qlhb');
};

const exportWithFilter = (filter, type) => async dispatch => {
  logger.info('QLHBAction:: filter: filter: ', filter, type);

  const response = await QLHBHandler.ExportWithFilter(filter, type);
  logger.info('QLHBAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
    history.push('/qlhb');
  }
};

const deleteOneCertificate = (PK, SK, type, id) => async dispatch => {
  const response = await QLHBHandler.DeleteOneCertificate(PK, SK, type, id);

  logger.info('QLHBAction:: deleteOneCertificate: reponse: ', response);

  dispatch({ type: Types.DELETE_ONE_CERTIFICATE, payload: null });
  history.push('/qlhb');
};

export default {
  getListWithFilter,
  exportWithFilter,
  deleteOneCertificate
};
