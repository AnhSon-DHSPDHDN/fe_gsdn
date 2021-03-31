import React from 'react';
import { Row, Col, Button } from 'antd';
import './homepage.scss';
import Logo from '../../assets/imgs/logoText.png'
import VN from '../../assets/imgs/VN.png'
import Avatar from '../../assets/imgs/avatar.jpg'
import { Input } from 'antd'
import { Link } from 'react-router-dom'
import MessageOutlined from '../../assets/imgs/messageImage.png'

export default function Navbar() {
  const onSearch = value => console.log(value);
  return (
    <div className="navbar">
      <Row justify="space-around" className="navbar__main">
        <div className="navbar__main-left">
          <Row>
            <Col span={10}>
              <img src={Logo}></img>
            </Col>
            <Col span={14}>
              <Input.Search
                placeholder="Tìm kiếm..."
                allowClear
                onSearch={onSearch}
              />
            </Col>
          </Row>
        </div>
        <div className="navbar__main-right">
          <Row>
            <ul>
              <li><img src={VN} style={{ borderRadius: '0%', width: '50px' }}></img></li>
              <li><Link to="/home/me">Trang cá nhân</Link></li>
              <li><Link to="/home">Thuê gia sư</Link></li>
              <li><Link to="/home/messenger"><div className="icon-image">
                <img src={MessageOutlined}></img>
                <div className="notification">12</div>
              </div></Link></li>
              <li><img src={Avatar}></img></li>
              <li><Button type="primary">Đăng xuất</Button></li>
            </ul>
          </Row>
        </div>
      </Row>
    </div>
  )
}
