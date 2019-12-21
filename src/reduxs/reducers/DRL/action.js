import * as DRLHandler from 'handlers/DRLHandler';
import { logger } from 'core/services/Apploger';
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
  const response = await DRLHandler.GetListCertificate(status);
  const items = response.Items;

  logger.info('PrintList:: getListNotPrintYet: ', items);

  const payload = items.map((item, index) => {
    return {
      stt: index + 1,
      name: item.SinhVien.Ten,
      mssv: item.SinhVien.MSSV,
      case: item.LoaiXN,
      isPrint: item.status !== 'Chưa In',
      date: item.ngayThem,
    };
  });

  dispatch({ type: Types.GET_NOT_PRINT_YET, payload });

};

const handlePrint = () => { };

export default {
  handleAllList,
  handlePrintList,
  handlePrint,
  getNotPrintYet,
};
