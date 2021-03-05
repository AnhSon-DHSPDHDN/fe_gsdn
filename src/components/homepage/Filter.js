import React, { useState } from 'react'
import { Row, Button, Modal, Checkbox } from 'antd';
import './homepage.scss';

export default function Filter() {
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
  return (
    <div className="filter">
      <Row justify="center">
        <input type="text" placeholder="Nhập tên gia sư..." className="filter__search"></input>
        <Button danger className="filter__button" onClick={showModal} >Bộ lọc</Button>
        <Button type="primary" className="filter__button">Tìm kiếm</Button>
        <Modal className="filter__modal" title="Bộ lọc"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <ul>
            <li style={{ marginTop: '20px' }}>
              <div>
                Giới tính:
                <Checkbox style={{ marginLeft: '20px' }}>Nam</Checkbox>
                <Checkbox>Nữ</Checkbox>
              </div>
            </li>
            <li style={{ marginTop: '20px' }}>
              <div>
                Mức lương:
                <Checkbox style={{ marginLeft: '20px' }}>Dưới 1tr5/tháng</Checkbox>
                <Checkbox>Trên 1tr5/tháng</Checkbox>
              </div>
            </li>
            <li style={{ marginTop: '20px' }}>
              <div>
                Chức vụ:
                <Checkbox style={{ marginLeft: '20px' }}>Sinh viên</Checkbox>
                <Checkbox>Giáo viên</Checkbox>
              </div>
            </li>
            <li style={{ marginTop: '20px' }}>
              <div>
                Môn:
                <Checkbox style={{ marginLeft: '20px' }}>Toán</Checkbox>
                <Checkbox>Lý</Checkbox>
                <Checkbox>Hóa</Checkbox>
                <Checkbox>Văn</Checkbox>
                <Checkbox>Sử</Checkbox>
                <Checkbox>Địa</Checkbox>
                <Checkbox>Tiếng Anh</Checkbox>
                <Checkbox>GDCD</Checkbox>
                <Checkbox>Sinh Học</Checkbox>
              </div>
            </li>
          </ul>
        </Modal>
      </Row>
    </div>
  )
}
