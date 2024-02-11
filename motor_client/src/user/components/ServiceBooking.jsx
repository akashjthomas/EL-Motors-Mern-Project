import React from 'react'
import UserLayout from '../UserLayout'
import { Box } from '@mui/material';
import ServiceForm from '../ServiceForm';

function ServiceBooking() {
  return (
    <div>
        <UserLayout/>
        <Box 
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <ServiceForm/>
        </Box>
    </div>
  )
}

export default ServiceBooking