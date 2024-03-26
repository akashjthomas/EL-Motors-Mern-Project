import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';

function InsuredService() {
  const location = useLocation();
  const policyDetails = location.state.policyDetails;

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          boxShadow={3}
          p={4}
          borderRadius={10}
          bgcolor="white"
          width={400}
          style={{
            backgroundImage: `url('assets/img/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom style={{color:'black'}}>
            Policy Details
          </Typography>
          <Typography variant="body1" gutterBottom style={{color:'black'}}>
            Policy Type: {policyDetails.policy_type}
          </Typography>
          <Typography variant="body1" gutterBottom style={{color:'black'}}>
            Policy ExpiryDate: {policyDetails.policy_end}
          </Typography>
          <Typography variant="body1" gutterBottom style={{color:'black'}}>
            Policy NO: {policyDetails.policy_no}
          </Typography>
          <Link to="/">
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Go Back
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default InsuredService;
