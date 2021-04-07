import React, { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import './homepage.scss';
import Logo from '../../assets/imgs/logoText.png'
import VN from '../../assets/imgs/VN.png'
import Avatar from '../../assets/imgs/avatar.jpg'
import { Input } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import MessageOutlined from '../../assets/imgs/messageImage.png';
import { InfoMeContext } from '../../contexts/context/InfoMe'
import { TypeContextInfoMe } from '../../configs/typeContext';

export default function Navbar() {
  const history = useHistory()
  const infoMeContext = useContext(InfoMeContext)
  const onSearch = value => console.log(value);
  const onLogout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('me');
    infoMeContext.dispatch({
      type: TypeContextInfoMe.CLEAR_INFO_ME
    })
    history.push('/login')
  }
  const avatar = JSON.parse(localStorage.getItem('me')).avatar
  return (
    <div className="navbar">
      <Row justify="space-around" className="navbar__main">
        <div className="navbar__main-left">
          <Row>
            <Col span={10}>
              <Link to="/home">
                <img src={Logo}></img>
              </Link>
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
              <li><img src={infoMeContext.data?.avatar !== '' ?
                infoMeContext.data?.avatar : avatar
              }></img></li>
              <li><Button type="primary" onClick={onLogout}>Đăng xuất</Button></li>
            </ul>
          </Row>
        </div>
      </Row>
    </div>
  )
}
