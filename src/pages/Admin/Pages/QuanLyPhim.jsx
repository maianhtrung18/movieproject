import React, { useEffect, useState } from 'react'

import { Table } from 'antd';
import { danhSachPhimAPI, xoaPhimAPI } from '../../../API/api';
import { history } from '../../../App';
import { TOKEN } from '../../../ulti/setting';

export default function QuanLyPhim() {
    let arrDanhSachPhim = []
    let danhSachPhim = danhSachPhimAPI()
    
    let [listPhim, setListPhim] = useState([])

    useEffect(() => {
        getDanhSachPhim()
    }, [])

    let getDanhSachPhim = () => {
        danhSachPhim.then((result) => {
            arrDanhSachPhim = result.data.content
            renderDanhSachPhim()
        }).catch((error) => {
            console.log(error)
        })
    }

    let xoaPhim = (maPhim) => {
        let adminToken = localStorage.getItem(TOKEN)
        let xoaPhim = xoaPhimAPI(maPhim, adminToken)
        xoaPhim.then(() => {
            history.go(0)
        })
    }
    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            defaultSortOrder: 'descend',
            render: (hinhAnh) => 
                <><img style={{width: '48px'}} src={hinhAnh} alt="" /></>
            
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.maPhim - b.maPhim,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.moTa - b.moTa,
        },
        {
            title: 'Hành động',
            dataIndex: 'maPhim',
            render: (maPhim) => <>
                <button>edit</button>
                <button onClick={() => {
                    xoaPhim(maPhim)
                }}>dele</button></>
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    let renderDanhSachPhim = () => {
        setListPhim(arrDanhSachPhim)
    }
    return (
        <div className='quanLyPhim'>
            <h2>Quản Lý Phim</h2>
            <button onClick={() => {
                history.push('/addnew')
            }}className='btn btn-success'>Thêm Phim</button>
            <form style={{ display: "flex" }}>
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="button">Search</button>
            </form>
            <Table columns={columns} dataSource={listPhim} onChange={onChange}/>
        </div>
    )
}
