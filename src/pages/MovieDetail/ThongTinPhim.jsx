import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import TrailerModal from './TrailerModal';

export default function ThongTinPhim(props) {

  let [playingVideo, setPlayingVideo] = useState(false)
  let movieDetail = useSelector(state => state.movieReducer.movieDetail)

  let renderNgayKhoiChieu = () => {
    let ngayGioKhoiChieu = new Date(movieDetail.ngayKhoiChieu)
    let ngayKhoiChieu = ngayGioKhoiChieu.getDate() + "/" + (ngayGioKhoiChieu.getMonth() + 1) + "/" + ngayGioKhoiChieu.getFullYear()
    return ngayKhoiChieu;
  }


  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Vui lòng chọn giờ xem phim bên dưới', 'Vui lòng chọn giờ xem phim bên dưới', 6000);
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Vui lòng chọn giờ xem phim bên dưới', 'Vui lòng chọn giờ xem phim bên dưới', 3000);
          break;
        case 'error':
          NotificationManager.error('Phim hiện tại chưa có giờ chiếu!','BOOKING NOT SUCCESS!', 3000, () => {
            alert('callback');
          });
          break;
        default:
          break;
      }
    };
  };

  const createNotify = () => {
    if(movieDetail.heThongRapChieu){
      if(movieDetail.heThongRapChieu.length > 0){
        return createNotification('warning')
      }
    }
    return createNotification('error')
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
        <button onClick={() => {
          setPlayingVideo(true)
        }} className='btn__detail btn__trailer' data-toggle="modal" data-target="#exampleModal">Trailer</button>

        <a href='#bookingTable' onClick={createNotify()} className='btn__detail btn__detailBooking'>
          <i className="fa-solid fa-angle-down text-white"></i>
          <span className='text-white'> Book Now!</span>
        </a>
      </div>
      <TrailerModal playingVideo={playingVideo} setPlayingVideo={setPlayingVideo} />
      <NotificationContainer />
    </div>
  )
}
