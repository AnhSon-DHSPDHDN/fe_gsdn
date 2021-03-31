import React from 'react'
import Filter from '../components/homepage/Filter'
import Main from '../components/homepage/Main'
import HomePageLayout from '../components/HomePageLayout'

export default function Home() {
  return (
    <div className="homepage">
      <HomePageLayout>
        <Filter />
        <Main />
      </HomePageLayout>
    </div>
  )
}
