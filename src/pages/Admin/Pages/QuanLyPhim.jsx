import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Table } from 'antd';
import { danhSachPhimAPI, xoaPhimAPI } from '../../../API/api';
import { history } from '../../../App';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { SELECT_EDIT_PHIM, TOKEN } from '../../../ulti/setting';
import { useDispatch } from 'react-redux';
import { maNhom } from '../../../types/globalConst';

export default function QuanLyPhim() {
    let arrDanhSachPhim = useRef([])
    let danhSachPhim = danhSachPhimAPI()
    let [listPhim, setListPhim] = useState([])
    let dispatch = useDispatch()

    let textSearch = useRef('')
    // let arrDSPhim = useRef([])

    // let catchArr = useMemo(() => arrDanhSachPhim,[])

    useEffect(() => {
        getDanhSachPhim()
    }, [])

    let getDanhSachPhim = () => {
        danhSachPhim.then((result) => {
            arrDanhSachPhim.current = result.data.content
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
                <><img style={{ width: '48px' }} src={hinhAnh} alt="" /></>
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
                <button className='quanLyPhim__button' onClick={() => {
                    let phim = listPhim.find((phim) => {
                        return phim.maPhim === maPhim
                    })
                    let action = {
                        type: SELECT_EDIT_PHIM,
                        data: {
                            tenPhim: phim.tenPhim,
                            trailer: phim.trailer,
                            moTa: phim.moTa,
                            maNhom: maNhom,
                            ngayKhoiChieu: phim.ngayKhoiChieu,
                            sapChieu: phim.sapChieu,
                            dangChieu: phim.dangChieu,
                            hot: phim.hot,
                            danhGia: phim.danhGia,
                            hinhAnh: phim.hinhAnh
                        }
                    }
                    dispatch(action)
                    history.push(`/edit/${maPhim}`)
                }}><EditOutlined /></button>
                <button className='quanLyPhim__button' onClick={() => {
                    xoaPhim(maPhim)
                }}><DeleteOutlined /></button>
                <button className='quanLyPhim__button' onClick={() => {
                    history.push(`./showtime/${maPhim}`)
                }}><CalendarOutlined /></button>
            </>
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    let renderDanhSachPhim = () => {
        setListPhim(arrDanhSachPhim.current)
    }
    return (
        <div className='quanLyPhim'>
            <h2>Quản Lý Phim</h2>
            <button onClick={() => {
                history.push('/addnew')
            }} className='btn btn-success'>Thêm Phim</button>
            <form style={{ display: "flex" }} onSubmit={(event) => {
                event.preventDefault()
            }}>
                <input onChange={(event) => {
                    textSearch.current = event.target.value
                }} className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <button onClick={() => {
                    let listPhimSearch = arrDanhSachPhim.current.filter(phim => {
                        return phim.tenPhim.toLowerCase().match(textSearch.current.toLowerCase())
                    })
                    setListPhim(listPhimSearch)

                }} className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <Table columns={columns} dataSource={listPhim} onChange={onChange} />
        </div>
    )
}
