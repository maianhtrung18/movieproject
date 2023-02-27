import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chonGheAction } from '../../redux/action/movieAction'

export default function HangGhe() {

    let { ticketsRoom, mangGheDangChon } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()

    const renderGhe = (hangGheParam) => {
        
        let hangGhe = hangGheParam ? hangGheParam : []
        return hangGhe.map((ghe) => {
            let cssGhe = '';
            let disabled = false;
            let gheTK = mangGheDangChon.find(gheDangChon => gheDangChon.maGhe == ghe.maGhe)
            if(ghe.loaiGhe == "Vip"){
              cssGhe = "gheVip";
          }

            if(ghe.daDat){
                cssGhe = 'gheDuocChon'
                disabled = true;
            }
            
            if(gheTK){
                cssGhe= 'gheDangChon'
            }

          return <td key={ghe.maGhe}>
            <button disabled={disabled} onClick={() => {
                let action = chonGheAction(ghe.maGhe, ghe.giaVe)
                dispatch(action)
            }} className={`ghe ${cssGhe}`}>{ghe.stt}</button>
          </td>
        })
      }
    
      const renderHangGhe = () => {
        let danhSachGhe = ticketsRoom.danhSachGhe ? ticketsRoom.danhSachGhe : []
        let danhSachGheTheoHang = [];
        if (danhSachGhe.length > 0) {
          let n = 0;
          for (let i = 1; i <= 10; i++) {
            let hangGheObj = {
              hangGhe: i,
              mangGhe: []
            }
    
            for (const ghe of danhSachGhe) {
              if (ghe.stt > n && ghe.stt <= i * 16) {
                hangGheObj.mangGhe.push(ghe);
                n = Number(ghe.stt)
              }
            }
            danhSachGheTheoHang.push(hangGheObj);
          }
        }
        return danhSachGheTheoHang.map((hangGheObj) => {
          return <tr key={hangGheObj.hangGhe}>
            {renderGhe(hangGheObj.mangGhe)}
          </tr>
        })
      }

  return (
    <div className="col-12 col-lg-8 pt-2">
              <table className='ticketRoom__ticketTable'>
                <thead>
                </thead>
                <tbody>
                  {renderHangGhe()}
                </tbody>
              </table>
            <div className="ticketRoom__loaiGhe mt-3">
              <table>
                <thead>
                </thead>
                <tbody>
                  <tr>
                    <td><button className='ghe'></button></td>
                    <td className='pr-2'><span>Ghế thường</span></td>

                    <td><button className='ghe gheVip'></button></td>
                    <td className='pr-2'><span>Ghế vip</span></td>

                    <td><button className='ghe gheDangChon'></button></td>
                    <td className='pr-2'><span>Ghế đang chọn</span></td>

                    <td><button className='ghe gheDuocChon'></button></td>
                    <td className='pr-2'><span>Ghế đã đặt</span></td>
                  </tr>
                </tbody>
              </table>
             
         
          
            </div>
            </div>
  )
}
