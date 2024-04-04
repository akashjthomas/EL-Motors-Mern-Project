import React,{ useState } from 'react';
import { Box, TextField, Button,Select, MenuItem,InputLabel } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {  Link } from 'react-router-dom';
import {  DatePicker } from 'antd';
import axios from 'axios';


function InsuredService() {
  const location = useLocation();
  const policyDetails = location.state.policyDetails;
  const navigate = useNavigate();
  const userid=localStorage.getItem('email');
  const [vehicleModel, setVehicleModel] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // Initialize the state for selected date
  const [paymentId, setPaymentId] = useState(null);
  const [modelValid, setModelValid] = useState(true);
  const [dateValid, setDateValid] = useState(true);
  const handleDateChange = (date) => {
    const currentDate = new Date();
    const maxSelectableDate = new Date();
    maxSelectableDate.setDate(currentDate.getDate() + 14); // 2 weeks from current date

    // Check if the selected date is not older than the current date
    // and is within 2 weeks from the current date
    if (date >= currentDate && date <= maxSelectableDate) {
        setSelectedDate(date);
        setDateValid(true); // Assuming there's a state variable to track date validity
    } else {
        // Handle invalid date selection
        // You might want to display an error message or prevent further action
        setDateValid(false);
        console.log("Invalid date selection. Please select a date within 2 weeks from today.");
        alert("Invalid date selection. Please select a date within 2 weeks from today.");
    }
};

  const handleVehicleModelChange = (event) => {
    const newModel = event.target.value.slice(0, 20);;
    const isValidModel = /[a-zA-Z]|[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*/.test(newModel);
    setVehicleModel(newModel);
    setModelValid(isValidModel);
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handlePayment = async () => {
    try {
      // Step 1: Create an order
      const orderResponse = await axios.post("http://localhost:5000/api/create-order", {
        amount: 5000, // Amount in paisa (Rs. 50)
        currency: "INR",
      });
      const orderId = orderResponse.data.orderId;

      // Step 2: Initiate payment with Razorpay
      const options = {
        key: 'rzp_test_kR8XiPc7MhwMkB',
        amount: 5000, // Amount in paisa (Rs. 50)
        currency: 'INR',
        name: 'EL_Motors',
        description: 'Payment for Insurance Service',
        order_id: orderId,
        handler: async function (response) {
          // Step 3: Handle payment response
          const { razorpay_payment_id } = response;
          setPaymentId(razorpay_payment_id);
          alert("Payment successful!");
          handleSubmit(razorpay_payment_id);
          try {
            // Step 4: Prepare bill data
            const billData = {
              model: vehicleModel,
              userId: userid,
              paymentId: razorpay_payment_id,
              amount: 5000, // Hardcoded amount in paisa
              // Other bill data...
            };

            // Step 5: Send bill data to server
            const billResponse = await axios.post("http://localhost:5000/api/create-servicebill", billData);
            console.log("Bill saved successfully:", billResponse.data);
          } catch (error) {
            console.error("Error creating bill:", error);
            alert("Error creating bill");
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '+919876543210'
        },
        notes: {
          address: 'User Address'
        },
        theme: {
          color: '#1976D2'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating payment");
    }
  };

  const handleFormSubmit = () => {
    if (!vehicleModel|| !serviceType || !selectedDate) {
      alert('Please enter valid information for all fields.');
     return;
    }
    
    handlePayment();
  };
  
  const handleSubmit = async (paymentId) => {
    
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
      date: selectedDate,
      paymentId,
      amount: 50, // Hardcoded amount in paisa
      currency: 'INR'
      };
 console.log("data",data)

      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/savefree', data);
      
      console.log(response.data); // Log the response from the backend
      navigate('/freeserviceorders');
    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('Failed to save data. Please try again.');
    }
  };
  return (
    <React.Fragment>
      
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
            error={!modelValid}
            helperText={!modelValid ? 'Model cannot be empty' : ''}
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
            disablePast // Disable past dates
            disableFuture={false} // Optional: Uncomment to disable future dates
            fullWidth
            style={{ marginBottom: '20px', width: '100%' }}
            error={!dateValid} // Add error prop based on date validity
            helperText={!dateValid ? "Please select a date within 2 weeks from today." : ""}
            
        />
<Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleFormSubmit}>
            submit
          </Button>
          
   
        </Box>
      </Box>
      </React.Fragment>
  );
}

export default InsuredService;
