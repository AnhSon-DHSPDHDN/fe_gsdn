import React from 'react'
import Header from '../components/landing-page/header/Header'
import About from '../components/landing-page/about/About'
import Mission from '../components/landing-page/mission/Mission'
import Member from '../components/landing-page/member/Member'
import Contact from '../components/landing-page/contact/Contact'

export default function App() {
  return (
    <div id="landing-page">
      <Header />
      <About />
      <Mission />
      <Member />
      <Contact />
    </div>
  )
}
