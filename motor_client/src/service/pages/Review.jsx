import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Input } from '@mui/material';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Review = () => {
  const navigate = useNavigate();
  const yourId=localStorage.getItem('email');
  const [formData, setFormData] = useState({
    id: '',
    yourId:yourId,
    vehicleRegNum: '',
    userId: '',
    problemSolved: '',
    image: null
  });

  const [idError, setIdError] = useState('');
  const [vehicleRegNumError, setVehicleRegNumError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    let updatedValue = value;
    let error = '';
  
    if (name === 'id') {
      // Validate ID: Exactly 24 alphanumeric characters and no capital letters
      updatedValue = value.slice(0, 24).toLowerCase().replace(/[^a-z0-9]/g, ''); // Ensure lowercase and remove non-alphanumeric
      if (updatedValue.length !== 24) {
        error = 'ID must be 24 characters long';
      }
    } else if (name === 'vehicleRegNum') {
      // Validate Vehicle Registration Number
      updatedValue = value.toUpperCase(); // Ensure uppercase
      if (!/^[A-Z]{2}\s(?!00)\d{2}\s[A-Z]{2}\s(?!0000)\d{4}$/.test(updatedValue)) {
        // Invalid pattern, you can handle this accordingly
        error = 'Invalid Vehicle Registration Number';
      }
    } else if (name === 'userId') {
      // Validate Recipient ID: Check if it's a valid email address
      const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
      if (!isValidEmail) {
        // Invalid email address, you can handle this accordingly
        error = 'Invalid Email';
      }
    }
  
    if (name === 'image') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0] // Assuming you only allow one file to be uploaded
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: updatedValue
      }));
    }

    // Update error state
    switch (name) {
      case 'id':
        setIdError(error);
        break;
      case 'vehicleRegNum':
        setVehicleRegNumError(error);
        break;
      case 'userId':
        setUserIdError(error);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend endpoint for storage
      const response=await axios.post('http://localhost:5000/api/rev', formData,{
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
      });
    console.log( "form",formData);
    console.log(formData.id);
      toast.success('Data stored successfully');
      navigate("/otpmail", { state: { id: formData.id } });
     
    } catch (error) {
    
      console.log(error);
      toast.error('Failed to store data');
    }
   
    console.log(formData);
  };

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        marginTop: '50px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2>Assistance Details</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="id"
          label="ID"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!idError}
          value={formData.id}
          onChange={handleChange}
        />
         <TextField
          name="yourId"
          label="yourId"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.yourId}
          aria-readonly
        />
        <TextField
          name="vehicleRegNum"
          label="Vehicle Registration Number"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!vehicleRegNumError}
          helperText={vehicleRegNumError}
          value={formData.vehicleRegNum}
          onChange={handleChange}
        />
        <TextField
          name="userId"
          label="Recipient ID"
          variant="outlined"
          fullWidth
          error={!!userIdError}
          helperText={userIdError}
          margin="normal"
          value={formData.userId}
          onChange={handleChange}
        />
        <TextField
          name="problemSolved"
          select
          label="Problem Solved"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.problemSolved}
          onChange={handleChange}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </TextField>
        <Input
          type="file"
          name="image"
          accept="image/*" // Only accept image files
          onChange={handleChange}
          fullWidth
          margin="normal"
          style={{ marginTop: '20px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Review;
