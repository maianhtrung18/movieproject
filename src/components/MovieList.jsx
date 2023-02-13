import React, { useEffect, useState } from 'react'
import { history } from '../App';
import { danhSachPhimAPI } from '../API/api';



export default function MovieList() {

    let [danhSachPhim, reRenderDanhSachPhim] = useState([])

    useEffect(() => {
        getMovieList();
    }, [])

    let getMovieList = () => {
        let danhSachPhim = danhSachPhimAPI()
        
        danhSachPhim.then((result) => {
            danhSachPhim = [...result.data.content]
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
            return <div className='movie col-6 col-sm-4 col-md-3 col-lg-2 py-2 ' key={phim.maPhim} data-toggle="modal">
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
        </div>
    )
}
