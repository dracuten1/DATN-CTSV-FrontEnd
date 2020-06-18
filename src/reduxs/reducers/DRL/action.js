import * as DRLHandler from 'handlers/DRLHandler';
import moment from 'moment';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const parseGradeToInt = grade => {
  switch (grade) {
    case 'Xuất sắc':
      return 1;
    case 'Tốt':
      return 2;
    case 'Khá':
      return 3;
    case 'Trung bình':
      return 4;
    case 'Yếu':
      return 5;
    default:
      return 6;
  }
};

const handleAllList = () => async dispatch => {
  dispatch({ type: Types.ALL_LIST });
  history.push('/drl');
};

const handlePrintList = () => async dispatch => {
  dispatch({ type: Types.PRINT_LIST });
  history.push('/drl');
};

const filterListInfoDRL = filter => async dispatch => {
  const response = await DRLHandler.FilterListData(filter);
  logger.info('PrintList:: filterListInfoDRL: ', response);

  const {statusCode, body} = response;
  const {Items} = body;

  if (statusCode !== 200 || Items.length === 0){
    dispatch({ type: Types.GET_NULL_DATA });
    return;
  }
  const payload = response.map((item, index) => {
    item.name     = item.info.hvt;
    item.mssv     = item.PK.replace("OE-Drl#", '');
    item.semester = filter.type;
    item.year     = filter.time;
    item.grade    = item.DL;
    item.note     = item.GhiChu;
    item.pk       = item.PK;
    item.sk       = item.SK;
    return item;
  });
  dispatch({ type: Types.ALL_LIST, payload });
  history.push('/drl');
};

const getListWithStatus = (filter) => async dispatch => {
  const {status , username} = filter;
  logger.info('DRLAction:: getListWithStatus: status: ', status , username);
  if (status === 'Đã In'){
    const payload = await DRLHandler.GetListCertificate('In', username);
    if (payload.length === 0){
      dispatch({ type: Types.GET_NULL_DATA });
      return;
    }
    dispatch({ type: Types.GET_LIST_WITH_STATUS, payload });
  }
  else{
    const payload = await DRLHandler.GetListCertificate('ChuaIn', username);
    if (payload.length === 0){
      dispatch({ type: Types.GET_NULL_DATA });
      return;
    }
    dispatch({ type: Types.GET_LIST_WITH_STATUS, payload });
  }
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

const PrintAllStudent = keys => async dispatch => {
  const response = await DRLHandler.PrintAllStudent(keys);
  const status = 'ChuaIn';
  const listData = await DRLHandler.GetListCertificate(status);
  logger.info('DRLAction:: exporttodocx: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
    history.push('/drl');
  }
};

const getListPrintByDate = (filter) => async dispatch => {
  const response = await DRLHandler.GetPrintListByDate(filter);
  logger.info('DRLAction:: listPrintByDate: reponse: ', response);
  const payload = response.Items.map((item, index) => {
    item.stt    = index + 1;
    item.pk     = item.PK;
    item.sk     = item.SK;
    item.date   = moment(parseFloat(item.SK)).format('DD/MM/YYYY');
    return item;
  });
  dispatch({ type: Types.GET_HISTORY_LIST, payload });
  history.push('/drl');
};

const getListHistoryImport = filter => async dispatch => {
  const { type, time } = filter;
  const nh = time;
  const hk = type;
  const payload = await DRLHandler.GetURLFileImport(nh, hk);
  logger.info('GetURLFileImport:: payload: ', payload);
  dispatch({ type: Types.GET_HISTORY_IMPORT_LIST, payload });
};

const getUser = () => async dispatch => {
  const response = await DRLHandler.GetUser();
  logger.info('DRLAction:: Company: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.GET_USER, payload: response.users });
  }
};

const exportWithFilter = filter => async dispatch => {
  logger.info('DRLAction:: filter: filter: ', filter);

  const response = await DRLHandler.ExportWithFilter(filter);
  logger.info('DRLAction:: Exportfilter: reponse: ', response);
  if (response.statusCode === 200) {
    const { body } = response;
    dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body.Items });
    history.push('/drl');
  }
};

export default {
  handleAllList,
  handlePrintList,
  handlePrint,
  deleteOneCertificate,
  getListWithStatus,
  PrintOneStudent,
  filterListInfoDRL,
  getListPrintByDate,
  PrintAllStudent,
  getListHistoryImport,
  getUser,
  exportWithFilter
};
