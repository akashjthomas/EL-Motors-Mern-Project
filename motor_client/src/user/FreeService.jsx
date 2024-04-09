import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FreeService() {
  const [policyNumber, setPolicyNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [policyDetails, setPolicyDetails] = useState(null); 
  const navigate = useNavigate();
  console.log(policyDetails);
  const handlePolicyNumberChange = (event) => {
    const { value } = event.target;
    setPolicyNumber(value);

    // Call backend API to validate policy number
    validatePolicyNumber(value);
  };


  const handleSubmit = () => {
    // Navigate to next page with policy details as state
    navigate('/insuredservice', { state: { policyDetails } });
  };
  const handleContact = () => {
    // Add functionality to handle contact action
    alert('For assistance, please contact: 0467 78800944');
  };

  const validatePolicyNumber = async (policyNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/validatepolicy/${policyNumber}`);
      const data = response.data;
      if (data.isValid) {
        setIsValid(true);
        setPolicyDetails(data.policyDetails); // Store policy details in state
      } else {
        setIsValid(false);
        setPolicyDetails(null); // Reset policy details if policy number is invalid
      }
    } catch (error) {
      console.error('Error validating policy number:', error);
    }
   
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
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
          height={300}
          style={{
            backgroundImage: `url('assets/img/fordlogo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <TextField
            label="Enter Policy Number"
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px', marginTop: '50px', background: 'rgba(255, 255, 255, 0.7)' }}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
            value={policyNumber}
            onChange={handlePolicyNumberChange}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!isValid} 
            onClick={handleSubmit}// Disable the button if policy number is not valid
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box
      boxShadow={3}
      p={4}
      borderRadius={10}
      width={300}
      height={300}
      textAlign="center"
    >
      <p>
        Please bear with us as our team verifies the details. Thank you for your patience.
      </p>
      <p>
        You won't be able to enjoy insurance benefits until your details are verified by our team.
      </p>
      <Button variant="contained" onClick={handleContact}>
        Contact Support
      </Button>
    </Box>
    </div>
  );
}

export default FreeService;
