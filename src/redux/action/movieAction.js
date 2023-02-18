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
            console.log(result.data.content)

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
              console.log(result.data.content)
              
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