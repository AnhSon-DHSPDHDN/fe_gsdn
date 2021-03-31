import { Col, Row, List, Avatar } from 'antd';
import React from 'react'

import './style.scss';

function NoMessenger() {
  return (
    <div className="list-member__non">
      Không có tin nhắn
    </div>
  )
}

export default function Messenger() {
  const data = [
    {
      title: 'Trần Văn Anh Sơn 1',
    },
    {
      title: 'Trần Văn Anh Sơn 2',
    },
    {
      title: 'Trần Văn Anh Sơn 3',
    },
    {
      title: 'Trần Văn Anh Sơn 4',
    },
  ];
  return (
    <div className="messenger homepage">
      <Row gutter={10} className="messenger-container">
        <Col span={8} className="left">
          <div className="list-member">
            {data.length < 1 ? <NoMessenger />
              : <List
                className="list-member__item"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={item.title}
                      description="Gia Sư"
                    />
                  </List.Item>
                )}
              >
              </List>
            }
          </div>
        </Col>
        <Col span={16} className="right">
          <div className="content-messenger">
            
          </div>
        </Col>
      </Row>
    </div>
  )
}
