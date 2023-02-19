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
            if(ghe.daDat){
                cssGhe = 'gheDuocChon'
                disabled = true;
            }

            if(ghe.loaiGhe == "Vip"){
                cssGhe = "gheVip";
            }
            
            if(gheTK){
                cssGhe= 'gheDangChon'
            }

          return <td>
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
          return <tr>
            {renderGhe(hangGheObj.mangGhe)}
          </tr>
        })
      }

  return (
    <div className="col-8 pt-2">
              <table className='ticketRoom__ticketTable'>
                <thead>
                </thead>
                <tbody>
                  {renderHangGhe()}
                </tbody>
              </table>

            </div>
  )
}
