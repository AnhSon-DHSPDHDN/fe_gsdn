import { Col, Input, Row } from 'antd'
import { Upload, message, Button, Modal } from 'antd';
import { HighlightOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import Avatar from '../../assets/imgs/avatar.jpg';

import './style.scss'

export default function Personal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const props = {
    // name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-file',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div className="personal homepage">
      <Row gutter={24} className="personal__container">
        <Col span={8} className="left">
          <div className="left__avatar">
            <img src={Avatar}></img>
            <h2>Trần Văn Anh Sơn</h2>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          </div>
        </Col>
        <Col span={16} className="right">
          <h2>Thông tin cá nhân</h2>
          <div className="right__content">
            <ul>
              <li><HighlightOutlined /><p>Đừng dừng lại khi mệt mỏi, chỉ dừng lại khi đã xong. Là một con người, ắt hẳn có đôi lúc bạn sẽ cảm thấy mệt mỏi, thậm chí muốn bỏ cuộc. Đặc biệt là khi mọi việc diễn ra không tốt đẹp. Và những gì giúp bạn thành công chỉ có thể là kiên trì.</p></li>
              <li><HighlightOutlined /><b>Tên:</b> <p>Trần Văn Anh Sơn</p></li>
              <li><HighlightOutlined /><b>Tuổi:</b> <p>22</p></li>
              <li><HighlightOutlined /><b>Địa chỉ:</b> <p>Hướng Hóa - Quảng Trị</p></li>
              <li><HighlightOutlined /><b>Email:</b> <p>anhson2121999@gmail.com</p></li>
              <li><HighlightOutlined /><b>Học vấn:</b> <p>Cử nhân CNTT - ĐHSP - ĐHĐN</p></li>
              <li><HighlightOutlined /><b>SĐT:</b> <p>0334965080</p></li>
              <li><HighlightOutlined /><b>Kinh nghiệm:</b> <p>1 year+ Dev parttime Acexis company, 2 month QC Leader</p></li>
              <li><HighlightOutlined /><b>Môn dạy:</b> <p>Toán, Lý, Hóa, Sinh, Văn, Sử, Địa</p></li>
              <li><HighlightOutlined /><b>Là gia sư:</b> <p>True</p></li>
            </ul>
            <div className="right__content-update">
              <Button type="primary" onClick={showModal}>Update</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Modal title="Cập nhật thông tin cá nhân"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="update-info">
          <ul>
            <li><HighlightOutlined /><b>Mô tả:</b> <Input.TextArea type="text"></Input.TextArea></li>
            <li><HighlightOutlined /><b>Tên:</b> <Input type="text"></Input> </li>
            <li><HighlightOutlined /><b>Tuổi:</b> <Input type="text"></Input> </li>
            <li><HighlightOutlined /><b>Địa chỉ:</b> <Input type="text"></Input> </li>
            <li><HighlightOutlined /><b>Email:</b> <Input type="text"></Input> </li>
            <li><HighlightOutlined /><b>Học vấn:</b> <Input type="text"></Input> </li>
            <li><HighlightOutlined /><b>SĐT:</b> <Input type="text"></Input> </li>
            <li><HighlightOutlined /><b>Kinh nghiệm:</b> <Input type="text"></Input> </li>
            <li><HighlightOutlined /><b>Môn dạy:</b> <Input type="text"></Input> </li>
            <li><HighlightOutlined /><b>Là gia sư:</b> <Input type="text"></Input></li>
          </ul>
        </div>
      </Modal>
    </div>
  )
}
