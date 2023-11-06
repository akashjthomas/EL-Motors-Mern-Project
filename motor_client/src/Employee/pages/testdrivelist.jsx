import React from 'react'
import TestDriveList from '../../pages/testdrivelist'
import { Box } from '@mui/material'
import EmployeeLayout from '../components/employeeLayout'

function ETestdrivelist() {
  return (
    <div>
        <EmployeeLayout/>
        <Box 
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <TestDriveList/>
        </Box>
    </div>
  )
}

export default ETestdrivelist