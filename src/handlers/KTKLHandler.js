import * as HttpClient2 from 'core/services/HttpClient2';
import { logger } from 'core/services/Apploger';

const convertNamHoc = nh => {
  const dt = new Date();
  const year = dt.getFullYear();
  const convert = year % 100;

  switch (nh) {
    case `${year}-${year + 1}`:
      return `${convert}-${convert + 1}`;
    case `${year - 1}-${year}`:
      return `${convert - 1}-${convert}`;
    case `${year - 2}-${year - 1}`:
      return `${convert - 2}-${convert - 1}`;
    case `${year - 3}-${year - 2}`:
      return `${convert - 3}-${convert - 2}`;
    case `${year - 4}-${year - 3}`:
      return `${convert - 4}-${convert - 3}`;
    case `${year - 5}-${year - 4}`:
      return `${convert - 5}-${convert - 4}`;
    case `${year - 6}-${year - 5}`:
      return `${convert - 6}-${convert - 5}`;
    default:
      return nh;
  }
};

// THONG KE KY LUAT
export const thongKeKyLuat1SV = async filter => {
  const { mssv, fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KL`;
  logger.info(
    'KTKLHandler:: url: ',
    url
  );
  const response = await HttpClient2.sendGetData(url);
  logger.info('KTKLHandler:: ThongKeKyLuatMotSinhVien:: response: ', response);
  return response;
};

export const thongKeKyLuatAll = async filter => {
  const { fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KL`;
  const response = await HttpClient2.sendGetData(url);
  logger.info(
    'KTKLHandler:: url: ',
    url
  );
  logger.info(
    'KTKLHandler:: ThongKeKyLuatToanBoSinhVien:: response: ',
    response
  );
  return response;
};

// THONG KE KHEN THUONG
export const thongKeKhenThuong1SV = async filter => {
  const { mssv, fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KT`;
  const response = await HttpClient2.sendGetData(url);
  logger.info(
    'KTKLHandler:: url: ',
    url
  );
  logger.info(
    'KTKLHandler:: ThongKeKhenThuongMotSinhVien:: response: ',
    response
  );
  return response;
};

export const thongKeKhenThuongAll = async filter => {
  const { fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KT`;
  const response = await HttpClient2.sendGetData(url);
  logger.info(
    'KTKLHandler:: url: ',
    url
  );
  logger.info(
    'KTKLHandler:: ThongKeKhenThuongToanBoSinhVien:: response: ',
    response
  );
  return response;
};

/**type == capDG || capKT || loaiKT */
export const thongKeKhenThuongAllTheoLoai = async (filter, type, value) => {
  const { fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KT&${type}=${value}`;
  const response = await HttpClient2.sendGetData(url);
  logger.info(
    'KTKLHandler:: url: ',
    url
  );
  logger.info(
    'KTKLHandler:: ThongKeKhenThuongToanBoSinhVienTheoLoai:: response: ',
    response
  );
  return response;
};

// EXPORT KY LUAT
export const exportKyLuat1SV = async filter => {
  const { mssv, fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KL`;
  const response = await HttpClient2.sendPutGetStatus(url);
  logger.info('KTKLHandler:: ExportKyLuatMotSinhVien:: response: ', response);
  return response;
};

export const exportKyLuatAll = async filter => {
  const { fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KL`;
  const response = await HttpClient2.sendPutGetStatus(url);
  logger.info(
    'KTKLHandler:: ExportKyLuatToanBoSinhVien:: response: ',
    response
  );
  return response;
};

// EXPORT KHEN THUONG
export const exportKhenThuong1SV = async filter => {
  const { mssv, fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KT`;
  const response = await HttpClient2.sendPutGetStatus(url);
  logger.info(
    'KTKLHandler:: ExportKhenThuongMotSinhVien:: response: ',
    response
  );
  return response;
};

export const exportKhenThuongAll = async filter => {
  const { fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KT`;
  const response = await HttpClient2.sendPutGetStatus(url);
  logger.info(
    'KTKLHandler:: ExportKhenThuongToanBoSinhVien:: response: ',
    response
  );
  return response;
};

/**type == capDG || capKT || loaiKT */
export const exportKhenThuongAllTheoLoai = async (filter, type, value) => {
  const { fromHK, fromNH, toHK, toNH } = filter;
  const cvFromNH = convertNamHoc(fromNH);
  const cvToNH = convertNamHoc(toNH);
  const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${cvFromNH}&toHK=${toHK}&toNH=${cvToNH}&type=KT&${type}=${value}`;
  const response = await HttpClient2.sendPutGetStatus(url);
  logger.info(
    'KTKLHandler:: ExportKhenThuongToanBoSinhVienTheoLoai:: response: ',
    response
  );
  return response;
};

//delete 1 row
export const deleteOneCertificate = async (PK, SK) => {
  const url = `ktkl/thongke`;
  logger.info('KTKLHandler: ', PK, SK);
  const response = await HttpClient2.sendDeleteWithStatusCode(url, { data: { PK, SK } });
  logger.info('KTKLHandler: response', response);
  return response;
};

//GET FILTER DATA
export const getDataFilter = async () => {
  const url = `hb/common`;

  const response = await HttpClient2.sendGetData(url);

  return response;
};
