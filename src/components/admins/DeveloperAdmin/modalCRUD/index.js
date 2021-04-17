import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Upload } from "antd";
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
    const [imageLink, setImageLink] = useState(null);

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

        const update = {
            ...values
        }
        if (imageLink) {
            update["avatar"] = imageLink
        }

        axiosClient({
            url: `/developer/${rowSelection?._id || ""}`,
            method: rowSelection ? "PUT" : "POST",
            data: update
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

    const handleUpfile = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append('avatar', e.target.files[0])
            axiosClient.post('/developer/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }).then(data => {
                console.log(data);
                setImageLink(data.data.imageLink)
            })
        } else {
        }
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
                    label="Họ tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item
                    label="Ảnh"
                >
                    <input
                        type="file"
                        onChange={handleUpfile}
                    />
                    {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
                    {
                        imageLink && <img src={imageLink} alt="avatar" style={{
                            height: "150px", width: "150px", borderRadius: "100px", objectFit: "cover"
                        }} /> 
                    }
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