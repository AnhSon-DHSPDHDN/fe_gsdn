import React from 'react'
import { Row, Col } from 'antd';
import './member.scss';
import Avatar from '../../../assets/imgs/avatar.jpg'

const dataMember = [
  {
    id: 1,
    avatar: Avatar,
    name: 'Trần Văn Anh Sơn',
    information: 'Developer tại Acexis Company'
  },
  {
    id: 2,
    avatar: Avatar,
    name: 'Trần Văn Anh Sơn',
    information: 'Developer tại Acexis Company'
  },
  {
    id: 3,
    avatar: Avatar,
    name: 'Trần Văn Anh Sơn',
    information: 'Developer tại Acexis Company'
  },
  {
    id: 4,
    avatar: Avatar,
    name: 'Trần Văn Anh Sơn',
    information: 'Developer tại Acexis Company'
  }
]

export default function Member() {
  const mapMemberContent = (data) => {
    let result = <></>
    if (data) {
      result = data.map((data, index) => {
        let classStyle = 'left';
        if (index % 2 !== 0) classStyle = 'right';
        return <Col className={classStyle} md={12} xs={24} sm={24} key={index}>
          <img src={data.avatar}></img>
          <h3>{data.name}</h3>
          <p>{data.information}</p>
        </Col>
      })
    }
    return result
  }
  return (
    <div id="member">
      <Row justify='center'>
        <h1>ĐỘI NGŨ PHÁT TRIỂN</h1>
      </Row>
      <Row className="member__contents" justify="center">
        {mapMemberContent(dataMember)}
      </Row>
    </div>
  )
}
