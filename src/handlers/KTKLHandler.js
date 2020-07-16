import * as HttpClient2 from 'core/services/HttpClient2';
import { logger } from 'core/services/Apploger';

// THONG KE KY LUAT
export const ThongKeKyLuat1SV = async (mssv, fromHK, fromNH, toHK, toNH) => {
    const url = `ktkl/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${fromNH}&toHK=${toHK}&toNH=${toNH}&type=KL`;
    const response = await HttpClient2.sendGet(url);
    logger.info('KTKLHandler:: ThongKeKyLuatMotSinhVien:: response: ', response);
}

export const ThongKeKyLuatAll = async (fromHK, fromNH, toHK, toNH) => {
    const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${fromNH}&toHK=${toHK}&toNH=${toNH}&type=KL`;
    const response = await HttpClient2.sendGet(url);
    logger.info('KTKLHandler:: ThongKeKyLuatToanBoSinhVien:: response: ', response);
}

// THONG KE KHEN THUONG
export const ThongKeKhenThuong1SV = async (mssv, fromHK, fromNH, toHK, toNH) => {
    const url = `ktkl/thongke?mssv=${mssv}&fromHK=${fromHK}&fromNH=${fromNH}&toHK=${toHK}&toNH=${toNH}&type=KT`;
    const response = await HttpClient2.sendGet(url);
    logger.info('KTKLHandler:: ThongKeKhenThuongMotSinhVien:: response: ', response);
}

export const ThongKeKhenThuongAll = async (fromHK, fromNH, toHK, toNH) => {
    const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${fromNH}&toHK=${toHK}&toNH=${toNH}&type=KT`;
    const response = await HttpClient2.sendGet(url);
    logger.info('KTKLHandler:: ThongKeKhenThuongToanBoSinhVien:: response: ', response);
}
/**type == capDG || capKT || loaiKT */
export const ThongKeKhenThuongAllTheoLoai = async (fromHK, fromNH, toHK, toNH, type, value) => {
    const url = `ktkl/thongke?fromHK=${fromHK}&fromNH=${fromNH}&toHK=${toHK}&toNH=${toNH}&type=KT&${type}=${value}`;
    const response = await HttpClient2.sendGet(url);
    logger.info('KTKLHandler:: ThongKeKhenThuongToanBoSinhVienTheoLoai:: response: ', response);
}
