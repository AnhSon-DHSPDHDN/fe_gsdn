import { Form, Input, Modal, notification, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import axiosClient from '../../../../untils/axiosClient';
import { InfoMeContext } from "../../../../contexts/context/InfoMe";

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

    const { data: userContext } = useContext(InfoMeContext)
    const [visible, setVisible] = useState(false);
    const [form] = useForm();
    const [rowSelection, setRowSelection] = useState(null);

    useImperativeHandle(ref, () => ({
        handleOpen
    }))

    useEffect(() => {
        if (!rowSelection) return;
        form.setFieldsValue({
            ...rowSelection,
            password: ''
        });
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
        if (rowSelection) delete values.password
        axiosClient({
            url: `/users/${rowSelection?._id || "create"}`,
            method: rowSelection ? "PUT" : "POST",
            data: {
                ...values,
                createdBy: userContext._id
            }
        }).then(() => {
            handleClose()
            notification.success({
                message: `${rowSelection ? "Cập nhật" : "Thêm mới"} thành công`
            })
            reload && reload();
            form.resetFields();
        }).catch((err) => {
            if (err == "TAI_KHOAN_TON_TAI") {
                notification.error({
                    message: `Tài khoản đã tồn tại`
                })
                return;
            }
            notification.error({
                message: `${rowSelection ? "Cập nhật" : "Thêm mới"} thất bại`
            })
        });
    }
    

    return (
        <Modal
            visible={visible}
            onOk={handleSubmit}
            onCancel={handleClose}
            okText="Lưu"
            cancelText="Đóng"
            title={rowSelection?.username || "Thêm mới tài khoản"}
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
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: rowSelection ? false : true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item
                    label="Chức vụ"
                    name="_idRole"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Select
                        placeholder="Chọn chức vụ"
                    >
                        <Select.Option value="user">
                            Người dùng
                        </Select.Option>
                        <Select.Option value="admin">
                            Quản trị viên
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )

})

export default ModalCRUD