import React, { useContext, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { graphQLRequest } from '../utils/request';

export default function Login() {
  // const navigate = useNavigate();
  const auth = getAuth();

  const {user} = useContext(AuthContext);
  
  const handleLoginWithGoogle = async ()=>{
    const provider = new GoogleAuthProvider();

    const {user :{uid, displayName}} = await signInWithPopup(auth,provider)

    const res= await signInWithPopup(auth,provider);
    const {data} = await graphQLRequest({query:`mutation register($uid:String!,$name: String! ){
        register(uid : $uid, name: $name){
          uid
          name
        }
    }`, variables:{
      uid, 
      name: displayName
    }
  })
    console.log('$$$$$',data)
    
  }
  if(user?.uid){
    
    return <Navigate to="/" />;
  }
  return (
    <>
        <Typography variant='h5' sx={{marginBottom:'10px'}}>Welcome to Note App</Typography>
        <Button variant='outlined' onClick={handleLoginWithGoogle}> 
        Login with Google
        </Button>
    </>
  )
}
