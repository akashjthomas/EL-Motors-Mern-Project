import { Box } from '@mui/material';
import React from 'react';
import UserLayout from './UserLayout';



function Userhome() {
  
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
