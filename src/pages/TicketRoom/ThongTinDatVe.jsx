import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { datGheAction } from '../../redux/action/movieAction';


export default function ThongTinDatVe() {

    let {ticketsRoom,mangGheDangChon} = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()

    const renderGheDangChon = () => {
      return mangGheDangChon.map((gheDangChon) => {
          let manghGhe = ticketsRoom.danhSachGhe ? ticketsRoom.danhSachGhe : []
          let gheTK = manghGhe.find(ghe => ghe.maGhe == gheDangChon.maGhe) 
        return <>
        <p className='ticketRoom__gheChonDetail'>
       <span> {`Số ghế: ${gheTK.tenGhe}`}</span> <span className='giaVeDetail'>{`Giá vé: ${gheTK.giaVe}`}</span>
        </p>
      
        </>
       })
    }

    const renderTongTien = () => {
      let tongTien = 0;
      if(mangGheDangChon.length > 0){
         tongTien = mangGheDangChon.reduce((sum, ghe) => { 
          return sum += ghe.giaVe
         },0)
      }
    
      return <span className='giaVeDetail'>{tongTien}</span>
    }

    const renderTicketRoomDetails = () => {
        let thongTinPhimChieu = ticketsRoom.thongTinPhim ? ticketsRoom.thongTinPhim : {}
        let {gioChieu, diaChi, ngayChieu, tenCumRap, tenPhim, tenRap} = thongTinPhimChieu;
        return <>
                  <table className='ticketRoom__detailTable'>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} className="text-center">
                        <h4>{tenPhim}</h4>
                          </td>
                          </tr>
                      <tr>
                        <td>Ngày chiếu giờ chiếu</td>
                        <td>{`${ngayChieu} - ${gioChieu}`}</td>
                      </tr>
                      <tr>
                        <td>Cụm rạp</td>
                        <td>{tenCumRap}</td>
                      </tr>
                      <tr>
                        <td>Rạp</td>
                        <td>{tenRap}</td>
                      </tr>
                      <tr>
                        <td>Ghế chọn</td>
                        <td>{renderGheDangChon()}</td>
                      </tr>
                      <tr>
                        <td>Ưu đãi</td>
                        <td>%</td>
                      </tr>
                      <tr>
                        <td>Tổng tiền</td>
                        <td>{renderTongTien()}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={() => { 
                    let maLichChieu = ticketsRoom.thongTinPhim ? ticketsRoom.thongTinPhim.maLichChieu : 0
                    if(mangGheDangChon.length != 0){
                      let action = datGheAction(mangGheDangChon, maLichChieu)
                      dispatch(action)
                    } else {
                      alert("Vui lòng chọn ghế trước khi đặt!")
                    }
          
                   }} className='ticketRoom__buttonDatVe'>Đặt vé</button>
        </>
      }

  return (
    <div className="col-12 col-lg-4 ticketRoom__detail">
    {renderTicketRoomDetails()}
      
    </div>
  )
}
