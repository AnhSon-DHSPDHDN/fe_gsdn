import { Button, Col, notification, Row, Space, Table } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import axiosClient from '../../../untils/axiosClient';
import AdminLayout from '../../AdminLayout'
import * as moment from "moment";
import './style.scss'
import ModalCRUD from './modalCRUD';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const columns = [
  {
    title: "No.",
    dataIndex: 'index',
    key: 'index',
    render: (value, item, index) => <>{index + 1}</>,
    width: '0.5%',
  },
  {
    title: "Họ tên",
    dataIndex: 'fullName',
    key: 'fullName',
    width: '30%',
  },
  {
    title: "Hình ảnh",
    dataIndex: 'avatar',
    key: 'avatar',
    render: data => <><img src={data} style={{
      width: "200px", height: "200px", objectFit: "cover", 
      borderRadius: "100px"
    }} /></>,
    width: '10%',
  },
  {
    title: "Mô tả",
    dataIndex: 'description',
    key: 'description',
    width: '50%',
  },
  {
    title: "Ngày tạo",
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: value => moment(value).format("DD-MM-YYYY"),
    width: '8%',
  },
]

export default function NewsAdmin() {
  const [dataNews, setDataNews] = useState([])
  const [rowSelects, setRowSelects] = useState([]);
  const [rowKeysSelect, setRowKeysSelect] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchDataNew()
  }, []);

  const fetchDataNew = () => {
    setRowKeysSelect([])
    setRowSelects([])
    axiosClient.get('/developer')
      .then(res => {
        if (res.status === 200) {
          setDataNews(res.data.data)
        } else throw new Error()
      }).catch(err => {
      })
  }

  const rowSelection = {
    selectedRowKeys: rowKeysSelect,
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelects(selectedRows);
      setRowKeysSelect(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onEdit = () => {
    if (rowSelects.length != 1) return;
    modalRef.current?.handleOpen(rowSelects[0]);
  }


  return (
    <AdminLayout>
      <div className="container">
        <h1 className="title">Quản lý tin tức</h1>
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
              </Col>
            </Row>
          </Col>
        </Row>
        <Table columns={columns} dataSource={dataNews}
          style={{
            marginTop: "10px"
          }}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          rowSelection={{
            type: "radio",
            ...rowSelection
          }}
          
        />

        <ModalCRUD
          ref={modalRef}
          reload={fetchDataNew}
        />
      </div>
    </AdminLayout>
  )
}
