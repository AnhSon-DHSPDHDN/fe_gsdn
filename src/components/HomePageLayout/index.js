import React from 'react'
import Navbar from '../homepage/Navbar'

export default function HomePageLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
