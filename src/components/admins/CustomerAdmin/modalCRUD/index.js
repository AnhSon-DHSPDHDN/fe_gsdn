import { Form, Input, Modal, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axiosClient from '../../../../untils/axiosClient';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ModalCRUD = forwardRef(({
  reload
}, ref) => {


  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [rowSelection, setRowSelection] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false)
  const [isMale, setisMale] = useState(false)

  function onChangeValueCheckbox(e) {
    setIsTeacher(e.target.checked)
  }
  function onChangeValueSex(e) {
    setisMale(e.target.checked)
  }

  useImperativeHandle(ref, () => ({
    handleOpen
  }))

  useEffect(() => {
    if (!rowSelection) return;
    form.setFieldsValue(rowSelection);
  }, [rowSelection])

  const handleOpen = row => {
    if (row) setRowSelection(row)
    else setRowSelection(null);
    setVisible(true);
  }

  const handleClose = () => {
    setVisible(false);
    setRowSelection(null);
    form.resetFields()
  }

  const handleSubmit = () => {
    form.submit();
  }

  const handleFinish = values => {
    const id = rowSelection?._id
    axiosClient.put(`/customers/${id}`, {
      ...values,
      isTeacher: isTeacher,
      sex: isMale
    })
      .then((res) => {
        if (res.status === 200) {
          handleClose()
          notification.success({
            message: `Cập nhật thành công`
          })
          reload && reload();
          form.resetFields();
        }
      }).catch(err => {
        console.log("Error nef");
        notification.error({
          message: `Cập nhật thất bại`
        })
      })
  }

  return (
    <Modal
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleClose}
      okText="Lưu"
      cancelText="Đóng"
      title={rowSelection?.title || "Chỉnh sửa thông tin người dùng"}
      width="1000px"
    >
      <Form
        {...layout}
        name="basic"
        // initialValues={{ remember: true }}
        onFinish={handleFinish}
        form={form}
      >
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
      </Form>
    </Modal>
  )

})

export default ModalCRUD