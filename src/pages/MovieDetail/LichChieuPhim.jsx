import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { history } from '../../App'

export default function LichChieuPhim(props) {

  let [heThongRapChieu, setHeThongRapChieu] = useState([])
  let [cumRapChieu, setCumRapChieu] = useState([])
  let [heThongRapActive, setHeThongRapActice] = useState("")
 

  useEffect(() => {
      if(props.movieDetail.heThongRapChieu){
          setHeThongRapChieu(props.movieDetail.heThongRapChieu)
            if(props.movieDetail.heThongRapChieu.length > 0){
              setCumRapChieu(props.movieDetail.heThongRapChieu[0].cumRapChieu)
              setHeThongRapActice(props.movieDetail.heThongRapChieu[0].maHeThongRap)
            } else {
              setCumRapChieu([])
            }
      }
  }, [props.movieDetail]);


    const renderHeThongRap = () => {
    
        return heThongRapChieu.map((heThongRap) => {
          let cssActive = ""
          if(heThongRap.maHeThongRap == heThongRapActive){
            cssActive = "active"
          }
          return <tr className={`${cssActive}`} key={heThongRap.maHeThongRap} onClick={() => {
           setHeThongRapActice(heThongRap.maHeThongRap)
           setCumRapChieu(heThongRap.cumRapChieu)
          }}>
            <td>
              <img style={{width: "50px"}} className='img-fluid' src={heThongRap.logo} alt="" />
            </td>
            <td>{heThongRap.tenHeThongRap}</td>
          </tr>
        })
      }
    
    
      const renderCumRapChieu = () => {
        return cumRapChieu.map((cumRap) => { 
          return <Fragment key={cumRap.maCumRap}>
          <tr>
            <td>
              <img style={{width: "50px"}} className='img-fluid' src={cumRap.hinhAnh} alt="" />
            </td>
            <td style={{paddingTop:"20px"}}>
              <h6>{cumRap.tenCumRap}</h6>
              <p>{cumRap.diaChi}</p>
            </td>
          </tr>
          <tr className='movieDetail_movieTimeRow'>
           <td>
            <img style={{width: "120px", paddingLeft:"0px", marginLeft:"-30px"}} src="https://www.citypng.com/public/uploads/small/11663776709l135wxq2xwf7ehkjuf6fbf67hnuxjibg8rfmbrj5vwbcbukkugpvdrnbbae8dq7jxk5riucxywxdq5gdmepe8gvm00jntrnrnq7e.png" alt="" />
           </td>
           <td> {renderLichChieu(cumRap.lichChieuPhim)}</td>
          </tr>
          </Fragment>
         })
      }
      
    const renderLichChieu = (lichChieuPhimArray) => {
      return lichChieuPhimArray.map((lichChieuPhim) => { 
        let ngayGioChieuPhim = new Date (lichChieuPhim.ngayChieuGioChieu)
        let gioChieuPhim = addZeroToTime(ngayGioChieuPhim.getHours()) + ":" + addZeroToTime(ngayGioChieuPhim.getMinutes())
        return  <span key={lichChieuPhim.maLichChieu} onClick={() => {
          history.push(`/chitietphongve/${lichChieuPhim.maLichChieu}`)
        }}> {gioChieuPhim}</span>
        // <Link  to={`/chitietphongve/${lichChieuPhim.maLichChieu}`} data-dismiss="modal">
        //         {gioChieuPhim}
        //          </Link>
       })
    }
    
      const addZeroToTime = (time) => {
        if(time<10) {time= "0" + time}
        return time
      }

  return (
    <div className="row mt-2" id='bookingTable'>
    <div className="col-4">
      <table className='movieDetail__tableCinema'>
        <thead>
        </thead>
        <tbody>
          {renderHeThongRap()}
        </tbody>
      </table>
    </div>
    <div className="col-8">
      <table className='movieDetail__tableBooking'>
        <thead></thead>
        <tbody>
          {renderCumRapChieu()}
        </tbody>
      </table>
    </div>
    </div>
  )
}
