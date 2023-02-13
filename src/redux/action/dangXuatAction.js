import { history } from "../../App"
import { DANG_XUAT, TOKEN, userMovie } from "../../ulti/setting"

export const dangXuatAction = () => {
    return (dispatch2) => {

        localStorage.removeItem(TOKEN)
        localStorage.removeItem(userMovie)

        history.push('/home')
        let action = {
            type: DANG_XUAT,
            userLogin: null
        }
        dispatch2(action)

    }
}