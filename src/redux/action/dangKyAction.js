import { dangKyAPI } from '../../API/api';
import { history } from '../../App';

export const dangKyAction = (thongTinUser) => {

let dangKy = dangKyAPI(thongTinUser)

dangKy.then((result) => {
    alert('Đăng ký thành công')
    history.push('/home')
})
.catch((error)=> {
    alert(error.response.data.content)
})


}