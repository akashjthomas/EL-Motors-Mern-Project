import React from 'react'
import { Box } from '@mui/material'
import ServiceLayout from '../Sdashboard/ServiceLayout';
import ViewLocation from '../../Employee/pages/ViewLocation';


function ServiceHome() {
  return (
    <div>
      <ServiceLayout/>
      <Box
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <ViewLocation/>
        </Box>
      
    </div>
  )
}

export default ServiceHome