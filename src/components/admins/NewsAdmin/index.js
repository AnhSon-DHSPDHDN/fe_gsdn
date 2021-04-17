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
    title: "Tiêu đề",
    dataIndex: 'title',
    key: 'title',
    render: (value, item) => <a href={item.link} target="_blank"> {item.title} </a>,
    width: '30%',
  },
  {
    title: "Hình ảnh",
    dataIndex: 'image',
    key: 'image',
    render: data => <><img src={data} style={{
      width: "200px", height: "150px", objectFit: "cover"
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
  const modalRef = useRef(null);
  const [rowKeysSelect, setRowKeysSelect] = useState([]);

  useEffect(() => {
    fetchDataNew()
  }, []);

  const fetchDataNew = () => {
    setRowKeysSelect([])
    setRowSelects([])
    axiosClient.get('/news')
      .then(res => {
        if (res.status === 200) {
          setDataNews(res.data.allNews)
        } else throw new Error()
      }).catch(err => {
        console.log(err);
      })
  }

  const rowSelection = {
    selectedRowKeys: rowKeysSelect,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRows);
      setRowSelects(selectedRows)
      setRowKeysSelect(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onOpenModal = () => {
    modalRef.current?.handleOpen();
  }

  const onDeleteRows = () => {
    confirm({
      title: 'Bạn có muốn xóa những bài viết này?',
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

  const deleteRows = () => {
    const ids = rowSelects.map(r => r._id);
    // console.log(ids);
    axiosClient.delete('/news', {
      data: { ids }
    }).then(() => {
      notification.success({
        message: "Xóa thành công"
      })
      fetchDataNew();
    }).catch(() => {
      // console.log("Error nef");
      notification.error({
        message: "Có lỗi khi xóa"
      })
    });
  }

  const onEdit = () => {
    if (rowSelects.length != 1) return;
    // console.log(rowSelects);
    modalRef.current?.handleOpen(rowSelects[0]);
  }
  // console.log(rowSelects);

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="title">Quản lý tin tức</h1>
        <Row justify="space-between" >
          <Col span="6">
            <Button type="primary" onClick={onOpenModal} >Thêm</Button>
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
        <Table columns={columns} dataSource={dataNews}
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

        <ModalCRUD
          ref={modalRef}
          reload={fetchDataNew}
        />
      </div>
    </AdminLayout>
  )
}
