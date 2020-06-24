import * as DRLHandler from 'handlers/DRLHandler';
import moment from 'moment';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';
import { HIDE_PROGRESS } from '../LinearProgress/ActionTypes';

const handleAllList = () => async dispatch => {
  dispatch({ type: Types.ALL_LIST });
  history.push('/drl');
  dispatch({ type: HIDE_PROGRESS });
};

const handlePrintList = () => async dispatch => {
  dispatch({ type: Types.PRINT_LIST });
  history.push('/drl');
  dispatch({ type: HIDE_PROGRESS });
};

const filterListInfoDRL = filter => async dispatch => {
  const response = await DRLHandler.FilterListData(filter);
  logger.info('PrintList:: filterListInfoDRL: ', response);

  const { statusCode, body } = response;
  const { Items } = body;

  if (statusCode !== 200 || Items.length === 0) {
    dispatch({ type: Types.GET_LIST_INFO, payload: [] });
    history.push('/drl');
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }
  const payload = Items.map((item, index) => {
    item.name = item.info.hvt;
    item.mssv = item.PK.replace('OE-Drl#', '');
    item.semester = filter.type;
    item.year = filter.time;
    item.grade = item.DL;
    item.note = item.GhiChu;
    item.pk = item.PK;
    item.sk = item.SK;
    return item;
  });
  dispatch({ type: Types.GET_LIST_INFO, payload });
  history.push('/drl');
  dispatch({ type: HIDE_PROGRESS });
  return payload;
};

const getListWithStatus = filter => async dispatch => {
  const { status, username, from, to } = filter;
  const fromDate = moment(new Date(from).setHours(0, 0, 0, 0)).format('x');
  const toDate = moment(new Date(to).setHours(23, 59, 59, 999)).format('x');

  logger.info('DRLAction:: getListWithStatus: status: ', status, username);
  let payload;
  if (status === 'Đã In') {
    payload = await DRLHandler.GetListCertificate(
      'In',
      username,
      fromDate,
      toDate
    );
    dispatch({ type: Types.GET_LIST_WITH_STATUS, payload });
  } else {
    payload = await DRLHandler.GetListCertificate(
      'ChuaIn',
      username,
      fromDate,
      toDate
    );
    dispatch({ type: Types.GET_LIST_WITH_STATUS, payload });
  }
  history.push('/drl');
  dispatch({ type: HIDE_PROGRESS });
  return payload;
};

const deleteOneCertificate = (pk, sk) => async dispatch => {
  const response = await DRLHandler.DeleteOneCertificate(pk, sk);

  logger.info('DRLAction:: deleteOneCertificate: reponse: ', response);

  dispatch({ type: Types.DELETE_ONE_CERTIFICATE, payload: null });
  history.push('/drl');
  dispatch({ type: HIDE_PROGRESS });
};

const PrintOneStudent = (pk, sk) => async dispatch => {
  const response = await DRLHandler.PrintOneStudent(pk, sk);
  const status = 'ChuaIn';
  const listData = await DRLHandler.GetListCertificate(status);
  logger.info('DRLAction:: exporttodocx: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
    history.push('/drl');
    dispatch({ type: HIDE_PROGRESS });
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
    dispatch({ type: HIDE_PROGRESS });
  }
};

const getListPrintByDate = filter => async dispatch => {
  const response = await DRLHandler.GetPrintListByDate(filter);
  logger.info('DRLAction:: listPrintByDate: reponse: ', response);
  const { statusCode, body } = response;
  const { Items } = body;

  if (statusCode !== 200 || Items.length === 0) {
    dispatch({ type: Types.GET_HISTORY_LIST, payload: [] });
    history.push('/drl');
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }
  const payload = Items.map((item, index) => {
    item.stt = index + 1;
    item.pk = item.PK;
    item.sk = item.SK;
    item.date = moment(parseFloat(item.SK)).format('DD/MM/YYYY');
    return item;
  });
  dispatch({ type: Types.GET_HISTORY_LIST, payload });
  history.push('/drl');
  dispatch({ type: HIDE_PROGRESS });
  return payload;
};

const getListHistoryImport = filter => async dispatch => {
  const { nh, hk } = filter;
  const payload = await DRLHandler.GetURLFileImport(nh, hk);
  logger.info('GetURLFileImport:: payload: ', payload);
  dispatch({ type: Types.GET_HISTORY_IMPORT_LIST, payload });
  dispatch({ type: HIDE_PROGRESS });
  return payload;
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
    dispatch({ type: HIDE_PROGRESS });
  }
};

export default {
  handleAllList,
  handlePrintList,
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
