import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    if(!user?.uid){
        navigate('/login')
        return null;
    }
  return (
    <Outlet/>
  )
}
