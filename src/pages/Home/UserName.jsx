import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { dangXuatAction } from '../../redux/action/dangXuatAction'


export default function UserName(props) {
let dispatch = useDispatch()
    if (props.userLogin === null) {
        return (
            <div className="reg_log">
                <NavLink to='/registers'>Đăng Ký</NavLink>
                /
                <NavLink to='/login'>Đăng Nhập</NavLink>
            </div>
        )
    }else{
        return <div className='reg_log'><div className='header_taikhoan'>{props.userLogin.taiKhoan}</div>
        /
        <NavLink onClick={() =>{
                let action = dangXuatAction()
                dispatch(action)
            }} to='/home'>Đăng xuất</NavLink>
            
        </div>
        
    }

}
