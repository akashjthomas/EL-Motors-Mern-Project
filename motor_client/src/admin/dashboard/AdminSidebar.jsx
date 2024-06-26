import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  Note,
} from "@mui/icons-material";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';

import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewCompleted from '../pages/admin_view_completed';
//import ProfileImage from "../../public/assets/img/chefs/chefs-1.jpg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Add Categories",
    icon: <AddCircleOutlineIcon/>
  },
  {
    text: "Add Cars",
    icon: <DriveEtaIcon/>
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "ResolvedAssistance",
    icon: <Note/>,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Employee",
    icon:<EngineeringOutlinedIcon/>,
  },
 
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const AdminSidebar = ({
  //user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
    {isSidebarOpen && (
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSiing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth,
          },
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h6" fontWeight="bold">
                  DASHBOARD
                </Typography>
              </Box>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    {text}
                  </Typography>
                );
              }
              const lcText = text.toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (lcText === 'customers') {
                        navigate('/getalluser');
                      } 
                      else if(lcText === 'dashboard'){
                        navigate('/adminhome');
                      }
                      else if(lcText === 'employee'){
                        navigate('/viewemployee');
                      }
                      else if(lcText === 'add cars'){
                        navigate('/AddCars');
                      }
                      else if(lcText === 'add categories'){
                        navigate('/addcatergory');
                      }
                      else if(lcText === 'geography'){
                        navigate('/geographies');
                      }
                      else if(lcText === 'overview'){
                        navigate('/graph');
                      }
                      else if(lcText === 'performance'){
                        navigate('/graph');
                      }
                      else if(lcText === 'resolvedassistance'){
                        navigate('/viewco');
                      }
                      else {
                        navigate(`/${lcText}`);
                      }
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lcText && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>

                
              );
            })}
          </List>
        </Box>

        <Box position="absolute" bottom="2rem">
          <Divider />
          <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
            {/* <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="40px"
              width="40px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            /> */}
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.9rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {/* {user.name} */}
              </Typography>
              <Typography
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {/* {user.occupation} */}
              </Typography>
            </Box>
            {/* <SettingsOutlined
              sx={{
                color: theme.palette.secondary[300],
                fontSize: "25px ",
              }}
            /> */}
          </FlexBetween>
        </Box>
      </Drawer>
    )}
  </Box>
);
};

export default AdminSidebar;
