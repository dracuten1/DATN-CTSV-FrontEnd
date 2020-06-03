import * as HSSVHandler from 'handlers/HSSVHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';

const getInfoStudent = (mssv) => async dispatch => {
  const payload       = await HSSVHandler.GetInfoStudent(mssv);
  payload.mssv        = payload.SK.replace("SV#", '');
  payload.Name        = payload.Ho + ' ' + payload.Ten;
  payload.SoNha       = payload.DiaChiThuongTru.SoNha;
  payload.PhuongXa    = payload.DiaChiThuongTru.PhuongXa;
  payload.TinhTP      = payload.DiaChiThuongTru.TinhTP;
  payload.QuanHuyen   = payload.DiaChiThuongTru.QuanHuyen;
  payload.SoTK        = payload.TaiKhoanNganHang.SoTK;
  payload.NganHang    = payload.TaiKhoanNganHang.NganHang;
  payload.ChiNhanh    = payload.TaiKhoanNganHang.ChiNhanh;
  payload.TenNLL      = payload.NguoiLienLac.Ten;
  payload.DiaChiNLL   = payload.NguoiLienLac.DiaChi;
  payload.EmailNLL    = payload.NguoiLienLac.Email;
  payload.TenNLL      = payload.NguoiLienLac.Ten;
  payload.SDTNLL      = payload.NguoiLienLac.DT;
  payload.GhiChuNLL   = payload.NguoiLienLac.GhiChu;
  payload.QuanHe      = payload.NguoiLienLac.QuanHe;
  payload.NgoaiNgu    = payload.NguoiLienLac.NgoaiNgu;
  payload.TinHoc      = payload.NguoiLienLac.TinHoc;

  dispatch({ type: Types.GET_INFO, payload });
  history.push('/hssv');
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
