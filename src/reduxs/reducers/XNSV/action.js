import * as XNSVHandler from 'handlers/XNSVHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

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
  dispatch({ type: Types.GET_NOT_PRINT_YET, payload });
  history.push('/xnsv');
};

const getListHistory = () => async dispatch => {
  const status = 'In';
  const payload = await XNSVHandler.GetListCertificate(status);
  dispatch({ type: Types.GET_HISTORY_LIST, payload });
};

const deleteOneCertificate = (pk, sk) => async dispatch => {
  const response = await XNSVHandler.DeleteOneCertificate(pk, sk);

  logger.info('XNSVAction:: deleteOneCertificate: reponse: ', response);

  dispatch({ type: Types.DELETE_ONE_CERTIFICATE, payload: null });
  history.push('/xnsv');
};

const handlePrint = type => async dispatch => {
  const response = await XNSVHandler.PrintByType(type);
  const status = 'ChuaIn';
  const listData = await XNSVHandler.GetListCertificate(status);
  logger.info('XNSVAction:: PrintByType: reponse: ', response);
  if (response.statusCode === 200) {
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

const exportWithFillter = fillter => async dispatch => {
  logger.info('XNSVAction:: Fillter: fillter: ', fillter);

  const response = await XNSVHandler.ExportWithFillter(fillter);
  logger.info('XNSVAction:: ExportFillter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body.Items });
    history.push('/xnsv');
  }
};

const getListExport = fillter => async dispatch => {
  logger.info('XNSVAction:: Fillter: fillter: ', fillter);

  const response = await XNSVHandler.GetListExport(fillter);
  logger.info('XNSVAction:: ListExportFillter: reponse: ', response);
  dispatch({ type: Types.GET_HISTORY_LIST, payload: response });
  history.push('/xnsv');
};

export default {
  handleAllList,
  handlePrintList,
  handlePrint,
  getNotPrintYet,
  deleteOneCertificate,
  getListHistory,
  getCompany,
  exportWithFillter,
  getListExport,
  handlePrintOneStudent
};
