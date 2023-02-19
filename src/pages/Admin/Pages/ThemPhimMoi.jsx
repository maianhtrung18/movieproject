import React, { useState } from 'react'
import Switch from "react-switch";
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import { maNhom } from '../../../types/globalConst';
import { uploadPhimAPI } from '../../../API/api';
import { TOKEN } from '../../../ulti/setting';
export default function ThemPhimMoi() {

    let [dangChieuState, setDangChieu] = useState(false)
    let [sapChieuState, setSapChieu] = useState(false)
    let [hotState, setHot] = useState(false)
    let [file, setFile] = useState({
        selectedFile: null
    })
    let [showFile, setShowFile] = useState()
    const [startDate, setStartDate] = useState(new Date());

    let startDay = new Date()

    // `${startDay.getDate()}/${startDay.getMonth()}/${startDay.getFullYear()}`,

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom: maNhom,
            ngayKhoiChieu: ``,
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required(),
            trailer: Yup.string().required(),
            moTa: Yup.string().required(),
        }),
        onSubmit: values => {
            console.log(values)
            let adminToken = localStorage.getItem(TOKEN)
            let formData = new FormData();
            formData.append('maPhim', '')
            formData.append('tenPhim', values.tenPhim)
            formData.append('moTa', values.moTa)
            formData.append('ngayKhoiChieu', startDate)
            formData.append('sapChieu', values.sapChieu)
            formData.append('dangChieu', values.dangChieu)
            formData.append('hot', values.hot)
            formData.append('danhGia', values.danhGia)
            formData.append('maNhom', values.maNhom)
            formData.append('File', file.selectedFile)
            let themPhim = uploadPhimAPI(formData, adminToken)
            console.log(file.selectedFile)
            themPhim.then((result) => {
                console.log(result)
            })
        }
    })

    return (
        <div className='themMoiPhimContainer'>

            <h2>Thêm mới phim</h2>

            <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                    <div className="form_NewFilm">
                        <label>Tên phim</label>
                        <input type="text" className="form-control" name='tenPhim' onChange={formik.handleChange} />

                    </div>
                    {formik.touched.tenPhim && formik.errors.tenPhim ? (
                        <div>{formik.errors.tenPhim}</div>
                    ) : null}
                </div>

                <div className='form-group'>
                    <div className="form_NewFilm">
                        <label>Trailer</label>
                        <input type="text" className="form-control" name='trailer' onChange={formik.handleChange} />

                    </div>
                    {formik.touched.trailer && formik.errors.trailer ? (
                        <div>{formik.errors.trailer}</div>
                    ) : null}
                </div>


                <div className='form-group'>
                    <div className="form_NewFilm">
                        <label>Mô tả</label>
                        <input type="text" className="form-control" name='moTa' onChange={formik.handleChange} />
                    </div>
                    {formik.touched.moTa && formik.errors.moTa ? (
                        <div>{formik.errors.moTa}</div>
                    ) : null}
                </div>

                <div className="form-group form_NewFilm">
                    <label>Ngày khởi chiếu</label>
                    <DatePicker dateFormat='dd/MM/yyyy' name='ngayKhoiChieu' selected={startDate} onChange={
                        (date) => {
                            setStartDate(date)
                        }
                    } className="form-control" />
                    {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
                        <div>{formik.errors.ngayKhoiChieu}</div>
                    ) : null}
                </div>
                <div className="form-group form_NewFilm">
                    <label>Đang chiếu</label>
                    <Switch onChange={() => {
                        setDangChieu(dangChieuState ? false : true)
                    }} checked={dangChieuState} />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Sắp chiếu</label>
                    <Switch onChange={() => {
                        setSapChieu(sapChieuState ? false : true)
                    }} checked={sapChieuState} />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Hot</label>
                    <Switch onChange={() => {
                        setHot(hotState ? false : true)
                    }} checked={hotState} />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Số sao</label>
                    <input type="text" className="form-control" name='danhGia' onChange={formik.handleChange} pattern="[1-9]{1}|[10]{2}" />

                    {formik.touched.danhGia && formik.errors.danhGia ? (
                        <div>{formik.errors.danhGia}</div>
                    ) : null}
                </div>
                <div className="form-group form_NewFilm">
                    <label>Hình ảnh</label>
                    <input onChange={(event) => {
                        setShowFile(URL.createObjectURL(event.target.files[0]))
                        setFile({ selectedFile: event.target.files[0] })
                    }

                    } type="file" name='hinhAnh' />

                </div>
                <div className="form-group form_NewFilm">
                    <img src={showFile} alt="" style={{ height: '200px' }} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


        </div>
    )
}
