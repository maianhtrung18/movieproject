import axios from 'axios';

export const dangKyAction = (thongTinUser) => {

let dangKy = axios({
  method: 'post',
  url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
  data: thongTinUser,
  headers: {
    TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNiIsIkhldEhhblN0cmluZyI6IjE0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4OTI5MjgwMDAwMCIsIm5iZiI6MTY2MDE1MDgwMCwiZXhwIjoxNjg5NDQwNDAwfQ.nvrySbONO7THMJnLTWgEwiGszUF7VXjBUnn36QUuwsQ'
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