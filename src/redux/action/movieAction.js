import axios from "axios";
import { token } from "../../types/globalConst";


export const getMovieDetailAction = (maphim,setUpStates) => {
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
            
            setUpStates(result.data.content);
         });
         promise.catch((error) => { 
            console.log(error)
          });
    }
}