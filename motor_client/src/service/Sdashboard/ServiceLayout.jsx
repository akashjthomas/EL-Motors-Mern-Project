
import React ,{ useState }from 'react'
import { Box, useMediaQuery } from "@mui/material"
import { Outlet } from 'react-router-dom';
//import { useSelector } from 'react-redux'; 

import ServiceSidebar from './ServiceSidebar';
import ServiceNavbar from './ServiceNavbar';
const ServiceLayout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div>
        <Box display={isNonMobile ? "flex":"block"} width="100%" height="100%">
      <ServiceSidebar
    //   user={data || {} }
    isNonMobile={isNonMobile}
    drawerWidth="250px"
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
      <ServiceNavbar
    //   user={data || {} }
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}/>
      <Outlet />
    </Box>

  </Box>
 
    </div>
  )
}

export default ServiceLayout