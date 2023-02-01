import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { graphQLRequest } from '../utils/request';
import Human from '../images/Images';


export default function Login() {
  const auth = getAuth();
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log('register', { data });
  };

  if (localStorage.getItem('accessToken')) {
    return <Navigate to="/" />
  }
  return (
    <Box sx={{     
          boxShadow: '0 0 15px 0 rgb(193 193 193 / 80%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid black',
          width: '201vh',
          height: '100vh',
          margin: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'hsla(179, 83%, 64%, 1)',

          background: 'linear-gradient(90deg, hsla(179, 83%, 64%, 1) 0%, hsla(338, 75%, 64%, 1) 50%, hsla(14, 92%, 86%, 1) 100%)',

          background: '-moz-linear-gradient(90deg, hsla(179, 83%, 64%, 1) 0%, hsla(338, 75%, 64%, 1) 50%, hsla(14, 92%, 86%, 1) 100%)',

          background: '-webkit-linear-gradient(90deg, hsla(179, 83%, 64%, 1) 0%, hsla(338, 75%, 64%, 1) 50%, hsla(14, 92%, 86%, 1) 100%)',

          filter: 'DXImageTransform.Microsoft.gradient( startColorstr="#58EFEC", endColorstr="#E85C90", GradientType=1 )',
          }}>
  
        <Box sx={{     
          boxShadow: '0 0 15px 0 rgb(193 193 193 / 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid black',
          width: '40vh',
          height: '40vh',
          margin: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          background: '#fff',
          }}>
          <img src={Human} style={{ width: '70%', height: '70%' }} />
          <Typography variant='h5' sx={{ justifyContent: 'center', marginBottom: '10px' }}>
            Welcome to Note App
          </Typography>
          <Button variant='outlined' onClick={handleLoginWithGoogle}>
        <GoogleIcon sx={{color:'#E61D8C'}}/>
      </Button>
        </Box>
         
    
    </Box>
  );
}