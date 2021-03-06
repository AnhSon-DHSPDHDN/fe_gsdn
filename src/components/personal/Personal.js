import { Col, Input, Row } from 'antd'
import { Button, Modal } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'

import './style.scss'
import { ModeViewProfile } from '../../configs/config';
import { Form } from 'antd';

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
  const [visibleButton, setVisibleButton] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const refInput = useRef()

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

  const handleUpfile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0])
      setVisibleButton(true)
    } else {
      setVisibleButton(false)
    }
  }
  const submitAvatar = () => {
    props.handleChangAvatar(avatarFile)
    setVisibleButton(false)
  }

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
              : <input
                style={{ display: 'none' }}
                type="file"
                id="input-avatar"
                name="avatar"
                onChange={handleUpfile}
                accept="image/png, image/jpeg"
                ref={refInput}
              >
              </input>
            }
            {
              mode === ModeViewProfile.ORTHER_PROFILE ? null
                : <Button onClick={() => refInput.current.click()}>Upload Avatar</Button>
            }
            {visibleButton ? <Button type="primary"
              onClick={submitAvatar}
              style={{ marginLeft: '10px' }}
            >
              L??u Avatar
              </Button> : null}
          </div>
        </Col>
        <Col span={16} className="right">
          <h2>{data ? 'Th??ng tin c?? nh??n' : 'Kh??ng c?? th??ng tin'}</h2>
          <div className="right__content">
            {data ?
              <ul>
                <li><HighlightOutlined /><p>{data?.description}</p></li>
                <li><HighlightOutlined /><b>T??n:</b> <p>{data?.fullName}</p></li>
                <li><HighlightOutlined /><b>Tu???i:</b> <p>{data?.age}</p></li>
                <li><HighlightOutlined /><b>?????a ch???:</b> <p>{data?.address}</p></li>
                <li><HighlightOutlined /><b>Email:</b> <p>{data?.email}</p></li>
                <li><HighlightOutlined /><b>H???c v???n:</b> <p>{data?.education}</p></li>
                <li><HighlightOutlined /><b>S??T:</b> <p>{data?.phone}</p></li>
                <li><HighlightOutlined /><b>Kinh nghi???m:</b> <p>{data?.experience}</p></li>
                <li><HighlightOutlined /><b>M??n d???y:</b> <p>{data?.subject.toString()}</p></li>
                <li><HighlightOutlined /><b>Gi???i t??nh:</b> <p>{data?.sex ? 'Nam' : 'N???'}</p></li>
                <li><HighlightOutlined /><b>{data?.isTeacher ? 'L?? gia s??!' : 'Kh??ng ph???i gia s??!'}</b></li>
                {data?.salary ?
                  <li><HighlightOutlined /><b>M???c l????ng mong mu???n:</b> <p>{data?.salary}</p></li>
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
      <Modal title="C???p nh???t th??ng tin c?? nh??n"
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
              label="M?? t???"
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
              label="T??n"
              rules={[
                {
                  required: true
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'age'} label="Tu???i"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input type="number" min={0} max={100} style={{ marginLeft: "0px" }} />
            </Form.Item>
            <Form.Item name={'address'} label="?????a ch???"
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
            <Form.Item name={'education'} label="H???c v???n"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'phone'} label="S??T"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'experience'} label="Kinh nghi???m"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'subject'} label="M??n d???y"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea placeholder="C??ch nhau b???i d???u ','" />
            </Form.Item>
            <Form.Item name={'isTeacher'} label="L?? gia s???">
              <Input type="checkbox" onChange={onChangeValueCheckbox} />
            </Form.Item>
            <Form.Item name={'sex'} label="L?? Nam?">
              <Input type="checkbox" onChange={onChangeValueSex} />
            </Form.Item>
            <Form.Item name={'salary'} label="M???c l????ng"
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
