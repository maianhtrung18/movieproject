import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getTicketsRoomAction } from '../../redux/action/movieAction';
import { token } from '../../types/globalConst';


export default function ChiTietPhongVe() {

  let{malichchieu} = useParams();
  let dispatch = useDispatch();
  let {ticketsRoom} = useSelector(state => state.movieReducer)

  useEffect(() => { 
    getTicketsRoom()
   },[]);

  let getTicketsRoom = () => {
    let action = getTicketsRoomAction(malichchieu)
    dispatch(action);
  }

  console.log(ticketsRoom);
  console.log(malichchieu)
  return (
    <div className='container'>
      <h6>Thời gian giữ ghế</h6>
      <h3>01:05</h3>
      <p>19/12/2021 - 13:12 - rạp 1</p>
      <div className="row">
        <div className="col-6">
          <button onClick={() => { 
            getTicketsRoom()
           }} className='btn btn-info'>Call API</button>
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  )
}
