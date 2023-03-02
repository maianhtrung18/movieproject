import axios from "axios";
import { token } from "../../types/globalConst";


export const getMovieDetailAction = (maphim) => {
    return (dispatch2) => {
        let promise = axios({
            method: "GET",
            url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maphim}`,
            headers:{
                'TokenCybersoft': token
            }
        });
        promise.then((result) => { 

            let action = {
                type: "GET_MOVIE_DETAIL",
                movieDetail: result.data.content
            }
            dispatch2(action)
            
         });
         promise.catch((error) => { 
            console.log(error)
          });
    }
}

export const getTicketsRoomAction = (malichchieu) => {
    return (dispatch2) =>{
        let promise = axios ({
            method: "GET",
            url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${malichchieu}`,
            headers: {
              'TokenCybersoft' : token
            }
          })
          promise.then((result) => { 
              let action = {
                type: "GET_TICKETS_ROOM",
                ticketsRoom: result.data.content
              }
              dispatch2(action)
           });
           promise.catch((error) => { 
            console.log(error)
            })
    }
}

export const chonGheAction = (maGhe, giaVe) => {
    return {
        type: "CHON_GHE",
        maGhe: maGhe,
        giaVe: giaVe
    }
}

export const resetGheDangChonAction = () => {
    return {
        type: "RESET_GHE"
    }
}

export const hoanThanhDatGheAction = () => {
    return {
        type: "DAT_GHE_THANH_CONG"
    }
}

export const datGheAction = (mangGheDangChon, maLichChieu) => {
    return (dispatch2) => {
        
        if(mangGheDangChon.length > 0 && maLichChieu !== 0){
          let datVe = {
            maLichChieu: maLichChieu,
            danhSachVe: mangGheDangChon
          }
            let promise = axios({
              method: "POST",
              url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
              data: datVe,
              headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlcjA3MDIyMDIzbG9naW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJBQkJCQUFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIktoYWNoSGFuZyIsIkFCQkJBQUBnbWFpbC5jb20iLCJHUDAwIl0sIm5iZiI6MTY3NjgxMzE5MCwiZXhwIjoxNjc2ODE2NzkwfQ.WPlmnSmsU99E6r3l2IObvp1edQ_bSJIjUHIt6XITspE",
                'TokenCybersoft' : token
              }
            })
            promise.then((result) => { 
                alert("Đặt vé thành công! 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉");
                let action = hoanThanhDatGheAction()
               dispatch2(action)
          
             })
             promise.catch((error) => { 
              console.log(error)
              })
        }
    }
}
