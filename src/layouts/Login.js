import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import './login.scss'

export default function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className="login">
      <Row className="login__form">
        <Col className="login__form-image" xs={0} sm={0} md={10}>
        </Col>
        <Col className="login__form-form" xs={24} sm={24} md={14}>
          <Row justify='center'>
            <h1>LOGIN</h1>
          </Row>
          <Row justify='center'>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
              </Button>
                Or <Link to="register">register now!</Link>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
