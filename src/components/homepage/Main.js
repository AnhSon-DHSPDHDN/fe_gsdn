import React from 'react'
import { Row, Col } from 'antd';
import { LikeTwoTone, CrownTwoTone } from '@ant-design/icons'
import './homepage.scss'
import { Link } from 'react-router-dom';

export default function Main(props) {
  const { data } = props;
  const mapDataToView = (data) => {
    let result = <></>;
    const fakeDataNull = ['', '', '', ''];
    if (data.length === 0) {
      result = fakeDataNull.map((fake, index) => {
        return <Col xs={24} sm={12} md={12} lg={6} className="card" key={index}>
          <div className="card__content">
            <img className="card__content-img"></img>
            <h3 className="card__content-name"></h3>
            <div className="card__content-info">
              <CrownTwoTone />
            </div>
            <div className="card__content-subject">
              <LikeTwoTone />
            </div>
            <div className="card__salary">
            </div>
          </div>
        </Col>
      })
    }
    if (data.length > 0) {
      result = data.map((data, index) => {
        return <Col xs={24} sm={12} md={12} lg={6} className="card"
          key={index}
        >
          <Link to={`/home/profile/${data?._id}`}>
            <div className="card__content">
              <img className="card__content-img" src={data?.avatar}></img>
              <h3 className="card__content-name">{data?.fullName}</h3>
              <div className="card__content-info">
                <CrownTwoTone /> {data?.description}
              </div>
              <div className="card__content-subject">
                <LikeTwoTone /> {data?.subject?.toString()}
              </div>
              <div className="card__salary">
                {data?.salary} VNĐ/Tháng
              </div>
            </div>
          </Link>
        </Col>
      })
    }
    return result;
  }
  return (
    <div className="main-homepage">
      <Row className="main-homepage__list">
        <h1 className="main-homepage__list-title">GIA SƯ HIỆN TẠI</h1>
      </Row>
      <Row className="main-homepage__list-member">
        {mapDataToView(data)}
      </Row>
    </div>
  )
}
