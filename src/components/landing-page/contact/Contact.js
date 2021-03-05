import React from 'react';
import './contact.scss';
import { Row, Col, Form, Input, InputNumber, Button } from 'antd'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default function Contact() {
  const onFinish = (values) => {
    // console.log(values);
  };
  return (
    <div id="contact">
      <Row className="contact__content">
        <Col className="contact__content-text" xs={24} sm={24} md={12}>
          <h1>CHI TIẾT LIÊN HỆ</h1>
          <p>Mọi phản hồi và đóng góp của bạn giúp chúng tôi tiếp tục cải thiện hệ thống. Xin chân thành cảm ơn</p>
        </Col>
        <Col className="contact__content-form" xs={24} sm={24} md={12}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={['user', 'name']}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'email']}
              label="Email"
              rules={[
                {
                  type: 'email',
                  required: true
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'message']} label="Message"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row className="contact__footer">
        <Col md={12} sm={24} xs={24} lg={6}>
          <h2>SOLUTIONS</h2>
          <ul className="contact__footer-list">
            <li>Webinar & Conference</li>
            <li>Pharma</li>
            <li>Smarthome</li>
            <li>Digital hygro thermometer</li>
            <li>Spirometer</li>
            <li>Event app</li>
            <li>ERP</li>
          </ul>
        </Col>
        <Col md={12} sm={24} xs={24} lg={6}>
          <h2>SERVICES</h2>
          <ul className="contact__footer-list">
            <li>Mobile App Development</li>
            <li>Web App Applications</li>
            <li>Product Engineering</li>
            <li>IT consulting</li>
          </ul>
        </Col>
        <Col md={12} sm={24} xs={24} lg={6}>
          <h2>COMPANY</h2>
          <ul className="contact__footer-list">
            <li>Abouts</li>
          </ul>
        </Col>
        <Col md={12} sm={24} xs={24} lg={6}>
          <h2>CONTACTS</h2>
          <ul className="contact__footer-list">
            <li>Adress: Số 1 Lê Thanh Nghị, phường Hòa Cường, quận Hải Châu, TP Đà Nẵng</li>
            <li>Phone: 0334.965.080</li>
            <li>Email: anhson2121999@gmail.com</li>
            <li>Website: https://www.giasudn.com</li>
          </ul>
        </Col>
      </Row>
    </div>
  )
}
