import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';
import moment from 'moment';

export const FindStudentInfoById = async (id) => {

    const url = `xnsv/ttsv?mssv=${id}`;

    const response = await HttpClient.sendGet(url);

    return response;

};

export const GetXNSVByType = async (type) => {

    const url = `xnsv/listCertificateByType?type=${type}`;

    const reponse = await HttpClient.sendGet(url);

    return reponse;
};

export const GetListCertificate = async (status) => {

    const url = `xnsv/getListCertificates?status=${status}`;

    const response = await HttpClient.sendGet(url);
    const items = response.Items;

    const payload = items.map((item, index) => {
        return {
            stt: index + 1,
            name: item.SinhVien.Ten,
            mssv: item.SinhVien.MSSV,
            case: item.LoaiXN,
            isPrint: item.status !== 'Chưa In',
            date: moment(item.ngayThem).format('DD/MM/YYYY'),
            pk: item.PK,
            sk: item.SK,
        };
    });

    return payload;
};

export const PrintByType = async (type) => {

    const url = `xnsv/printfByType?type=${type}`;

    const reponse = await HttpClient.sendPatch(url);

    return reponse;

};

export const DeleteOneCertificate = async (pk, sk) => {

    const url = `xnsv/delete-certificate`;

    logger.info("XNSVhandler:: deleteOneCertificate: URL: ", url);

    const response = await HttpClient.sendDelete(url, { data: { pk, sk } });

    logger.info("XNSVhandler:: deleteOneCertificate: reponse: ", response);

};