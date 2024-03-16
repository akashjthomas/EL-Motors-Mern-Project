// EnterOtp.jsx
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from '@mui/material';

function EnterOtp() {
  const location = useLocation();
  const { id } = useParams();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { userId, yourId } = location.state;
      console.log(id,"id");

  
      // Make a request to fetch the OTP associated with the userId
      const response = await axios.get(`http://localhost:5000/api/verifyotp/${userId}/${yourId}/${id}`);
      console.log("res",response.data)
      console.log("userid",userId);
      console.log("yourid",yourId);
      console.log("id",id);
      if (response.data.color && response.data.color.otp) {
        const fetchedOtp = response.data.color.otp;
        console.log(fetchedOtp);
        
        // Validate the entered OTP
        if (otp === fetchedOtp) {
          setSuccess('OTP verified successfully!');
          setError('');
        } else {
          setError('Invalid OTP. Please try again.');
          setSuccess('');
        }
      } else {
        setError('Failed to fetch OTP. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error fetching OTP:', error);
      setError('Failed to verify OTP. Please try again.');
      setSuccess('');
    }
  };
  const cardStyle = {
    padding: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    width: '700px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Validate OTP: Should be a 6-digit numerical value
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError('');
    } else {
      setError('OTP must be a 6-digit numerical value.');
    }
  };
  
  return (
    <div>
      <Card style={cardStyle}>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter OTP:
          <input 
            type="text" 
            value={otp} 
            onChange={handleChange}  
            required 
          />
          <br></br>
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      </Card>
    </div>
  );
}

export default EnterOtp;
