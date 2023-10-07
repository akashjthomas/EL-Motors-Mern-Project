import React, { useState } from 'react'
import { LightModeOutlined,DarkModeOutlined,SettingsOutlined,Menu as MenuIcon,Search,
} from '@mui/icons-material'
import FlexBetween from '../../components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../../state/index';
//import ProfileImage from '../assets/profileaes.jpg'
import { useTheme } from '@emotion/react';
import { AppBar, IconButton, InputBase, Toolbar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/user/userSlice'; // Import the logout action

const AdminNavbar = ({
    user,
    isSidebarOpen, 
    setIsSidebarOpen
}) => {
    const dispatch =useDispatch();
    const theme =useTheme();
    const useremail=localStorage.getItem("email");
 
  console.log(useremail);
  const navigate =useNavigate();

  const handleLogout = () => {
      localStorage.clear();
      dispatch(logout({userid:"",useremail:""}));
      navigate("/",{replace:true},{redirect:true});
  };


    // const [anchorEl, setAnchorEl]=useState(null);
    // const isOpen =Boolean(anchorEl);
    // const handleClick=(event)=>setAnchorEl(event.currentTarget);
    // const handleClose= () => setAnchorEl(null);

  return (<AppBar
    sx={{
        position:"static",
        background:"none",
        boxShadow :"none",
    }}
>
    <Toolbar sx ={{ justifyContent:"space-between"}}>
        {/*Leftside*/}
        <FlexBetween>
            <IconButton onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon/>
            </IconButton>
            <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            sx={{
                visibility: isSidebarOpen ? "hidden" : "visible",
                opacity: isSidebarOpen ? 0 : 1,
                transition: "visibility 0s linear 0.3s, opacity 0.3s",
              }}
            >
                <InputBase  placeholder="Search"/>
                <IconButton>
                    <Search/>
                </IconButton>

            </FlexBetween>

        </FlexBetween>
        {/* right side */}
        <FlexBetween gap="1.5rem">
            <IconButton onClick={()=>dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlined sx={{ fontSize:"25px"}} />
                
                ):(
                    <LightModeOutlined sx={{ fontSize:"25px"}} />
                )}
            </IconButton>
            
            {/*
            
            

            <FlexBetween flex={1}>
                <Button onClick={handleClick}
                sx={{display: "flex", 
                justifyContent: "space-between",
                 alignItems:"center",
                 textTransform:"none",
                 gap: "1rem",
                }}
                >
                     <Box
                  component="img"
                  alt="profile"
                  src={ProfileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100] }}>
                    {user.name}
                  </Typography>
                  <Typography  fontSize="0.75" sx={{ color: theme.palette.secondary[200] }}>
                    {user.occupation}
                  </Typography>
                  </Box>
                  <ArrowDropUpOutlined
                  sx={{color:theme.palette.secondary[300],fontSize:"25px"}}
                  />

                </Button>
                <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom",horizontal:"center"}}
                >
                    <MenuItem onClick={handleClose}>Log out</MenuItem>
                </Menu>

            </FlexBetween> 
        */}
        <IconButton>
                <SettingsOutlined sx={{ fontSize:"25px"}} />
            </IconButton>
            <IconButton onClick={handleLogout}>Logout</IconButton>
        </FlexBetween>
    </Toolbar>
  </AppBar>
  );
}

export default AdminNavbar