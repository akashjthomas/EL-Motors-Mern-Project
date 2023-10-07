
import React ,{ useState }from 'react'
import { Box, useMediaQuery } from "@mui/material"
import { Outlet } from 'react-router-dom';
//import { useSelector } from 'react-redux'; 
import AdminNavbar from './Adminnavbar';
import AdminSidebar from './AdminSidebar';
const AdminLayout = () => {
    const isNonMobile = useMediaQuery("(min-widtth: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div>
        <Box display={isNonMobile ? "flex":"block"} width="100%" height="100%">
      <AdminSidebar
    //   user={data || {} }
      isNonMobile={isNonMobile}
      drawerwidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box>
      <AdminNavbar
    //   user={data || {} }
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}/>
      <Outlet />
    </Box>

  </Box>
 
    </div>
  )
}

export default AdminLayout