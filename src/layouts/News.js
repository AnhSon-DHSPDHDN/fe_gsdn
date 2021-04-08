import React, { useEffect, useState } from 'react'
import HomePageLayout from '../components/HomePageLayout'
import New from '../components/news'
import axiosClient from '../untils/axiosClient'

export default function News() {
  const [dataNews, setDataNews] = useState([])
  const fetchDataNews = () => {
    axiosClient.get('/news')
      .then(res => {
        if (res.status === 200) {
          setDataNews(res.data?.allNews)
        } else throw new Error()
      }).catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchDataNews()
  }, [])
  return (
    <HomePageLayout>
      <New data={dataNews}></New>
    </HomePageLayout>
  )
}
