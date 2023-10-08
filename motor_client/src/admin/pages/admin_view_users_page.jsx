import React from 'react'
import AdminViewUsers from '../components/admin_view_users'
import AdminLayout from '../dashboard/AdminLayout'
import { Box } from '@mui/material'


function AdminViewusersPage() {
  return (
    <div>
         <AdminLayout/>
         <Box
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
       <AdminViewUsers/> 
       </Box>
    </div>
  )
}

export default AdminViewusersPage