import React from 'react'
import AdminLayout from './dashboard/AdminLayout'
import { Box } from '@mui/material'

function Adminhome() {
  return (
    <div>
      <AdminLayout/>
      <Box
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <div>
          <h4>Welcome, Admin</h4>
        </div>
        
      </Box>
    </div>
  )
}

export default Adminhome