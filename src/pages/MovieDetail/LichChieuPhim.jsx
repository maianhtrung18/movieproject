import React from 'react'
import { Link } from 'react-router-dom'

export default function LichChieuPhim(props) {

    const renderHeThongRap = () => {
    
        return props.heThongRapChieu.map((heThongRap) => {
          let cssActive = ""
          if(heThongRap.maHeThongRap == props.heThongRapActive){
            cssActive = "active"
          }
          return <tr className={`${cssActive}`} key={heThongRap.maHeThongRap} onClick={() => {
            props.setHeThongRapActice(heThongRap.maHeThongRap)
            props.setCumRapPhim(heThongRap.cumRapChieu)
          }}>
            <td>
              <img style={{width: "50px"}} className='img-fluid' src={heThongRap.logo} alt="" />
            </td>
            <td>{heThongRap.tenHeThongRap}</td>
          </tr>
        })
      }
    
    
      const renderCumRapChieu = () => {
        return props.cumRapPhim.map((cumRap) => { 
          return <>
          <tr>
            <td>
              <img style={{width: "50px"}} src={cumRap.hinhAnh} alt="" />
            </td>
            <td style={{paddingTop:"30px"}}>
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
          </>
         })
      }
      
    const renderLichChieu = (lichChieuPhimArray) => {
      return lichChieuPhimArray.map((lichChieuPhim) => { 
        let ngayGioChieuPhim = new Date (lichChieuPhim.ngayChieuGioChieu)
        let gioChieuPhim = addZeroToTime(ngayGioChieuPhim.getHours()) + ":" + addZeroToTime(ngayGioChieuPhim.getMinutes())
        return <Link to="/home">
          {gioChieuPhim}
        </Link>
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
