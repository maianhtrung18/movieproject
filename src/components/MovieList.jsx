import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { maNhom, token } from '../types/globalConst';
import { history } from '../App';



export default function MovieList() {

    let [danhSachPhim, reRenderDanhSachPhim] = useState([])
    let [phim, chiTietPhim] = useState({})

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
            danhSachPhim = [...result.data.content]
            // console.log(danhSachPhim)
            reRenderDanhSachPhim(danhSachPhim)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    let renderStart = (phim) => {
        let star = []
        for (let index = 10; index >= 1; index--) {
            if (index % 2 === 0) {
                if (index === phim.danhGia) {
                    star.push(<><input key={`${phim.maPhim}${index}`} type="radio" defaultChecked name={phim.maPhim} defaultValue={1} />
                        <label key={`${phim.maPhim}${index}label`} className="full" title="Sucks big time - 1 star" /></>)
                }
                else {
                    star.push(<><input key={`${phim.maPhim}${index}`} type="radio" name={phim.maPhim} defaultValue={1} />
                        <label key={`${phim.maPhim}${index}label`} className="full" title="Sucks big time - 1 star" /></>)
                }
            } else {
                if (index === phim.danhGia) {
                    star.push(<> <input key={`${phim.maPhim}${index}inputodd`} type="radio" defaultChecked name={phim.maPhim} defaultValue="half" />
                        <label key={`${phim.maPhim}${index}label`} className="half" title="Sucks big time - 0.5 stars" /></>)
                }
                else {
                    star.push(<> <input key={`${phim.maPhim}${index}inputodd`} type="radio" name={phim.maPhim} defaultValue="half" />
                        <label key={`${phim.maPhim}${index}label`} className="half" title="Sucks big time - 0.5 stars" /></>)
                }

            }
        }
        return star
    }

    let renderDanhSachPhim = () => {
        return danhSachPhim.map((phim) => {
            return <div onClick={() => {
                chiTietPhim(phim)
            }} className='movie col-6 col-sm-4 col-md-3 col-lg-2 py-2 ' key={phim.maPhim} data-toggle="modal" data-target="#exampleModal">
                <div className='moviePoster' onClick={() => {
                    history.push(`/chitietphim/${phim.maPhim}`)
                }}  style={{ backgroundImage: `url(${phim.hinhAnh})` }}>
                </div>
                <div className='movieName'>
                    {phim.tenPhim.toLowerCase()}
                </div>
                <div id="rating">
                    {renderStart(phim)}
                </div>
            </div>
        })
    }

    return (
        <div className='py-5'>
            <div className='container row m-auto'>
                {renderDanhSachPhim()}
            </div>

            {/* <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {phim.tenPhim}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

    )
}
