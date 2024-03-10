import React from 'react'
import AdminLayout from './dashboard/AdminLayout'
import { Box } from '@mui/material'
import Overview from './pages/Overview'
import ViewLocation from '../Employee/pages/ViewLocation'
import AssistanceRoadTable from './pages/AssistanceRoadTable'

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
        <Overview/>
        <hr></hr>
        <br></br>
        <br></br>
        <br></br>
        <Box >
        <ViewLocation/>
        </Box>
        <Box>
          <AssistanceRoadTable/>
        </Box>
      </Box>
    </div>
  )
}

export default Adminhome