import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetailAction } from '../../redux/action/movieAction';
import LichChieuPhim from './LichChieuPhim';
import ThongTinPhim from './ThongTinPhim';
import TrailerModal from './TrailerModal';

export default function ChiTietPhim() {
  let { maphim } = useParams();
  let [playingVideo, setPlayingVideo] = useState(false)
  let [heThongRapChieu, setHeThongRap] = useState([])
  let [cumRapPhim, setCumRapPhim] = useState([])
  let [heThongRapActive, setHeThongRapActice] = useState("")

  let movieDetail = useSelector(state => state.movieReducer.movieDetail)
  let dispatch = useDispatch();

  useEffect(() => {
    getMovieDetail();
  }, []);

  let getMovieDetail = () => {
    let action = getMovieDetailAction(maphim, setUpStates);
    dispatch(action);
  }

  const setUpStates = (content) => {
    setHeThongRap(content.heThongRapChieu)
    if(content.heThongRapChieu.length > 0){
      setCumRapPhim(content.heThongRapChieu[0].cumRapChieu);
      setHeThongRapActice(content.heThongRapChieu[0].maHeThongRap)
    }
  }



  return (
    <div className='container'>
      <h2 className='movieName__detail'>{movieDetail.tenPhim}</h2>

      <ThongTinPhim setPlayingVideo={setPlayingVideo} />
      <TrailerModal playingVideo={playingVideo} setPlayingVideo={setPlayingVideo} />
      <LichChieuPhim heThongRapChieu={heThongRapChieu} cumRapPhim={cumRapPhim} heThongRapActive={heThongRapActive} setCumRapPhim={setCumRapPhim} setHeThongRapActice={setHeThongRapActice}/>
    

    </div>
  )
}
