import React from 'react'
import BackToTop from './components/Navbar'
import UserServiceDetail from './components/UserServiceDetails'
import UserLayout from './UserLayout'
import { Box } from '@mui/material'

function Userservicehome() {
  return (
    <div> <BackToTop/>
    <div>
      <UserLayout/>
      <Box 
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
      <UserServiceDetail/>
      </Box>
    </div>
    </div>
  )
}

export default Userservicehome