import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Column } from '@ant-design/charts'
import axiosClient from '../untils/axiosClient'

export default function Admin() {
  const [data, setData] = useState(
    [
      { column: 'Khách hàng', value: 0 },
      { column: 'Gia sư', value: 0 },
      { column: 'Khách', value: 0 },
      { column: 'Tài khoản', value: 0 },
      { column: 'Tin tức', value: 0 }
    ]
  )

  const fetchData = () => {
    axiosClient.get('/admin')
      .then(res => {
        if (res.status === 200) {
          setData(res.data)
        } else throw new Error()
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const config = {
    data,
    height: 400,
    xField: 'column',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };
  return (
    <AdminLayout>
      <Column {...config}></Column>
    </AdminLayout>
  )
}
