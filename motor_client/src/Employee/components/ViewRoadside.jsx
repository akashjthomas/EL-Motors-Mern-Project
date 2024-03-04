import React from 'react'
import EmployeeLayout from './employeeLayout'
import ViewLocation from '../pages/ViewLocation'
import { Box } from '@mui/material'
function ViewRoadside() {
  return (
    <div>
        <EmployeeLayout/>
        <Box 
        ml={{ sm: 0, md: '350px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <ViewLocation/>
        </Box>
    </div>
  )
}

export default ViewRoadside