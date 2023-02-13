import { DANG_NHAP, DANG_XUAT, userMovie } from "../../ulti/setting"

let usLogin = null;

if (localStorage.getItem(userMovie)) {
    //co local storage => da login 
    usLogin = JSON.parse(localStorage.getItem(userMovie))
}
const initialState = {
    userLogin: usLogin
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case DANG_NHAP:
            // console.log(action.userLogin)
            state.userLogin = action.userLogin
            return { ...state }

        case DANG_XUAT:
            // console.log(action.userLogin)
            state.userLogin = action.userLogin
            return { ...state }

        default:
            return state
    }
}
