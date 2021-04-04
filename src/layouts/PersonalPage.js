import React from 'react'
import Navbar from '../components/homepage/Navbar'
import HomePageLayout from '../components/HomePageLayout'
import Personal from '../components/personal/Personal'

export default function PersonalPage() {
  return (
    <div id="personal">
      <HomePageLayout>
        <Personal />
      </HomePageLayout>
    </div>
  )
}
