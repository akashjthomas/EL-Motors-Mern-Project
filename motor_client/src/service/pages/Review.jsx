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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0] // Assuming you only allow one file to be uploaded
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend endpoint for storage
      await axios.post('http://localhost:5000/api/rev', formData,{
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
      });
    console.log( "form",formData);
      toast.success('Data stored successfully');
      navigate("/");
     
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
          value={formData.vehicleRegNum}
          onChange={handleChange}
        />
        <TextField
          name="userId"
          label="User ID"
          variant="outlined"
          fullWidth
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
