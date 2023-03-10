
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetailAction } from '../../redux/action/movieAction';
import LichChieuPhim from './LichChieuPhim';
import LichChieuPhimModal from './LichChieuPhimModal';
import ThongTinPhim from './ThongTinPhim';


export default function ChiTietPhim() {
  let { maphim } = useParams();
  let [isLoading, setIsLoading] = useState(true)


  let movieDetail = useSelector(state => state.movieReducer.movieDetail)
  let dispatch = useDispatch();

  useEffect(() => {
    getMovieDetail();
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);

  let getMovieDetail = () => {
    let action = getMovieDetailAction(maphim);
    dispatch(action);
  }

  const renderUIDetail = () => {
    if (isLoading) {
      return <div className='loadingContainer'>
      <div className="loadingOverlay">
      <h2 className='loadingText'>Loading ...</h2>
        <span className="loader"></span>
      </div>
      </div>
    }
    return <div className='container pt-3'>
      <h2 className='movieName__detail'>{movieDetail.tenPhim}</h2>
      <ThongTinPhim />
      <LichChieuPhim movieDetail={movieDetail} />
   
    </div>
  }

  return (
    <div>
      {renderUIDetail()}
    </div>
  )
}
