// EnterOtp.jsx
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

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
      console.log("userid",userId);
      console.log("yourid",yourId);
      console.log("id",id);
      if (response.data && response.data.otp) {
        const fetchedOtp = response.data.otp;
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
  
  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter OTP:
          <input 
            type="text" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default EnterOtp;
