import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const OtpMail = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const yourId = localStorage.getItem('email');
  const [id, setId] = useState('');
  const [formData, setFormData] = useState({
    yourId: yourId,
    userId: '',
    id: '' // Added id field
  });

  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend endpoint for storage
      await axios.post(`http://localhost:5000/api/otpmails/${id}`, formData);
      console.log(formData);
      console.log(id);
      
      toast.success('Data stored successfully');
      navigate(`/enterotp/${id}`, { state: { userId: formData.userId, yourId: formData.yourId, lid: id } });
    } catch (error) {
      console.log(error);
      toast.error('Failed to store data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
      <h2>Verify</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="id"
          label="ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={id} // Display id from state
          disabled
        />
        <TextField
          name="yourId"
          label="Your ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.yourId}
          disabled
        />
        <TextField
          name="userId"
          label="Recipient ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.userId}
          onChange={handleChange}
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

export default OtpMail;
