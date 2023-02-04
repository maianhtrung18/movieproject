import axios from 'axios';
import { token } from '../../types/globalConst';


export const dangKyAction = (thongTinUser) => {

let dangKy = axios({
  method: 'post',
  url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
  data: thongTinUser,
  headers: {
    TokenCybersoft: token
  }
});

dangKy.then((result) => {
    // console.log(result.data)
    alert('Đăng ký thành công')
})
.catch((error)=> {
    alert(error.response.data.content)
})


}