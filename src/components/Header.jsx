import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import UserName from '../pages/Home/UserName'

export default function Header() {

    let { userLogin } = useSelector(state => state.loginReducer)
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

                <UserName userLogin={userLogin} />

            </nav>

        </div>
    )
}
