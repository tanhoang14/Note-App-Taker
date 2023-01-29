import { Avatar, MenuItem, Typography,Menu } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'

export default function UserMenu() {
    const {user:{displayName,photoURL, auth}} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    
    const handleLogout = ()=>{
        auth.signOut();
    }
    
    const handleClose = ()=>{
        setAnchorEl(null)
    }

    const handleClick = (e)=>{
        setAnchorEl(e.currentTarget)
    }
  return (
    <>
        <Box sx={{display:'flex'}} onClick={handleClick}>
            <Typography>{displayName}</Typography>
            <Avatar alt='avatar' src={photoURL} 
            sx={{ width:24, height:24, marginLeft:'5px'}}/>
        </Box>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open= {open}
            onClose = {handleClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    </>
  )
}
