import React from 'react';
import { Box, Grid } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
const ServiceStepper = ({ bookings }) => {
    const location = useLocation();
const state = location.state;
const selectedBooking = state?.bookings;
    
  const steps = [
    {
      label: 'Arrived in Showroom',
      
    },
    {
      label: 'vehicle inspection',
    
    },
    {
      label: 'Working in Progress',
     
    },
    {
      label: 'Delivered',
      
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      toast.success('product delivered');
      console.log('Booking process completed!');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
      <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
      }}
    >
        <h6>product should be delivered only after 3 months from booking date</h6>
        <TableContainer component={Paper} style={{ maxWidth: '700px',}}>
  <Table style={{ maxWidth: '700px',}}>
    <TableHead>
      <TableRow>
        <TableCell>Booking Date</TableCell>
        <TableCell>Booking ID</TableCell>
        <TableCell>Model</TableCell>
        <TableCell>User ID</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>{selectedBooking.bookingDate}</TableCell>
        <TableCell>{selectedBooking._id}</TableCell>
        <TableCell>{selectedBooking.model}</TableCell>
        <TableCell>{selectedBooking.userId}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>


      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
  <Typography>{step.description}</Typography>
  <Box sx={{ mb: 2 }}>
    <div>
      {activeStep === steps.length - 1 ? (
        // Render the "Finish" button if it's the last step
        <button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 1, mr: 1 }}
        >
          Finish
        </button>
      ) : (
        // Render the "Continue" button for other steps
        <button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 1, mr: 1 }}
        >
          Continue
        </button>
      )}
      <button
        disabled={activeStep === 0 || activeStep === steps.length - 1}
        onClick={handleBack}
        sx={{ mt: 1, mr: 1 }}
      >
        Back
      </button>
    </div>
  </Box>
</StepContent>

          </Step>
        ))}
      </Stepper>
    </Box>
    
  );
};

export default ServiceStepper;
