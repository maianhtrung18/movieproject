import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { token } from '../types/globalConst';
import { NavLink } from 'react-router-dom';

export default function ThongTinRap() {
    let [heThongRap, setHeThongRap] = useState([]);
    let [thongTinCumRapTheoHeThong, setthongTinCumRapTheoHeThong] = useState([])

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
            // console.log(result.data.content[1].maHeThongRap)
            setHeThongRap(result.data.content)
            getThongTinCumRapTheoHeThong(result.data.content[1].maHeThongRap)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    let getThongTinCumRapTheoHeThong = (maHeThongRap) => {
        let getThongTinCumRapTheoHeThong = axios({
            method: 'GET',
            url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyRap/LayThongTinCumRapTheoHeThong`,
            headers: { 'TokenCybersoft': token },
            params: {
                maHeThongRap: maHeThongRap
            },
        });
        getThongTinCumRapTheoHeThong.then((result) => {
                console.log("123",result.data.content)
                setthongTinCumRapTheoHeThong(result.data.content)
            })
    }

    let renderCumRapTheoHeThong = () => {
        return thongTinCumRapTheoHeThong.map((heThong) => {
            return <div className='rapTheoHeThong'>{heThong.tenCumRap}</div>
        })
    }

    let renderHeThongRap = () => {
        return heThongRap.map((rap) => {
            return <div onClick={() => {
                getThongTinCumRapTheoHeThong(rap.maHeThongRap)
            }} key={rap.maHeThongRap} className={'logoHeThongRapContainer'}>
                <div className='logoHeThongRap' style={{ backgroundImage: `url(${rap.logo})` }}>

                </div>
            </div>


        })
    }

    return (
        <div className='thongTinRap'>
            <div className='thongTinRap_Container container row'>
                <div className='col-2 heThongRap'>
                    {renderHeThongRap()}

                </div>
                <div className='col-3 cumRapTheoHeThong'>{renderCumRapTheoHeThong()}</div>
                <div className='col-7'>567</div>

            </div>

        </div>
    )
}
