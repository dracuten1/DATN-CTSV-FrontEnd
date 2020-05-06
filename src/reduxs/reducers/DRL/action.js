import * as DRLHandler from 'handlers/DRLHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const handleAllList = () => async dispatch => {
  dispatch({ type: Types.ALL_LIST });
  history.push('/drl');
};

const handlePrintList = () => async dispatch => {
  dispatch({ type: Types.PRINT_LIST });
  history.push('/drl');
};

const filterListData = fillter => async dispatch => {
  const payload = await DRLHandler.FilterListData(fillter);
  dispatch({ type: Types.ALL_LIST, payload });
};

const getListHistory = () => async dispatch => {
  const status = 'In';
  const payload = await DRLHandler.GetListCertificate(status);
  dispatch({ type: Types.GET_HISTORY_LIST, payload });
};

const getNotPrintYet = () => async dispatch => {
  const status = 'ChuaIn';
  const payload = await DRLHandler.GetListCertificate(status);
  dispatch({ type: Types.GET_NOT_PRINT_YET, payload });
  history.push('/drl');
};

const deleteOneCertificate = (pk, sk) => async dispatch => {
  const response = await DRLHandler.DeleteOneCertificate(pk, sk);

  logger.info('DRLAction:: deleteOneCertificate: reponse: ', response);

  dispatch({ type: Types.DELETE_ONE_CERTIFICATE, payload: null });
  history.push('/drl');
};

const handlePrint = type => async dispatch => {
  const response = await DRLHandler.ExportToDocx(type);
  const status = 'ChuaIn';
  const listData = await DRLHandler.GetListCertificate(status);
  logger.info('DRLAction:: exporttodocx: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
    history.push('/drl');
  }
};

const PrintOneStudent = (pk, sk) => async dispatch => {
  const response = await DRLHandler.PrintOneStudent(pk, sk);
  const status = 'ChuaIn';
  const listData = await DRLHandler.GetListCertificate(status);
  logger.info('DRLAction:: exporttodocx: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
    history.push('/drl');
  }
};

const PrintAllStudent = (keys) => async dispatch => {
  const response = await DRLHandler.PrintAllStudent(keys);
  const status = 'ChuaIn';
  const listData = await DRLHandler.GetListCertificate(status);
  logger.info('DRLAction:: exporttodocx: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
    history.push('/drl');
  }
};

const getListPrintByDate = (from, to) => async dispatch => {
  const response = await DRLHandler.GetPrintListByDate(from, to);
  logger.info('DRLAction:: listPrintByDate: reponse: ', response);
  const payload = response.Items.map(item => {
    return item.DL;
  });
  dispatch({ type: Types.GET_LIST_DOCX, payload });
  history.push('/drl');
};

const getListHistoryImport = (filter) => async dispatch => {
  const {type, time } = filter;
  const nh = time;
  const hk = type;
  const payload = await DRLHandler.GetURLFileImport(nh, hk);
  logger.info('GetURLFileImport:: payload: ', payload);
  dispatch({ type: Types.GET_HISTORY_IMPORT_LIST, payload });
};

export default {
  handleAllList,
  handlePrintList,
  handlePrint,
  getNotPrintYet,
  deleteOneCertificate,
  getListHistory,
  PrintOneStudent,
  filterListData,
  getListPrintByDate,
  PrintAllStudent,
  getListHistoryImport
};
