import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { maNhom, token } from '../types/globalConst';



export default function MovieList() {

    let [danhSachPhim, reRenderDanhSachPhim] = useState([])

    useEffect(() => {
        getMovieList();
    }, [])

    let getMovieList = () => {
        let danhSachPhim = axios({
            method: 'get',
            // url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim`,
            url: `${process.env.REACT_APP_DOMAIN}/api/QuanLyPhim/LayDanhSachPhim`,
            headers: { 'TokenCybersoft': token },
            params: {
                maNhom: maNhom
            },
        });
        danhSachPhim.then((result) => {
            danhSachPhim =  [...result.data.content]
            console.log(danhSachPhim)
            reRenderDanhSachPhim(danhSachPhim)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    let renderDanhSachPhim = () => {
        return danhSachPhim.map((phim) => {
              return <div key={phim.maPhim}>{phim.tenPhim}</div>
        })
    }

    return (
        <div className='container row m-auto'>

           { renderDanhSachPhim()}
        </div>
    )
}
