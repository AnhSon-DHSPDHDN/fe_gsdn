import React from 'react'
import { Row, Col } from 'antd';
import image from '../../assets/imgs/avatar.jpg'
import { LikeTwoTone, CrownTwoTone } from '@ant-design/icons'
import './homepage.scss'

export default function Main() {
  return (
    <div className="main-homepage">
      <Row className="main-homepage__list">
        <h1 className="main-homepage__list-title">GIA SƯ HIỆN TẠI</h1>
      </Row>
      <Row className="main-homepage__list-member">
        <Col xs={24} sm={12} md={12} lg={6} className="card">
          <div className="card__content">
            <img className="card__content-img" src={image}></img>
            <h3 className="card__content-name">Trần Văn Anh Sơn</h3>
            <div className="card__content-info">
              <CrownTwoTone /> Sinh viên đại học sư phạm - Đại học Đà Nẵng
            </div>
            <div className="card__content-subject">
              <LikeTwoTone /> Toán, Lý, Hóa, Sinh, Văn, Sử, Địa, GDCD
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} className="card">
          <div className="card__content">
            <img className="card__content-img" src={image}></img>
            <h3 className="card__content-name">Trần Văn Anh Sơn</h3>
            <div className="card__content-info">
              <CrownTwoTone /> Sinh viên đại học sư phạm - Đại học Đà Nẵng
            </div>
            <div className="card__content-subject">
              <LikeTwoTone /> Toán, Lý, Hóa, Sinh, Văn, Sử, Địa, GDCD
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} className="card">
          <div className="card__content">
            <img className="card__content-img" src={image}></img>
            <h3 className="card__content-name">Trần Văn Anh Sơn</h3>
            <div className="card__content-info">
              <CrownTwoTone /> Sinh viên đại học sư phạm - Đại học Đà Nẵng
            </div>
            <div className="card__content-subject">
              <LikeTwoTone /> Toán, Lý, Hóa, Sinh, Văn, Sử, Địa, GDCD
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} className="card">
          <div className="card__content">
            <img className="card__content-img" src={image}></img>
            <h3 className="card__content-name">Trần Văn Anh Sơn</h3>
            <div className="card__content-info">
              <CrownTwoTone /> Sinh viên đại học sư phạm - Đại học Đà Nẵng
            </div>
            <div className="card__content-subject">
              <LikeTwoTone /> Toán, Lý, Hóa, Sinh, Văn, Sử, Địa, GDCD
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
