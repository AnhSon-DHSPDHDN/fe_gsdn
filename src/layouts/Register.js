import React, { useState } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Select,
  Row,
  Col,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import './login.scss';
import axiosClient from '../untils/axiosClient';
import { Message } from '../configs/config';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


export default function Register() {
  const [form] = Form.useForm();
  const history = useHistory()
  const backToLogin = () => {
    history.push('/login')
  }

  const onFinish = (values) => {
    axiosClient.post('/users', { ...values })
      .then(res => {
        console.log(res.data);
        if (res.data.message === Message.DANG_KY_THANH_CONG) {
          alert(Message.DANG_KY_THANH_CONG)
          history.push('/login')
        } else if (res.data.message === Message.TAI_KHOAN_TON_TAI) {
          alert(Message.TAI_KHOAN_TON_TAI)
        } else throw new Error()
      }).catch(err => {
        alert(Message.LOI_SERVER)
      })
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="register">
      <Row justify='center' className="register__form">
        <Col className="register__form-image" xs={0} sm={0} md={10}>
        </Col>
        <Col className="register__form-form" xs={24} sm={24} md={14}>
          <Row justify="center">
            <h1>REGISTER</h1>
          </Row>
          <Row justify="center">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="username"
                label={
                  <span>
                    Username&nbsp;
            <Tooltip title="What do you want others to call you?">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
            </Button>
                <Button danger onClick={backToLogin}>
                  Back to login
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
