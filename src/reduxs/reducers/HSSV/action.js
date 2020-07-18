import * as HSSVHandler from 'handlers/HSSVHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';
import { HIDE_PROGRESS } from '../LinearProgress/ActionTypes';

const getInfoStudent = (mssv) => async dispatch => {
  const payload       = await HSSVHandler.GetInfoStudent(mssv);

  const {statusCode, body} = payload;
  logger.info('HSSVAction:: updateStudentInfo: reponse: ', payload);

  if (statusCode !== 200 || body === "Không tìm thấy học sinh này !")
  {
    dispatch({ type: Types.GET_INFO, payload: null });
    dispatch({ type: HIDE_PROGRESS });
    return null;
  }

  body.mssv        = body.SK.replace("SV#", '');
  body.Name        = body.Ho + ' ' + body.Ten;
  body.SoNha       = body.DiaChiThuongTru.SoNha;
  body.PhuongXa    = body.DiaChiThuongTru.PhuongXa;
  body.TinhTP      = body.DiaChiThuongTru.TinhTP;
  body.QuanHuyen   = body.DiaChiThuongTru.QuanHuyen;
  body.SoTK        = body.TaiKhoanNganHang.SoTK;
  body.NganHang    = body.TaiKhoanNganHang.NganHang;
  body.ChiNhanh    = body.TaiKhoanNganHang.ChiNhanh;
  body.TenNLL      = body.NguoiLienLac.Ten;
  body.DiaChiNLL   = body.NguoiLienLac.DiaChi;
  body.EmailNLL    = body.NguoiLienLac.Email;
  body.TenNLL      = body.NguoiLienLac.Ten;
  body.SDTNLL      = body.NguoiLienLac.DT;
  body.GhiChuNLL   = body.NguoiLienLac.GhiChu;
  body.QuanHe      = body.NguoiLienLac.QuanHe;
  body.NgoaiNgu    = body.NguoiLienLac.NgoaiNgu;
  body.TinHoc      = body.NguoiLienLac.TinHoc;

  dispatch({ type: Types.GET_INFO, payload: body });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/hssv');
  return body;
};

const updateStudentInfo = (data) => async dispatch => {
  const response = await HSSVHandler.UpdateStudentInfo(data);

  logger.info('HSSVAction:: updateStudentInfo: reponse: ', response);

  dispatch({ type: Types.UPDATE_INFO});
  history.push('/hssv');
};

const handlePrint = data => async dispatch => {
  const response = await HSSVHandler.PrintStudentInfo(data);
  logger.info('HSSVAction:: Print: reponse: ', response);
  if (response.statusCode === 200) {
    dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body });
    history.push('/HSSV');
  }
};

export default {
  handlePrint,
  getInfoStudent,
  updateStudentInfo
};
