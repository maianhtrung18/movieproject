import { dangNhapAPI } from "../../API/api"
import { history } from "../../App"
import { quanTri } from "../../types/globalConst"
import { DANG_NHAP, TOKEN, userMovie } from "../../ulti/setting"


export const dangNhapAction = (thongTinUser) => {

    return (dispatch2) => {
        let dangNhap = dangNhapAPI(thongTinUser)
        dangNhap.then((result) => {
            localStorage.setItem(TOKEN, result.data.content.accessToken)
            let userJson = JSON.stringify(result.data.content)
            localStorage.setItem(userMovie, userJson)

            if (result.data.content.maLoaiNguoiDung === quanTri) {
                history.push('/quanlyphim')
            } else {
                history.push('/home')
            }

            let action = {
                type: DANG_NHAP,
                userLogin: result.data.content
            }
            dispatch2(action)

        })
            .catch((error) => {
                console.log(error.response.data.content)
                alert(error.response.data.content)
            })
    }
}
