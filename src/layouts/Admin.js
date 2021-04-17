import React from 'react'
import { Redirect } from 'react-router-dom'

export default function Admin() {
  return (
    <Redirect to="/admin/teacher"></Redirect>
  )
}
