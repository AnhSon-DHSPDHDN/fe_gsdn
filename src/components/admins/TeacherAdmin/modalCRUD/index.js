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

    useImperativeHandle(ref, () => ({
        handleOpen
    }))

    useEffect(() => {
        if (!rowSelection) return;
        console.log(rowSelection);
        form.setFieldsValue(rowSelection);
    }, [rowSelection])

    const handleOpen = row => {
        console.log(row);
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
        console.log(values);
        axiosClient({
            url: `/news/${rowSelection?._id || ""}`,
            method: rowSelection ? "PUT" : "POST",
            data: values
        }).then(() => {
            handleClose()
            notification.success({
                message: `${rowSelection ? "Cập nhật" : "Thêm mới"} thành công`
            })
            reload && reload();
            form.resetFields();
        }).catch(() => {
            console.log("Error nef");
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
            title={rowSelection?.title || "Thêm mới bài viết"}
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
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder="Nhập tiêu đề" />
                </Form.Item>
                <Form.Item
                    label="Đường dẫn bài viết"
                    name="link"
                    rules={[{ required: true, message: 'Vui lòng nhập đường dẫn bài viết!' }]}
                >
                    <Input placeholder="Nhập đường dẫn bài viết" />
                </Form.Item>
                <Form.Item
                    label="Đường dẫn hình ảnh"
                    name="image"
                    rules={[{ required: true, message: 'Vui lòng nhập đường dẫ n hình ảnh!' }]}
                >
                    <Input placeholder="Nhập đường dẫn hình ảnh" />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input.TextArea placeholder="Nhập mô tả" cols={10} />
                </Form.Item>
            </Form>
        </Modal>
    )

})

export default ModalCRUD