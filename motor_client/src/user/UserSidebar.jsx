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
  SettingsOutlined,
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
} from "@mui/icons-material";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../components/FlexBetween';
//import ProfileImage from "../../public/assets/img/chefs/chefs-1.jpg";

const navItems = [
  {
    text: "Home",
    icon: <HomeOutlined />,
  },
  // {
  //   text: "Client Facing",
  //   icon: null,
  // },
  {
    text: "Cars",
    icon: <DriveEtaIcon/>
  },
  {
    text: "Suggest A Car",
    icon: <HistoryEduIcon />,
   },
   {
    text: "Location Based Suggestion",
    icon: <AddLocationAltIcon/>,
   },
  
  {
    text: "Orders",
    icon: <ReceiptLongOutlined />,
  },
  // {
  //   text: "Geography",
  //   icon: <PublicOutlined />,
  // },
  // {
  //   text: "Sales",
  //   icon: null,
  // },
  // {
  //   text: "Overview",
  //   icon: <PointOfSaleOutlined />,
  // },
  // {
  //   text: "Daily",
  //   icon: <TodayOutlined />,
  // },
  // {
  //   text: "Monthly",
  //   icon: <CalendarMonthOutlined />,
  // },
  // {
  //   text: "Breakdown",
  //   icon: <PieChartOutlined />,
  // },
  // {
  //   text: "Management",
  //   icon: null,
  // },
  // {
  //   text: "Admin",
  //   icon: <AdminPanelSettingsOutlined />,
  // },
  // {
  //   text: "Performance",
  //   icon: <TrendingUpOutlined />,
  // },
];

const UserSidebar = ({
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
          anchor='left'
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant='h4' fontWeight="bold">
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
                        if (lcText === 'home') {
                          navigate('/userhome');
                        } 
                        else if(lcText === 'suggest a car'){
                          navigate('/preference');
                        }
                        else if(lcText === 'location based suggestion'){
                          navigate('/location');
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
              <Divider sx={{ my: "1rem" }} />
              <FlexBetween textTransform="none" gap="1rem" m="1rem 2rem">
                {/* <Box
                  component="img"
                  alt="profile"
                  src={ProfileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                /> */}
                <Box textAlign="left">
                  <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>
                    {/* {user.name} */}
                  </Typography>
                  <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                    {/* {user.occupation} */}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </FlexBetween>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default UserSidebar;
