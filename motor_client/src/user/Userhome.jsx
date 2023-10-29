
import React from 'react';
import UserLayout from './UserLayout';
import Penguin from './penguin';
import { Box, Grid, Hidden} from '@mui/material';
import { Row,Col } from 'react-bootstrap';
import UCarousel from './UserCarousel';



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
          <h4>Welcome, {useremail} 
          </h4>
        </div>
        <Box >
        <Col md={3}style={{
          padding: '20px',
          background:'cover', // Set the card width to 100%
          border: 'none', // Remove card border if needed
          height: '200px', 
          overflow:'hidden',
          width:'100%'
  
          
        }}>  <UCarousel/></Col></Box>
      
        <Box className="d-flex flex-column align-items-start"> 
       
        {/* <Col md={3}style={{
          padding: '20px',
          width: '100%', // Set the card width to 100%
          border: 'none', // Remove card border if needed
          
        }}>  */}
        {/*  </Col> */}
        <Penguin/>
        </Box>
       
      </Box>
      
     
      
    </div>
  );
}

export default Userhome;
