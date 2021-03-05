import React from 'react'
import Navbar from '../components/homepage/Navbar'
import Filter from '../components/homepage/Filter'
import Main from '../components/homepage/Main'

export default function Home() {
  return (
    <div className="homepage">
      <Navbar />
      <Filter />
      <Main />
    </div>
  )
}
