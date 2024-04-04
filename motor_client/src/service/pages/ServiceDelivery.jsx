import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ServiceDelivery() {
    const { id } = useParams();
    const [serviceDetails, setServiceDetails] = useState(null);
    const [otp, setOtp] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');

    useEffect(() => {
        // Make axios call to fetch service details
        axios.get(`http://localhost:5000/api/freeservicess/${id}`)
            .then(response => {
                // Assuming the response.data contains the service details
                setServiceDetails(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching service details:', error);
            });
    }, [id]);

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleVerifyOtp = () => {
      if (!serviceDetails) {
          console.error('Service details not available');
          return;
      }

      axios.post(`http://localhost:5000/api/verifyotp/${serviceDetails.booking.userId}/${id}`, { otp })
          .then(response => {
              setVerificationStatus(response.data.message);
          })
          .catch(error => {
              console.error('Error verifying OTP:', error);
              setVerificationStatus('Error verifying OTP');
          });
  };

    return (
        <div>
            <h1>Service Delivery</h1>
            {serviceDetails ? (
                <div>
                    <p>Service ID: {serviceDetails.booking._id}</p>
                    <p>Service Name: {serviceDetails.booking.status}</p>
                    {/* Add other details as needed */}
                    <input type="text" value={otp} onChange={handleOtpChange} placeholder="Enter OTP" />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                    <p>{verificationStatus}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ServiceDelivery;
