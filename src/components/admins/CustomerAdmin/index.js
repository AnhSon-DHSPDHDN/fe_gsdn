import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Col, notification, Row, Table } from 'antd'
import confirm from 'antd/lib/modal/confirm'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../../untils/axiosClient'
import AdminLayout from '../../AdminLayout'
import ModalCRUD from './modalCRUD'
import './style.scss'

const columns = [
  {
    title: "No.",
    dataIndex: 'index',
    key: 'index',
    render: (value, item, index) => <>{index + 1}</>,
    width: '0.5%',
  },
  {
    title: "Ảnh đại diện",
    dataIndex: 'avatar',
    key: 'avatar',
    render: data => <><img src={data} style={{
      width: "200px", height: "150px", objectFit: "cover"
    }} /></>,
    width: '30%',
  },
  {
    title: "Tên",
    dataIndex: 'fullName',
    key: 'fullName',
    width: '10%',
  },
  {
    title: "Môn dạy",
    dataIndex: 'subject',
    key: 'subject',
    width: '10%',
  },
  {
    title: "Mức lương",
    dataIndex: 'salary',
    key: 'salary',
    width: '10%',
  },
  {
    title: "Mô tả",
    dataIndex: 'description',
    key: 'description',
    width: '30%',
  },
  {
    title: "Ngày tạo",
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: value => moment(value).format("DD-MM-YYYY"),
    width: '8%',
  },
]

export default function CustomerAdmin() {
  const [dataCustomer, setDataCustomer] = useState([])
  const [rowSelects, setRowSelects] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchDataCustomer()
  }, []);

  const fetchDataCustomer = () => {
    axiosClient.get('/customers')
      .then(res => {
        if (res.status === 200) {
          setDataCustomer(res.data?.data)
        } else throw new Error()
      }).catch(err => {
        console.log(err);
      })
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelects(selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onDeleteRows = () => {
    confirm({
      title: 'Bạn có muốn xóa những gia sư này?',
      icon: <ExclamationCircleOutlined />,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk() {
        deleteRows()
      },
      onCancel() {
      },
    });

  }

  const onEdit = () => {
    if (rowSelects.length != 1) return;
    // console.log(rowSelects);
    modalRef.current?.handleOpen(rowSelects[0]);
  }

  const deleteRows = () => {
    const ids = rowSelects.map(r => r._id);
    axiosClient.delete('/teachers', {
      data: { ids }
    }).then((res) => {
      if (res.status === 200) {
        notification.success({
          message: "Xóa thành công"
        })
        fetchDataCustomer();
      }
    }).catch(() => {
      console.log("Error nef");
      notification.error({
        message: "Có lỗi khi xóa"
      })
    });
  }

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="title">Quản lý Khách hàng</h1>
        <Row justify="space-between" >
          <Col span="6">
          </Col>
          <Col span="6">
            <Row justify="end">
              <Col>
                <Button
                  disabled={rowSelects.length !== 1}
                  onClick={onEdit}
                >
                  Sửa
                  </Button>
                <Button danger
                  disabled={rowSelects.length < 1} style={{ marginLeft: "10px" }}
                  onClick={onDeleteRows}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table columns={columns} dataSource={dataCustomer}
          style={{
            marginTop: "10px"
          }}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection
          }}
        />
      </div>

      <ModalCRUD
        ref={modalRef}
        reload={fetchDataCustomer}
      />
    </AdminLayout>
  )
}
