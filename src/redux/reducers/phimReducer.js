import { maNhom } from "../../types/globalConst"
import { SELECT_EDIT_PHIM } from "../../ulti/setting"

const initialState = {
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom: maNhom,
            ngayKhoiChieu: ``,
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: ''
        }

export const phimReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_EDIT_PHIM:
            return {...action.data}

        default:
            return state
    }
}
