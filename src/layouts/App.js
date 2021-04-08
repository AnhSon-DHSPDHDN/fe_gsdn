import React, { useEffect, useState } from 'react'
import Header from '../components/landing-page/header/Header'
import About from '../components/landing-page/about/About'
import Mission from '../components/landing-page/mission/Mission'
import Member from '../components/landing-page/member/Member'
import Contact from '../components/landing-page/contact/Contact'
import axiosClient from '../untils/axiosClient'

export default function App() {
  const [dataDeveloper, setDataDeveloper] = useState([])
  const fetchDataDeveloper = () => {
    axiosClient.get('/developer')
      .then(res => {
        if (res.status === 200) {
          setDataDeveloper(res.data.data)
        }
      }).catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    fetchDataDeveloper()
  }, [])
  return (
    <div id="landing-page">
      <Header />
      <About />
      <Mission />
      <Member data={dataDeveloper} />
      <Contact />
    </div>
  )
}
