import React,{ useState } from 'react';
import { Box, TextField, Button,Select, MenuItem,InputLabel } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import {  DatePicker } from 'antd';
import axios from 'axios';

function InsuredService() {
  const location = useLocation();
  const policyDetails = location.state.policyDetails;
  const userid=localStorage.getItem('email');
  const [vehicleModel, setVehicleModel] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // Initialize the state for selected date

const handleDateChange = (date) => {
  setSelectedDate(date);
};

  const handleVehicleModelChange = (event) => {
    setVehicleModel(event.target.value);
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  
  const handleSubmit = async () => {
    try {
      
      // Data to send to the backend
      const data = {
        userid,
      policytype: policyDetails.policy_type,
      policyexp: policyDetails.policy_end,
      policyno: policyDetails.policy_no,
      model: vehicleModel,
      regno: policyDetails.regno,
      servicetype: serviceType,
      date: selectedDate
      };
 console.log("data",data)
      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/savefree', data);

      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        // justifyContent="center"
        height="100vh"
        
      >
        <Box
          boxShadow={3}
          p={4}
          borderRadius={10}
          bgcolor="#BAB86C"
          width={500}
          style={{
            backgroundImage: `url('assets/img/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
           <TextField
            label="USERID"
            id='userid'
            variant="outlined"
            fullWidth
            value={userid}
            InputProps={{
              readOnly: true,
              style: { color: 'black' }
            }}
            style={{ marginBottom: '20px' }}
          />
         <TextField
         id='policytype'
            label="Policy Type"
            variant="outlined"
            fullWidth
            value={policyDetails.policy_type}
            InputProps={{
              readOnly: true,
              style: { color: 'black' }
            }}
            style={{ marginBottom: '20px' }}
          />
          <TextField
          id='policyexp'
            label="Policy Expiry Date"
            variant="outlined"
            fullWidth
            value={policyDetails.policy_end}
            InputProps={{
              readOnly: true,
              style: { color: 'black' }
            }}
            style={{ marginBottom: '20px' }}
          />
          <TextField
          id='policyno'
            label="Policy Number"
            variant="outlined"
            fullWidth
            value={policyDetails.policy_no}
            InputProps={{
              readOnly: true,
              style: { color: 'black' }
            }}
            style={{ marginBottom: '20px' }}
          />
         
         <TextField
         id='model'
            label="Vehicle model"
            variant="outlined"
            fullWidth
            value={vehicleModel}
            onChange={handleVehicleModelChange}
            InputProps={{
              style: { color: 'black' }
            }}
            style={{ marginBottom: '20px',textDecorationColor:'black' }}
          />
           <TextField
           id='regno'
            label="Reg NO"
            variant="outlined"
            fullWidth
            value={policyDetails.regno}
            InputProps={{
              readOnly: true,
              style: { color: 'black' }
            }}
            style={{ marginBottom: '20px' }}
          />
<InputLabel id="service-type-label" style={{ color: 'black', marginBottom: '10px' }}>Service Type</InputLabel>
<Select   
          id='servicetype'
          label="servicetype"
            variant="outlined"
            value={serviceType}
            onChange={handleServiceTypeChange}
            fullWidth
            style={{ marginBottom: '20px',color:'black' }}
          >
            <MenuItem value="normal">Normal Service</MenuItem>
            <MenuItem value="accident">Accident</MenuItem>
          </Select>

          <DatePicker
          id='date'
  label="Select Date"
  value={selectedDate}
  onChange={handleDateChange}
  renderInput={(params) => <TextField {...params} variant="outlined" />}
  fullWidth
  style={{ marginBottom: '20px', width: '100%' }} // Add width: '100%'
/>
         
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSubmit}>
              Submit
            </Button>
   
        </Box>
      </Box>
    </div>
  );
}

export default InsuredService;
