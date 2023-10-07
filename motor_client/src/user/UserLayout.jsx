
import React ,{ useState }from 'react'
import { Box, useMediaQuery } from "@mui/material"
import { Outlet } from 'react-router-dom';
//import { useSelector } from 'react-redux'; 
import UserNavbar from './UserNavbar';
import UserSidebar from './UserSidebar';
const UserLayout = () => {
    const isNonMobile = useMediaQuery("(min-widtth: 600px)");
  const [isSidebarOpen,setIsSidebarOpen]= useState(true);
  return (
    <div>
        <Box display={isNonMobile ? "flex":"block"} width="100%" height="100%">
      <UserSidebar
    //   user={data || {} }
      isNonMobile={isNonMobile}
      drawerwidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box>
      <UserNavbar
    //   user={data || {} }
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}/>
      <Outlet />
    </Box>

  </Box>
 
    </div>
  )
}

export default UserLayout