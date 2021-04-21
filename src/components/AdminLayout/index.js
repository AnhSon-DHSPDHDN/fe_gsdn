import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import axiosClient from '../../untils/axiosClient';
import { InfoMeContext } from '../../contexts/context/InfoMe';
import { TypeContextInfoMe } from '../../configs/typeContext';

const { Header, Content, Footer, Sider } = Layout;

function Admin({ children }) {
  const { data, dispatch } = useContext(InfoMeContext)
  const [collapsed, setCollapsed] = useState(false);
  const [userAuthor, setUserAuthor] = useState(null)
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const fetchInforUser = () => {
    axiosClient.get('/login/me')
      .then(res => {
        if (res.status === 200) {
          setUserAuthor(res.data)
          dispatch({
            type: TypeContextInfoMe.GET_INFO_ME,
            data: res.data
          });
        } else throw new Error()
      }).catch(error => {
        console.log(error);
      })
  }
  useEffect(() => {
    fetchInforUser()
  }, [])
  if (userAuthor && userAuthor._idRole !== "admin") {
    // console.log('no permision');
    return <Redirect to="/home"></Redirect>
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/admin">
              Tổng quan
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="/admin/teacher">
              Gia Sư
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            <Link to="/admin/customer">
              Người dùng
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<DesktopOutlined />}>
            <Link to="/admin/users">
              Users
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FileOutlined />}>
            <Link to="/admin/news">
              News
            </Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FileOutlined />}>
            <Link to="/admin/developer">
              Developer
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Trần Văn Anh Sơn - GSDN - 2021</Footer>
      </Layout>
    </Layout>
  )
}

export default React.memo(Admin)