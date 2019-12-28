import * as DRLHandler from 'handlers/DRLHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const handleAllList = () => async dispatch => {
  dispatch({ type: Types.ALL_LIST });
};

const handlePrintList = () => async dispatch => {
  dispatch({ type: Types.PRINT_LIST });
};

// const handleAdd = newData => async dispatch => {
//   dispatch({ type: Types.DATA_PRINT, newData });
// };

const getNotPrintYet = () => async dispatch => {
  const status = 'ChuaIn';

  const payload = await DRLHandler.GetListCertificate(status);

  dispatch({ type: Types.GET_NOT_PRINT_YET, payload });
};

const deleteOneCertificate = (pk, sk) => async dispatch => {
  const response = await DRLHandler.DeleteOneCertificate(pk, sk);

  logger.info('DRLAction:: deleteOneCertificate: reponse: ', response);

  dispatch({ type: Types.DELETE_ONE_CERTIFICATE, payload: null });
};

const handlePrint = type => async dispatch => {
  const response = await DRLHandler.ExportToDocx(type);

  logger.info('DRLAction:: exporttodocx: reponse: ', response);
  if (response !== 'Không có gì để in' && response !== undefined) {
    dispatch({ type: Types.ADD_LINK_PRINT, payload: response });
    history.push('/drl');
  }
};

export default {
  handleAllList,
  handlePrintList,
  handlePrint,
  getNotPrintYet,
  deleteOneCertificate
};
