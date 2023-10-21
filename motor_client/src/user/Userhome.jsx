
import React from 'react';
import UserLayout from './UserLayout';
import Penguin from './penguin';
import { Box, Grid} from '@mui/material';
import Card from 'react-bootstrap/Card'; 
import { Row,Col } from 'react-bootstrap';


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
        <Box className="d-flex flex-column align-items-start"> <Row>
        
        <Col md={3}style={{
          padding: '20px',
          width: '100%', // Set the card width to 100%
          border: 'none', // Remove card border if needed
          
        }}> 
        <Penguin/> </Col>
        <Col mod={6}></Col>
        </Row></Box>
      
        
      </Box>
      
     
      
    </div>
  );
}

export default Userhome;
