import axios from "axios";
import { token } from "../types/globalConst";

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
