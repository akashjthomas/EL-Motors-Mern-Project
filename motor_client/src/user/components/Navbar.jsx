import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Button } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
function ScrollTop(props) {
  
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };
  
  
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  const navigate = useNavigate();
  const handleRclick=()=>{
    navigate('/roadsideassistance');
  };
  const handleButtonClick = () => {
    navigate('/s'); // Navigate to "/s" when button is clicked
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
           
          <div style={{ flex: 1 }} />
          <div>
          <NoCrashIcon/>
            <Button onClick={handleButtonClick}>
          <Typography variant="h6" component="div" style={{ color:'#ffae42', fontWeight: 'bold' }}>
           Schedule a service now
          </Typography>
          </Button>
          </div>
          <FireTruckIcon />
          <Button onClick={handleRclick}><Typography style={{ color:'#ffae42', fontWeight: 'bold' }}>Road side assistance</Typography></Button>
          
          <Box sx={{ marginLeft: 2, marginRight: 2 }} />
          <HandshakeIcon />
          <Typography>pick up and drop</Typography>
          <Box sx={{ marginLeft: 2, marginRight: 2 }} />
          <VolunteerActivismIcon/>
          <Typography>Committed To Serve</Typography>
        </Toolbar>
       
      </AppBar>
  
      <Toolbar id="back-to-top-anchor" />
      <Container>
        
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}