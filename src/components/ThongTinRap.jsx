import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { token } from '../types/globalConst';

export default function ThongTinRap() {
    let [heThongRap, setHeThongRap] = useState([]);
    let [cumData, setCumData] = useState({})
    let [danhSachPhim, setDanhSachPhim] = useState({})

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
        let lstCumRap = cumData.lstCumRap? cumData.lstCumRap[number] : []
        setDanhSachPhim(lstCumRap)
    }

    let renderThongTinLichChieuHeThongRap = () => { //bu nhat
         let phimList = danhSachPhim.danhSachPhim? danhSachPhim.danhSachPhim : []
         console.log(phimList)
        return phimList.map((lichChieu) => {
            return <div>{lichChieu.tenPhim}
            </div>
        })
    }

    let renderCumRapTheoHeThong = () => { //vua vua
        let lstCumRap = cumData.lstCumRap ? cumData.lstCumRap : []
console.log(lstCumRap)
        return lstCumRap.map((heThong, index) => {
            return <div onClick={() => {
                getLichChieuPhimTheoRap(index)
            }} key={heThong.maCumRap} className='rapTheoHeThong row'>
                <div className='rapTheoHeThong_Image col-3'>
                    <div className='image' style={{backgroundImage: `url(${heThong.hinhAnh})`}}></div>
                </div>
                <div className='rapTheoHeThong_Container col-9'>
                    <div className='rapName'>{heThong.tenCumRap}</div>
                    <div className='rapAddress'>{heThong.diaChi}</div>
                </div>
            </div>
        })
    }

    let renderHeThongRap = () => { //nho
        return heThongRap.map((rap) => {
            return <div onClick={() => {
                getThongTinLichChieuHeThongRap(rap.maHeThongRap)
            }} key={rap.maHeThongRap} className={'logoHeThongRapContainer'}>
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
