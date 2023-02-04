import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { dangKyAction } from '../redux/action/dangKyAction';

export default function Registers() {

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "GP01",
            hoTen: ""
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được để trống'),
            matKhau: Yup.string().required('Mật khẩu không được để trống').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/,'Mật khẩu từ 6 đến 8 ký tự, có ký tự thường, ký tự in hoa, ký tự đặc biệt, ký tự số'),
            email: Yup.string().required('Email không được để trống'),
            soDt: Yup.string().required('Số điện thoại không được để trống'),
            hoTen: Yup.string().required('Họ tên không được để trống')
        }),
        onSubmit: values => {
            dangKyAction(values)
        },
    });

    return (
        <div className='container'>
            <h2 className='formTitle'>Đăng Ký</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Tài khoản</label>
                    <input onChange={formik.handleChange}
                        value={formik.values.taiKhoan} type="text" className="form-control" id="taiKhoan" />
                    {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                        <div>{formik.errors.taiKhoan}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input onChange={formik.handleChange}
                        value={formik.values.matKhau} type="password" className="form-control" id="matKhau" />
                    {formik.touched.matKhau && formik.errors.matKhau ? (
                        <div>{formik.errors.matKhau}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={formik.handleChange}
                        value={formik.values.email} type="email" className="form-control" id="email" />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input onChange={formik.handleChange}
                        value={formik.values.soDt} type="number" className="form-control" id="soDt" />
                    {formik.touched.soDt && formik.errors.soDt ? (
                        <div>{formik.errors.soDt}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Họ tên</label>
                    <input onChange={formik.handleChange}
                        value={formik.values.hoTen} type="text" className="form-control" id="hoTen" />
                    {formik.touched.hoTen && formik.errors.hoTen ? (
                        <div>{formik.errors.hoTen}</div>
                    ) : null}
                </div>
                <button type='submit' className="btn btn-primary">Đăng Ký</button>
            </form>

        </div>
    )
}
