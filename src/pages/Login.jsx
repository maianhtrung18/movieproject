import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { dangNhapAction } from '../redux/action/dangNhapAction';
import { useDispatch } from 'react-redux';


export default function Login() {
  let dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: ''
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Tài khoản không được để trống'),
      matKhau: Yup.string().required('Mật khẩu không được để trống')
    }),
    onSubmit: values => {
      let action = dangNhapAction(values)
      dispatch(action)
    },
  });
  return (
    <div className='container'>
      <h2 className='formTitle'>Đăng Nhập</h2>
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
        <button type='submit' className="btn btn-primary">Đăng Nhập</button>
      </form>
    </div>
  )
}
