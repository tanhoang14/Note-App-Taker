import React from 'react'
import { Outlet, Navigate } from 'react-router';

export default function ProtectedRoute({children}) {
    if(!localStorage.getItem('accessToken')){
        return <Navigate to='/login'/>;
    }
  return (
    <Outlet/>
  )
}
