import axios from "axios";
import { maNhom, token } from "../types/globalConst";

export const thongTinHeThongRapAPI = () => {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyRap/LayThongTinHeThongRap`,
        headers: { 'TokenCybersoft': token }
    });
}

export const thongTinLichChieuHeThongRapAPI = (maHeThongRap) => {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyRap/LayThongTinLichChieuHeThongRap`,
        headers: { 'TokenCybersoft': token },
        params: {
            maHeThongRap: maHeThongRap
        },
    });
}

export const danhSachPhimAPI = () => {
    return axios({
        method: 'get',
        url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyPhim/LayDanhSachPhim`,
        headers: { 'TokenCybersoft': token },
        params: {
            maNhom: maNhom
        },
    });
}

export const dangKyAPI = (thongTinUser) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyNguoiDung/DangKy`,
        data: thongTinUser,
        headers: {
            TokenCybersoft: token
        }
    });
}

export const dangNhapAPI = (thongTinUser) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
        data: thongTinUser,
        headers: {
            TokenCybersoft: token
        }
    });
}

export const xoaPhimAPI = (maphim, tokenAdmin) => {
    return axios({
        method: 'delete',
        url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyPhim/XoaPhim`,
        headers: {
            TokenCybersoft: token,
            Authorization: `bearer ${tokenAdmin}`
        },
         params: {
            MaPhim: maphim
        },
    });
}