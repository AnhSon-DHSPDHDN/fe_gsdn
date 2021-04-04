import React from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../homepage/Navbar'

export default function HomePageLayout({ children }) {
  if (!localStorage.getItem('me')) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
