import { Button, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import axiosClient from '../../../untils/axiosClient';
import AdminLayout from '../../AdminLayout'
import './style.scss'

export default function NewsAdmin() {
  const [dataNews, setDataNews] = useState([])
  const fetchDataNew = () => {
    axiosClient.get('/news')
      .then(res => {
        if (res.status === 200) {
          setDataNews(res.data.allNews)
        } else throw new Error()
      }).catch(err => {
        console.log(err);
      })
  }

  const mapDataToView = (data) => {
    let result = <tr><td></td></tr>;
    if (data) {
      result = data.map((data, index) => {
        return <tr key={index}>
          <td>{data?.title}</td>
          <td>{data?.description}</td>
          <td>{data?.link}</td>
          <td>
            <Button>Sửa</Button>
            <Button>Xóa</Button>
          </td>
        </tr>
      })
    }
    return result
  }

  useEffect(() => {
    fetchDataNew()
  }, [])

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="title">Quản lý tin tức</h1>
        <Button type="primary">Thêm</Button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mapDataToView(dataNews)}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
