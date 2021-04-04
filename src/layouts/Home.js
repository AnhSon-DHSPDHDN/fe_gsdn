import React, { useEffect, useState } from 'react'
import Filter from '../components/homepage/Filter'
import Main from '../components/homepage/Main'
import HomePageLayout from '../components/HomePageLayout'
import { Message } from '../configs/config'
import axiosClient from '../untils/axiosClient'

export default function Home() {
  const [dataTeacher, setDataTeacher] = useState([])
  const fetchDataTeacher = () => {
    axiosClient.get('/teachers')
      .then(res => {
        if (res.data.message === Message.THANH_CONG) {
          setDataTeacher(res.data.data)
        }
      }).catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    fetchDataTeacher()
  }, [])
  return (
    <div className="homepage">
      <HomePageLayout>
        <Filter />
        <Main data={dataTeacher} />
      </HomePageLayout>
    </div>
  )
}
