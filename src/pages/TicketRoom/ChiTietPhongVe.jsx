import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getTicketsRoomAction, resetGheDangChonAction } from '../../redux/action/movieAction';
import HangGhe from './HangGhe';
import ThongTinDatVe from './ThongTinDatVe';


export default function ChiTietPhongVe() {

  let { malichchieu } = useParams();
  let dispatch = useDispatch();
  let { ticketsRoom } = useSelector(state => state.movieReducer)
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getTicketsRoom()

    setTimeout(() => {
      setIsLoading(false)
    }, 1000);

    return () => {
      let action = resetGheDangChonAction()
      dispatch(action);
    }
  }, []);

  let getTicketsRoom = () => {
    let action = getTicketsRoomAction(malichchieu)
    dispatch(action);
  }



  const renderTimeReserve = () => {
    let date = new Date();
    return `${date.getHours()} : ${date.getMinutes()}`
  }

  const renderUITicketRoom = () => {
    if (isLoading) {
      return <div className='loadingContainer'>
        <div className="loadingOverlay">
          <h2 className='loadingText'>Loading ...</h2>
          <span className="loader"></span>
        </div>
      </div>
    }
    return <div className='ticketRoom__bg'>
      <div className="ticketRoom__overlay">
        <div className="container ticketRoom_content">
          <h6>Thời gian giữ ghế</h6>
          <h3>{renderTimeReserve()}</h3>
          <p>{ticketsRoom.thongTinPhim ? `${ticketsRoom.thongTinPhim.ngayChieu} - ${ticketsRoom.thongTinPhim.gioChieu} - ${ticketsRoom.thongTinPhim.tenRap}` : ""}</p>
          <div className="row">
            <HangGhe />
            <ThongTinDatVe />
          </div>
        </div>

      </div>

    </div>
  }

  return (
    <div>
      {renderUITicketRoom()}
    </div>

  )
}
