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
    if (response !== 'Không có gì để in' && response !== undefined) {
      dispatch({ type: Types.ADD_LINK_PRINT, listLink: response, listData });
      history.push('/xnsv');
    }
  };

  export default {
    handleAllList,
    handlePrintList,
    handlePrint,
    getNotPrintYet,
    deleteOneCertificate
  };