import React, { useEffect, useState } from 'react'

import { Table } from 'antd';
import { danhSachPhimAPI } from '../../../API/api';
import { history } from '../../../App';

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
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => a.maPhim - b.maPhim,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => a.moTa - b.moTa,
        },
        {
            title: 'Hành động',
            dataIndex: 'maPhim',
            render: (maPhim) => <>
                <button>edit</button>
                <button>dele</button></>
        },
    ];
    const data = [
        {
            key: '1',
            maPhim: 'John Brown',
            hinhAnh: 32,
            tenPhim: 'New York No. 1 Lake Park',
            moTa: 'jdshjhdkjs d',
        },
        {
            key: '2',
            maPhim: 'Jim Green',
            hinhAnh: 42,
            tenPhim: 'London No. 1 Lake Park',
            moTa: 'jdshjhdkjs d',

        },
        {
            key: '3',
            maPhim: 'Joe Black',
            hinhAnh: 32,
            tenPhim: 'Sydney No. 1 Lake Park',
            moTa: 'jdshjhdkjs d'
        },
        {
            key: '4',
            maPhim: 'Jim Red',
            hinhAnh: 32,
            tenPhim: 'London No. 2 Lake Park',
            moTa: 'jdshjhdkjs d'
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    let renderDanhSachPhim = () => {
        // console.log('danh sach phim', arrDanhSachPhim)
        setListPhim(arrDanhSachPhim)
    }
    return (
        <div className='quanLyPhim'>
            <h2>Quản Lý Phim</h2>
            <button className='btn btn-success'>Thêm Phim</button>
            <form style={{ display: "flex" }}>
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="button">Search</button>
            </form>
            <Table columns={columns} dataSource={listPhim} onChange={onChange} />;
        </div>
    )
}
