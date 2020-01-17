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
  if (response !== 'Không có gì để in' && response !== undefined) {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response, listData });
    history.push('/drl');
  }
};

export default {
  handleAllList,
  handlePrintList,
  handlePrint,
  getNotPrintYet,
  deleteOneCertificate,
  getListHistory
};
