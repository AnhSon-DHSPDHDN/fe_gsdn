import React from 'react'
import { Redirect } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

export default function Admin() {
  return (
    <Redirect to="/admin/teacher"></Redirect>
  )
}
