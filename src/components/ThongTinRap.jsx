import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { token } from '../types/globalConst';
import { NavLink } from 'react-router-dom';
// import { useHistory } from "react-router-dom";

export default function ThongTinRap() {
    let [heThongRap, setHeThongRap] = useState([]);
    let [cumData, setCumData] = useState({})
    let [danhSachPhim, setDanhSachPhim] = useState({});
    const [isHeThongRapActive, setIsHeThongRapActive] = useState(0)
    const [isRapTheoHeThongActive, setIsRapTheoHeThongActive] = useState(0)

//    let  history = useHistory()

    useEffect(() => {
        getThongTinHeThongRap()
    }, [])

    let getThongTinHeThongRap = () => {
        let thongTinHeThongRap = axios({
            method: 'GET',
            url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyRap/LayThongTinHeThongRap`,
            headers: { 'TokenCybersoft': token }
        });
        thongTinHeThongRap.then((result) => {
            setHeThongRap(result.data.content)
            return result
        }).then((result) => {
            getThongTinLichChieuHeThongRap(result.data.content[0].maHeThongRap)
        })
            .catch((error) => {
                console.log(error)
            })
    }


    let getThongTinLichChieuHeThongRap = (maHeThongRap) => {
        let getThongTinLichChieuHeThongRap = axios({
            method: 'GET',
            url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyRap/LayThongTinLichChieuHeThongRap`,
            headers: { 'TokenCybersoft': token },
            params: {
                maHeThongRap: maHeThongRap
            },
        });

        getThongTinLichChieuHeThongRap.then((result) => {
            setCumData(result.data.content[0])
            setDanhSachPhim(result.data.content[0].lstCumRap[0])

        })

            .catch((error) => {
                console.log(error)
            })

    }



    let getLichChieuPhimTheoRap = (number) => {
        let lstCumRap = cumData.lstCumRap ? cumData.lstCumRap[number] : []
        setDanhSachPhim(lstCumRap)
    }

    let renderLichChieuPhim = (lichChieu) => {
        let lichChieuProcess = []
        lichChieu.lstLichChieuTheoPhim.map((lich) => {
            const d = new Date(lich.ngayChieuGioChieu);
            let gioChieu = `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
            let ele = lichChieuProcess.find((chieuProcess) => {
                return chieuProcess === gioChieu
            })
            if (!ele) {
                lichChieuProcess.push(gioChieu)
            }
        })

        lichChieuProcess.sort((time1, time2) => time1.localeCompare(time2))

        return lichChieuProcess.map((lichChieu) => {
            return <li key={lichChieu}>
                {lichChieu}
            </li>
        })
    }

    let renderThongTinLichChieuHeThongRap = () => { //bu nhat
        let phimList = danhSachPhim.danhSachPhim ? danhSachPhim.danhSachPhim : []


        return phimList.map((lichChieu) => {
            if (lichChieu.dangChieu || lichChieu.sapChieu) {
                return <div key={lichChieu.maPhim} className='thongTinLichChieu row'>
                    <div className='thongTinLichChieu_Image col-2'>
                        <div className='image' style={{ backgroundImage: `url(${lichChieu.hinhAnh})` }}></div>
                        <div className='tinhTrangPhim'>{lichChieu.dangChieu? 'Đang chiếu' : 'Sắp chiếu'}</div>
                    </div>
                    <div className='thongTinLichChieu_Container col-10'>
                        <div className='thongTinLichChieu_TenPhim'><NavLink to={`/chitietphim/${lichChieu.maPhim}`}>{lichChieu.tenPhim.toLowerCase()} </NavLink> </div>
                        <ul className='lichChieuPhim'>
                            {renderLichChieuPhim(lichChieu)}
                        </ul>
                    </div>
                </div>
            } else {
                return <></>
            }

        })
    }

    let renderCumRapTheoHeThong = () => { //vua vua
        let lstCumRap = cumData.lstCumRap ? cumData.lstCumRap : []
        return lstCumRap.map((heThong, index) => {
            return <div onClick={() => {
                getLichChieuPhimTheoRap(index)
                setIsRapTheoHeThongActive(index)
            }} key={heThong.maCumRap} className={`rapTheoHeThong row ${(index === isRapTheoHeThongActive) ? 'active' : ''}`}>
                <div className='rapTheoHeThong_Image col-3'>
                    <div className='image' style={{ backgroundImage: `url(${heThong.hinhAnh})` }}></div>
                </div>
                <div className='rapTheoHeThong_Container col-9'>
                    <div className='rapName'>{heThong.tenCumRap}</div>
                    <div className='rapAddress'>{heThong.diaChi}</div>
                </div>
            </div>
        })
    }

    let renderHeThongRap = () => { //nho
        return heThongRap.map((rap, index) => {
            return <div onClick={(event) => {
                getThongTinLichChieuHeThongRap(rap.maHeThongRap)
                setIsHeThongRapActive(index)
                setIsRapTheoHeThongActive(0)
            }} key={rap.maHeThongRap} className={`logoHeThongRapContainer ${(index === isHeThongRapActive) ? 'active' : ''}`}>
                <div className='logoHeThongRap' style={{ backgroundImage: `url(${rap.logo})` }}>
                </div>
            </div>
        })
    }

    return (
        <div className='thongTinRap'>
            <div className='thongTinRap_Container container row'>
                <div className='col-1 heThongRap'>
                    {renderHeThongRap()}
                </div>
                <div className='col-4 cumRapTheoHeThong'>{renderCumRapTheoHeThong()}</div>
                <div className='col-7'>{renderThongTinLichChieuHeThongRap()}</div>
            </div>
        </div>
    )
}
