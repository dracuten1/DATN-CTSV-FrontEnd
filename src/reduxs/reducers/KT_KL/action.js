import * as KTKLHandler from 'handlers/KTKLHandler';
import { logger } from 'core/services/Apploger';
import history from 'historyConfig';
import Types from './actionTypes';
import { HIDE_PROGRESS } from '../LinearProgress/ActionTypes';

const parseNHToNumber = nh => {
  const dt = new Date();
  const year = dt.getFullYear();
  const convert = year % 100;

  switch (nh) {
    case `${(convert - 6)}-${(convert - 5)}`:
      return 1;
    case `${(convert - 5)}-${(convert - 4)}`:
      return 2;
    case `${(convert - 4)}-${(convert - 3)}`:
      return 3;
    case `${(convert - 3)}-${(convert - 2)}`:
      return 4;
    case `${(convert - 2)}-${(convert - 1)}`:
      return 5;
    case `${(convert - 1)}-${convert}`:
          return 6;      
    default:
      return 7;
  }
};

const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const changeCountingColumns = (type) => async dispatch => {
  type === 'KL' ? dispatch({type: Types.CHANGE_COLUMN_KL}) : dispatch({type: Types.CHANGE_COLUMN_KT});
  history.push('/ktkl');
  return [];
};

// THONG KE KY LUAT
const ThongKeKyLuat1SV = (filter) => async dispatch => {
  const response = await KTKLHandler.thongKeKyLuat1SV(filter);

  logger.info('KTKLAction:: CountingWithMSSV: reponse: ', response);
  if (response === null || response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_KYLUAT, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;
  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key]["DuLieu"].NH) || '';
    body[key].HK = body[key]["DuLieu"].HK || '';
    body[key].HoTen = body[key]["DuLieu"].HoTen || '';
    body[key].NoiDungViPham = body[key]["DuLieu"].NoiDungViPham || '';
    body[key].HinhThucKyLuat = (body[key]["DuLieu"].HinhThucKyLuat) || '';
    body[key].SoQuyetDinh = body[key]["DuLieu"].SoQuyetDinh || '';
    body[key].TrachNhiemPhapLy = body[key]["DuLieu"].TrachNhiemPhapLy || '';
    body[key].NgayQuyetDinh = body[key]["DuLieu"].NgayQuyetDinh || '';
    body[key].MSSV = body[key]["DuLieu"].MSSV || '';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_KYLUAT, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/ktkl');
  return data;
};

const ThongKeKyLuatAll = (filter) => async dispatch => {
  const response = await KTKLHandler.thongKeKyLuatAll(filter);

  logger.info('KTKLAction:: CountingWithMSSV: reponse: ', response);
  if (response === null || response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_KYLUAT, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;
  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key]["DuLieu"].NH) || '';
    body[key].HK = body[key]["DuLieu"].HK || '';
    body[key].HoTen = body[key]["DuLieu"].HoTen || '';
    body[key].NoiDungViPham = body[key]["DuLieu"].NoiDungViPham || '';
    body[key].HinhThucKyLuat = (body[key]["DuLieu"].HinhThucKyLuat) || '';
    body[key].SoQuyetDinh = body[key]["DuLieu"].SoQuyetDinh || '';
    body[key].TrachNhiemPhapLy = body[key]["DuLieu"].TrachNhiemPhapLy || '';
    body[key].NgayQuyetDinh = body[key]["DuLieu"].NgayQuyetDinh || '';
    body[key].MSSV = body[key]["DuLieu"].MSSV || '';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_KYLUAT, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/ktkl');
  return data;
};


// THONG KE KHEN THUONG
const ThongKeKhenThuong1SV = (filter) => async dispatch => {
  const response = await KTKLHandler.thongKeKhenThuong1SV(filter);
  logger.info('KTKLAction:: CountingWithFilter: reponse: ', response);
  if (response === null ||response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_KHENTHUONG, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key]["DuLieu"].NH) || '';
    body[key].HK = body[key]["DuLieu"].HK || '';
    body[key].HoTen = body[key]["DuLieu"].HoTen || '';
    body[key].TenDoi = body[key]["DuLieu"].TenDoi || '';
    body[key].ThanhTich = (body[key]["DuLieu"].ThanhTich) || '';
    body[key].CapDG = body[key]["DuLieu"].CapDG || '';
    body[key].Loai = body[key]["DuLieu"].Loai || '';
    body[key].CapKT = body[key]["DuLieu"].CapKT || '';
    body[key].Ngay = body[key]["DuLieu"].Ngay || '';
    body[key].QuyetDinh = body[key]["DuLieu"].QuyetDinh || '';
    body[key].MSSV = body[key]["DuLieu"].MSSV || '';
    body[key].SoTienMoiThang = formatNumber(body[key]["DuLieu"].SoTien || '0') || '';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_KHENTHUONG, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/ktkl');
  return data;
};

const ThongKeKhenThuongAll = (filter) => async dispatch => {
  const response = await KTKLHandler.thongKeKhenThuongAll(filter);
  logger.info('KTKLAction:: CountingWithFilter: reponse: ', response);
  if (response === null ||response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_KHENTHUONG, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key]["DuLieu"].NH) || '';
    body[key].HK = body[key]["DuLieu"].HK || '';
    body[key].HoTen = body[key]["DuLieu"].HoTen || '';
    body[key].TenDoi = body[key]["DuLieu"].TenDoi || '';
    body[key].ThanhTich = (body[key]["DuLieu"].ThanhTich) || '';
    body[key].CapDG = body[key]["DuLieu"].CapDG || '';
    body[key].Loai = body[key]["DuLieu"].Loai || '';
    body[key].CapKT = body[key]["DuLieu"].CapKT || '';
    body[key].Ngay = body[key]["DuLieu"].Ngay || '';
    body[key].QuyetDinh = body[key]["DuLieu"].QuyetDinh || '';
    body[key].MSSV = body[key]["DuLieu"].MSSV || '';
    body[key].SoTienMoiThang = formatNumber(body[key]["DuLieu"].SoTien || '0') || '';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_KHENTHUONG, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/ktkl');
  return data;
};

const ThongKeKhenThuongAllTheoLoai = (filter, type, value) => async dispatch => {
  const response = await KTKLHandler.thongKeKhenThuongAllTheoLoai(filter, type, value);
  logger.info('KTKLAction:: CountingWithFilter: reponse: ', response);
  if (response === null ||response.statusCode !== 200 || response.body === "Không có dữ liệu")
  {
    dispatch({ type: Types.GET_DATA_KHENTHUONG, payload: []});
    dispatch({ type: HIDE_PROGRESS });
    return [];
  }  
  
  const { body } = response;

  const data = Object.keys(body).map(key => {
    body[key].nh = parseNHToNumber(body[key]["DuLieu"].NH) || '';
    body[key].HK = body[key]["DuLieu"].HK || '';
    body[key].HoTen = body[key]["DuLieu"].HoTen || '';
    body[key].TenDoi = body[key]["DuLieu"].TenDoi || '';
    body[key].ThanhTich = (body[key]["DuLieu"].ThanhTich) || '';
    body[key].CapDG = body[key]["DuLieu"].CapDG || '';
    body[key].Loai = body[key]["DuLieu"].Loai || '';
    body[key].CapKT = body[key]["DuLieu"].CapKT || '';
    body[key].Ngay = body[key]["DuLieu"].Ngay || '';
    body[key].QuyetDinh = body[key]["DuLieu"].QuyetDinh || '';
    body[key].MSSV = body[key]["DuLieu"].MSSV || '';
    body[key].SoTien = formatNumber(body[key]["DuLieu"].SoTien || '0') || '';
    return body[key];
  });

  dispatch({ type: Types.GET_DATA_KHENTHUONG, payload: data });
  dispatch({ type: HIDE_PROGRESS });
  history.push('/ktkl');
  return data;
};

const getDataFilter = () => async dispatch => {
  const payload = await KTKLHandler.getDataFilter();

  logger.info('KTKLAction:: deleteOneCertificate: reponse: ', payload);

  dispatch({ type: Types.GET_DATA_FILTER, payload });
  history.push('/ktkl');
  return payload;
};

export default {
  changeCountingColumns,
  ThongKeKhenThuong1SV,
  ThongKeKhenThuongAll,
  ThongKeKhenThuongAllTheoLoai,
  ThongKeKyLuat1SV,
  ThongKeKyLuatAll,
  getDataFilter
};
