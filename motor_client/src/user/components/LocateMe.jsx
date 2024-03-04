import React from 'react'
import UserLayout from '../UserLayout'
import { Box } from '@mui/material'
import LocationTracker from '../LocationTracker'

function LocateMe() {
  return (
    <div>
        <UserLayout/>
        <Box
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <LocationTracker/>
      </Box>
    </div>
  )
}

export default LocateMe