import { Col, Input, Row } from 'antd'
import { Upload, message, Button, Modal } from 'antd';
import { HighlightOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'

import './style.scss'
import { ModeViewProfile } from '../../configs/config';
import { Form } from 'antd';
import axiosClient from '../../untils/axiosClient'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
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

export default function Personal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false)
  const [isMale, setisMale] = useState(false)
  const { mode, data } = props
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    const customer = {
      ...values,
      isTeacher: isTeacher,
      sex: isMale,
      salary: values.salary === undefined ? null : parseInt(values.salary),
      subject: values.subject.split(',')
    }
    await props.updateDataCustomer(customer)
    form.resetFields()
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const propsUpload = {
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
  function onChangeValueCheckbox(e) {
    setIsTeacher(e.target.checked)
  }
  function onChangeValueSex(e) {
    setisMale(e.target.checked)
  }

  useEffect(() => {
    form.setFieldsValue({
      "description": data?.description,
      "fullName": data?.fullName,
      "age": data?.age,
      "address": data?.address,
      "email": data?.email,
      "education": data?.education,
      "phone": data?.phone,
      "experience": data?.experience,
      "subject": data?.subject.toString(),
      "salary": data?.salary
    })
  }, [form, data])

  return (
    <div className="personal homepage">
      <Row gutter={24} className="personal__container">
        <Col span={8} className="left">
          <div className="left__avatar">
            <img src={data?.avatar || JSON.parse(localStorage.getItem('me')).avatar}></img>
            <h2>{data?.fullName}</h2>
            {mode === ModeViewProfile.ORTHER_PROFILE ? null
              : <Upload {...propsUpload}>
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            }
          </div>
        </Col>
        <Col span={16} className="right">
          <h2>{data ? 'Thông tin cá nhân' : 'Không có thông tin'}</h2>
          <div className="right__content">
            {data ?
              <ul>
                <li><HighlightOutlined /><p>{data?.description}</p></li>
                <li><HighlightOutlined /><b>Tên:</b> <p>{data?.fullName}</p></li>
                <li><HighlightOutlined /><b>Tuổi:</b> <p>{data?.age}</p></li>
                <li><HighlightOutlined /><b>Địa chỉ:</b> <p>{data?.address}</p></li>
                <li><HighlightOutlined /><b>Email:</b> <p>{data?.email}</p></li>
                <li><HighlightOutlined /><b>Học vấn:</b> <p>{data?.education}</p></li>
                <li><HighlightOutlined /><b>SĐT:</b> <p>{data?.phone}</p></li>
                <li><HighlightOutlined /><b>Kinh nghiệm:</b> <p>{data?.experience}</p></li>
                <li><HighlightOutlined /><b>Môn dạy:</b> <p>{data?.subject.toString()}</p></li>
                <li><HighlightOutlined /><b>Giới tính:</b> <p>{data?.sex ? 'Nam' : 'Nữ'}</p></li>
                <li><HighlightOutlined /><b>{data?.isTeacher ? 'Là gia sư!' : 'Không phải gia sư!'}</b></li>
                {data?.salary ?
                  <li><HighlightOutlined /><b>Mức lương mong muốn:</b> <p>{data?.salary}</p></li>
                  : null
                }
              </ul>
              : null
            }
            <div className="right__content-update">
              {mode === ModeViewProfile.ORTHER_PROFILE ? null
                : <Button type="primary" onClick={showModal}>Update</Button>
              }
            </div>
          </div>
        </Col>
      </Row>
      <Modal title="Cập nhật thông tin cá nhân"
        visible={isModalVisible}
        onCancel={handleCancel}
        forceRender
        footer={[
          <Button type="primary" onClick={handleCancel} htmlType="submit" key={1}>
            Cancel
          </Button>
        ]}
      >
        <div className="update-info">
          <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={'description'}
              label="Mô tả"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name={'fullName'}
              label="Tên"
              rules={[
                {
                  required: true
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'age'} label="Tuổi"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input type="number" min={0} max={100} style={{ marginLeft: "0px" }} />
            </Form.Item>
            <Form.Item name={'address'} label="Địa chỉ"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'email'} label="Email"
              rules={[
                {
                  type: 'email',
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'education'} label="Học vấn"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'phone'} label="SĐT"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'experience'} label="Kinh nghiệm"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'subject'} label="Môn dạy"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea placeholder="Cách nhau bởi dấu ','" />
            </Form.Item>
            <Form.Item name={'isTeacher'} label="Là gia sư?">
              <Input type="checkbox" onChange={onChangeValueCheckbox} />
            </Form.Item>
            <Form.Item name={'sex'} label="Là Nam?">
              <Input type="checkbox" onChange={onChangeValueSex} />
            </Form.Item>
            <Form.Item name={'salary'} label="Mức lương"
            >
              <Input disabled={!isTeacher} type="number" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}
