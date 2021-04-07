import React, { useContext } from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axiosClient from '../untils/axiosClient'
import './login.scss'
import { Message } from '../configs/config';
import { InfoMeContext } from '../contexts/context/InfoMe';
import { TypeContextInfoMe } from '../configs/typeContext'

export default function Login() {
  const history = useHistory()
  const infoMeContext = useContext(InfoMeContext)
  const onFinish = async (values) => {
    await axiosClient.post('/login', { ...values })
      .then(res => {
        if (res.data.message === Message.TAI_KHOAN_OR_MK_SAI) {
          alert(Message.TAI_KHOAN_OR_MK_SAI);
        } else if (res.data.message === Message.DANG_NHAP_THANH_CONG) {
          localStorage.setItem('access-token', res.data.access_token);
        } else throw new Error()
      }).catch(err => {
        alert(Message.CO_LOI_KHI_DANG_NHAP)
      })
    await axiosClient.get('/login/me')
      .then(async res => {
        if (res.status === 200) {
          await infoMeContext.dispatch({
            type: TypeContextInfoMe.GET_INFO_ME,
            data: res.data
          })
          history.push('/home')
        } else throw new Error()
      }).catch(err => {
        console.log(err);
      })
  };
  if (localStorage.getItem('me')) {
    return <Redirect to="/home" />
  }
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
