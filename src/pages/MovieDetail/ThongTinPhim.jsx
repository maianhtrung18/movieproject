import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-notifications/lib/notifications.css';
import TrailerModal from './TrailerModal';
import LichChieuPhimModal from './LichChieuPhimModal';

export default function ThongTinPhim(props) {

  let [playingVideo, setPlayingVideo] = useState(false)
  let movieDetail = useSelector(state => state.movieReducer.movieDetail)
  let [open, setOpen] = useState(false);

  let renderNgayKhoiChieu = () => {
    let ngayGioKhoiChieu = new Date(movieDetail.ngayKhoiChieu)
    let ngayKhoiChieu = ngayGioKhoiChieu.getDate() + "/" + (ngayGioKhoiChieu.getMonth() + 1) + "/" + ngayGioKhoiChieu.getFullYear()
    return ngayKhoiChieu;
  }


  return (
    <div className="row">
      <div className="col-4 movieDetail_leftContent">
        <img className='img-fluid' src={movieDetail.hinhAnh} alt="" />
      </div>
      <div className="col-8 movieDetail_rightContent">
        <h2>{movieDetail.tenPhim}</h2>
        <p>{movieDetail.moTa}</p>
        <table className='movieDetail__detailTable'>
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>Khởi chiếu: </td>
              <td>{renderNgayKhoiChieu()}</td>
            </tr>
            <tr>
              <td>Đánh giá: </td>
              <td>{movieDetail.danhGia }/10</td>
            </tr>
          </tbody>
        </table>
        <div className="btn__detailContainer">
        <button onClick={() => {
          setPlayingVideo(true)
        }} className='btn__detail btn__trailer mx-0 mx-lg-2' data-toggle="modal" data-target="#exampleModal">Trailer</button>

        <button onClick={() => {
            setOpen(true);
        }} className='btn__detail btn__detailBooking mx-0 mx-lg-2'>
          <i className="fa-solid fa-angle-down text-white"></i>
          <span className='text-white'> Book Now!</span>
        </button>
        </div>
      
      </div>
      <TrailerModal playingVideo={playingVideo} setPlayingVideo={setPlayingVideo} />
      <LichChieuPhimModal movieDetail={movieDetail} open={open} setOpen={setOpen}/>
    </div>
  )
}
