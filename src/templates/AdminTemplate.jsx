import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';
import { useSelector } from 'react-redux';
import UserName from '../pages/Home/UserName';
import { quanTri } from '../types/globalConst';
import { history } from '../App';
const { Header, Sider, Content } = Layout;


export default function AdminTemplate(props) {
    let { userLogin } = useSelector(state => state.loginReducer)
    const [current, setCurrent] = useState('1');
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setSelectedMenu()
    })
     
    let setSelectedMenu = () => {
        if (history.location.pathname === '/quanlyphim') {
            setCurrent('2')
        }
        else if (history.location.pathname === '/addnew') {
            setCurrent('3')
        }
    }

    if (userLogin.maLoaiNguoiDung === quanTri) {
        return (
            <Route exact path={props.path} render={(propsRoute) => {
                return <>
                    <Layout>
                        <Sider trigger={null} collapsible collapsed={collapsed}>
                            <div className="logo" />
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                selectedKeys={[current]}
                                onClick={(result) => {
                                    if (result.key === '2') {
                                        history.push('/quanlyphim')
                                        setCurrent(result.key)
                                    } else if (result.key === '3') {
                                        history.push('/addnew')
                                        setCurrent(result.key)
                                    }

                                }}
                                items={[
                                    {
                                        key: '1',
                                        icon: <UserOutlined />,
                                        label: 'Users',
                                    },
                                    {
                                        key: '2',
                                        icon: <VideoCameraOutlined />,
                                        label: 'List Films',
                                    },
                                    {
                                        key: '3',
                                        icon: <VideoCameraOutlined />,
                                        label: 'Add Films',
                                    },
                                    {
                                        key: '4',
                                        icon: <UploadOutlined />,
                                        label: 'Showtime',
                                    }
                                ]}
                            />
                        </Sider>
                        <Layout className="site-layout" style={{ height: '100vh' }}>
                            <Header className='adminHeader'>
                                {collapsed ? <MenuUnfoldOutlined onClick={() => {
                                    setCollapsed(!collapsed)
                                }} /> : <MenuFoldOutlined onClick={() => {
                                    setCollapsed(!collapsed)
                                }} />}
                                <UserName userLogin={userLogin} />
                            </Header>
                            <Content style={{ overflow: 'scroll' }}>
                                <div>
                                    <props.component {...propsRoute.component} />
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </>
            }}>

            </Route>
        )
    } else {
        return (
            <h2>Bạn không có quyền vào trang này</h2>
        )
    }

}
