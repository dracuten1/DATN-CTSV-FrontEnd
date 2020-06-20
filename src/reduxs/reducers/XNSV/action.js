import * as XNSVHandler from 'handlers/XNSVHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';
import { HIDE_PROGRESS } from '../LinearProgress/ActionTypes';

const handleAllList = () => async dispatch => {
  dispatch({ type: Types.ALL_LIST });
  history.push('/xnsv');

};

const handlePrintList = () => async dispatch => {
  dispatch({ type: Types.PRINT_LIST });
  history.push('/xnsv');
};

const getNotPrintYet = () => async dispatch => {
  const status = 'ChuaIn';
  const payload = await XNSVHandler.GetListCertificate(status);
  logger.info("response: ", payload);
  if (payload.length === 0){
    dispatch({ type: Types.GET_NULL_DATA });
    return;
  }
  dispatch({ type: Types.GET_NOT_PRINT_YET, payload });
  history.push('/xnsv');
};

const getListHistory = () => async dispatch => {
  const status = 'In';
  const payload = await XNSVHandler.GetListCertificate(status);
  logger.info("payload: ", payload);
  if (payload.length === 0){
    dispatch({ type: Types.GET_NULL_DATA });
    return;
  }
  dispatch({ type: Types.GET_HISTORY_LIST, payload });
  history.push('/xnsv');
};

const deleteOneCertificate = (pk, sk) => async dispatch => {
  const response = await XNSVHandler.DeleteOneCertificate(pk, sk);

  logger.info('XNSVAction:: deleteOneCertificate: reponse: ', response);

  dispatch({ type: Types.DELETE_ONE_CERTIFICATE, payload: null });
  history.push('/xnsv');
};

const handlePrintByType = (keys, type,language) => async dispatch => {
  const response = await XNSVHandler.PrintByType(keys, type, language);
  const status = 'ChuaIn';
  const listData = await XNSVHandler.GetListCertificate(status);
  logger.info('XNSVAction:: PrintByType: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
    history.push('/xnsv');
  }
};

const handlePrintAll = (keys, language) => async dispatch => {
  logger.info('XNSVAction:: PrintByType: keys: ', keys, language);
  const response = await XNSVHandler.PrintAllCertificate(keys, language);
  const status = 'ChuaIn';
  const listData = await XNSVHandler.GetListCertificate(status);
  logger.info('XNSVAction:: PrintByType: reponse: ', response);
  if (response.statusCode === 200 && response.body !== "Không có gì để in") {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
    history.push('/xnsv');
  }
};

const handlePrintOneStudent = data => async dispatch => {
  const response = await XNSVHandler.PrintOneStudent(data);
  const status = 'ChuaIn';
  const listData = await XNSVHandler.GetListCertificate(status);
  logger.info('XNSVAction:: PrintOneStudent: reponse: ', response);
  dispatch({ type: Types.ADD_LINK_PRINT, listLink: response, listData });
  history.push('/xnsv');
};

const getCompany = () => async dispatch => {
  const response = await XNSVHandler.GetCompany();
  logger.info('XNSVAction:: Company: reponse: ', response);
  history.push('/xnsv');
};

const getUser = () => async dispatch => {
  const response = await XNSVHandler.GetCompany();
  logger.info('XNSVAction:: Company: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.GET_USER, payload: response.users });
  }
};

const exportWithFilter = filter => async dispatch => {
  logger.info('XNSVAction:: filter: filter: ', filter);

  const response = await XNSVHandler.ExportWithFilter(filter);
  logger.info('XNSVAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body.Items });
    history.push('/xnsv');
  }
};

const getListExport = filter => async dispatch => {
  logger.info('XNSVAction:: filter: filter: ', filter);

  const response = await XNSVHandler.GetListExport(filter);
  logger.info('XNSVAction:: ListExportfilter: reponse: ', response);
  if (response.length === 0){
    dispatch({ type: Types.GET_NULL_DATA });
    return;
  }
  dispatch({ type: Types.GET_HISTORY_LIST, payload: response });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/xnsv');
};

const getListExportByDate = filter => async dispatch => {
  logger.info('XNSVAction:: filter: filter: ', filter);

  const response = await XNSVHandler.GetListExportByDate(filter);
  logger.info('XNSVAction:: ListExportfilter: reponse: ', response);
  if (response.length === 0){
    dispatch({ type: Types.GET_NULL_DATA });
    return;
  }
  dispatch({ type: Types.GET_HISTORY_LIST_BY_DATE, payload: response });
  history.push('/xnsv');
};

export default {
  handleAllList,
  handlePrintList,
  handlePrintByType,
  handlePrintAll,
  getNotPrintYet,
  deleteOneCertificate,
  getListHistory,
  getCompany,
  exportWithFilter,
  getListExport,
  handlePrintOneStudent,
  getUser,
  getListExportByDate
};
