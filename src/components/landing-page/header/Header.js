import React from 'react';
import { Row, Col } from 'antd';
import './header.scss';
import Banner from './Banner';

export default function Header() {
  return (
    <div id="header">
      <Row className="header__container">
        <Col md={12} sm={24}>
          <img
            className="header__container-logo"
            src={process.env.PUBLIC_URL + '/img/LogoHome.png'}>
          </img>
        </Col>
        <Col className="header__container-menu" md={12} sm={24}>
          <ul className="header__container-menu-list">
            <li><a href="#about">Về chúng tôi</a></li>
            <li><a href="#mission">Sứ mệnh</a></li>
            <li><a href="#member">Đội ngũ</a></li>
            <li><a href="#contact">Liên hệ</a></li>
            <li className="active"><a>Bắt đầu</a></li>
          </ul>
        </Col>
      </Row>
      <Banner />
    </div>
  )
}
