import React, { useState } from 'react'
import Switch from "react-switch";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function ThemPhimMoi() {

    let [dangChieu, setDangChieu] = useState(false)
    let [sapChieu, setSapChieu] = useState(false)
    let [hot, setHot] = useState(false)
    const [startDate, setStartDate] = useState(new Date());

    let handleCheckedChange = () => {
        setDangChieu(dangChieu ? false : true)
    }

    return (
        <div className='themMoiPhimContainer'>

            <h2>Thêm mới phim</h2>

            <form>
                <div className="form-group form_NewFilm">
                    <label>Tên phim</label>
                    <input type="text" className="form-control" />

                </div>
                <div className="form-group form_NewFilm">
                    <label>Trailer</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Mô tả</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Ngày khởi chiếu</label>
                    <DatePicker dateFormat='dd/MM/yyyy' selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Đang chiếu</label>
                    <Switch onChange={() => {
                        setDangChieu(dangChieu ? false : true)
                    }} checked={dangChieu} />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Sắp chiếu</label>
                    <Switch onChange={() => {
                        setSapChieu(sapChieu ? false : true)
                    }} checked={sapChieu} />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Hot</label>
                    <Switch onChange={() => {
                        setHot(hot ? false : true)
                    }} checked={hot} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


        </div>
    )
}
