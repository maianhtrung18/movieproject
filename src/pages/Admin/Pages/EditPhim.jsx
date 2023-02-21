import React, { useState } from 'react'
import Switch from "react-switch";
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import { maNhom } from '../../../types/globalConst';
import { updatePhimAPI, uploadPhimAPI } from '../../../API/api';
import { TOKEN } from '../../../ulti/setting';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { history } from '../../../App';
export default function EditPhim() {

    let phim = useSelector(state => state.phimReducer)
    let maPhim = useParams()

    // let [dangChieuState, setDangChieu] = useState(phim.dangChieu)
    // let [sapChieuState, setSapChieu] = useState(phim.sapChieu)
    // let [hotState, setHot] = useState(phim.hot)
    let [file, setFile] = useState({
        selectedFile: null
    })
    // let [showFile, setShowFile] = useState()
    // const [startDate, setStartDate] = useState(new Date());

    let [phimState, setPhimState] = useState(phim)
    console.log('phimState', phimState)

    const formik = useFormik({
        initialValues: {
            tenPhim: phimState.tenPhim,
            trailer: phimState.trailer,
            moTa: phimState.moTa,
            maNhom: maNhom,
            ngayKhoiChieu: phimState.ngayKhoiChieu,
            sapChieu: phimState.sapChieu,
            dangChieu: phimState.dangChieu,
            hot: phimState.hot,
            danhGia: phimState.danhGia,
            hinhAnh: {}
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required(),
            trailer: Yup.string().required(),
            moTa: Yup.string().required(),
        }),
        onSubmit: values => {
            let adminToken = localStorage.getItem(TOKEN)
            console.log('ds',maPhim)
            let formData = new FormData();
            formData.append('maPhim', maPhim.maphim)
            formData.append('tenPhim', phimState.tenPhim)
            formData.append('trailer', phimState.trailer)
            formData.append('moTa', phimState.moTa)
            formData.append('ngayKhoiChieu', phimState.ngayKhoiChieu)
            formData.append('sapChieu', phimState.sapChieu)
            formData.append('dangChieu', phimState.dangChieu)
            formData.append('hot', phimState.hot)
            formData.append('danhGia', phimState.danhGia)
            formData.append('maNhom', phimState.maNhom)
            formData.append('File', file.selectedFile)
            // updatePhimAPI
            // console.log('1234',{...formData})
            console.log(phimState)
            let themPhim = updatePhimAPI(formData, adminToken)
            themPhim.then((result) => {
                console.log(result)
                alert('Update thành công')
                history.push('/quanlyphim')
                history.go(0)
            }).catch((error) => {
                console.log(error)
            })
        }
    })

    let handleChange = (event) => {
        formik.handleChange(event)

        setPhimState({...phimState, [[event.target.name]]: event.target.value})
    }

    return (
        <div className='themMoiPhimContainer'>
            <h2>Chỉnh sửa phim</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                    <div className="form_NewFilm">
                        <label>Tên phim</label>
                        <input type="text" className="form-control" name='tenPhim' onChange={handleChange} value={phimState.tenPhim}/>
                    </div>
                    {formik.touched.tenPhim && formik.errors.tenPhim ? (
                        <div>{formik.errors.tenPhim}</div>
                    ) : null}
                </div>
                <div className='form-group'>
                    <div className="form_NewFilm">
                        <label>Trailer</label>
                        <input type="text" className="form-control" name='trailer' onChange={handleChange} value={phimState.trailer}/>

                    </div>
                    {formik.touched.trailer && formik.errors.trailer ? (
                        <div>{formik.errors.trailer}</div>
                    ) : null}
                </div>
                <div className='form-group'>
                    <div className="form_NewFilm">
                        <label>Mô tả</label>
                        <input type="text" className="form-control" name='moTa' onChange={handleChange} value={phimState.moTa}/>
                    </div>
                    {formik.touched.moTa && formik.errors.moTa ? (
                        <div>{formik.errors.moTa}</div>
                    ) : null}
                </div>
                <div className="form-group form_NewFilm">
                    <label>Ngày khởi chiếu</label>
                    <DatePicker dateFormat='dd/MM/yyyy' name='ngayKhoiChieu' selected={new Date(phimState.ngayKhoiChieu)} onChange={
                        (date) => {
                            setPhimState({...phimState, ngayKhoiChieu: date})
                        }
                    } className="form-control" />
                    {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
                        <div>{formik.errors.ngayKhoiChieu}</div>
                    ) : null}
                </div>
                <div className="form-group form_NewFilm">
                    <label>Đang chiếu</label>
                    <Switch onChange={() => {
                        setPhimState(phimState.dangChieu? {...phimState, dangChieu: false} : {...phimState, dangChieu:true})
                        // console.log(phimState)
                        // setDangChieu(dangChieuState ? false : true)

                    }} checked={phimState.dangChieu} />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Sắp chiếu</label>
                    <Switch onChange={() => {
                         setPhimState(phimState.sapChieu? {...phimState, sapChieu: false} : {...phimState, sapChieu:true})
                        // setSapChieu(sapChieuState ? false : true)
                    }} checked={phimState.sapChieu} />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Hot</label>
                    <Switch onChange={() => {
                        // setHot(hotState ? false : true)
                         setPhimState(phimState.hot? {...phimState, hot: false} : {...phimState, hot:true})
                    }} checked={phimState.hot} />
                </div>
                <div className="form-group form_NewFilm">
                    <label>Số sao</label>
                    <input type="text" className="form-control" name='danhGia' onChange={handleChange} value={phimState.danhGia} pattern="[1-9]{1}|[10]{2}" />
                    {formik.touched.danhGia && formik.errors.danhGia ? (
                        <div>{formik.errors.danhGia}</div>
                    ) : null}
                </div>
                <div className="form-group form_NewFilm">
                    <label>Hình ảnh</label>
                    <input onChange={(event) => {
                        // setShowFile(URL.createObjectURL(event.target.files[0]))
                        setPhimState({...phimState, hinhAnh: `${URL.createObjectURL(event.target.files[0])}`})
                        setFile({ selectedFile: event.target.files[0] })
                        // console.log('file',event.target.files[0])
                    }
                    } type="file" name='hinhAnh' />
                </div>
                <div className="form-group form_NewFilm">
                    <img src={phimState.hinhAnh} alt="" style={{ height: '200px' }} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
