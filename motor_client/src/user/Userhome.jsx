import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/user/userSlice'; // Import the logout action
import UserLayout from './UserLayout';



function Userhome() {
  //const username=localStorage.getItem("name");
  const useremail=localStorage.getItem("email");
  console.log(useremail);
  

  return (
    <div>
      <UserLayout/>
      <Box
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <div>
          <h4>Welcome, {useremail}</h4>
        </div>
      </Box>
    </div>
  );
}

export default Userhome;
