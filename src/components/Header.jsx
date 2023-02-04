import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg navbar-dark">
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/home">Trang Chủ</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="#">Liên Hệ</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="#">Tin Tức</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="#">Ứng Dụng</NavLink>
                        </li>
                       
                    </ul>
                </div>
                <div className="reg_log">
                    <NavLink to='/registers'>Đăng Ký</NavLink>
                    /
                     <NavLink to='/login'>Đăng Nhập</NavLink>
                </div>
            </nav>

        </div>
    )
}
