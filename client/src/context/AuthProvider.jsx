import React, { createContext, useEffect, useState } from 'react'
import {getAuth} from 'firebase/auth';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();
export default function AuthProvider({children}) {
    const [user,setUser] = useState({});
    const navigate = useNavigate();
    const auth = getAuth();

    const [isLoading, setisLoading] = useState(true);

    useEffect(()=>{
        const unsubsribed = auth.onIdTokenChanged((user)=>{
            console.log('>>>>>>',{user})
            if(user?.uid){
                setUser(user);
                if(user.accessToken !== localStorage.getItem('accessToken')){
                  window.location.reload();
                }
                localStorage.setItem('accessToken', user.accessToken)
                setisLoading(false);
                return;
              }
          
              //reset user info
              setUser({});
              localStorage.clear();
              setisLoading(false);
              navigate('/login')
        })
        return ()=>{
            unsubsribed();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth])

  return (
    <AuthContext.Provider value={{user,setUser}}>
        { isLoading ? <CircularProgress/> :children}
    </AuthContext.Provider>
  )
}
