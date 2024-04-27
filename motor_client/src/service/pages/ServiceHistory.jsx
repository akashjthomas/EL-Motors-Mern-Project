import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ServiceLayout from '../Sdashboard/ServiceLayout';

function ServiceHistory() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [booking, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mail = localStorage.getItem('email');

    axios.get(`http://localhost:5000/api/emp/${mail}`)
      .then((response) => {
        setSelectedEmployee(response.data);
        console.log(response.data);

        // Fetch booking for the selected employee
        axios.get(`http://localhost:5000/api/listservice/${response.data._id}`)
          .then((bookingResponse) => {
            setBookings(bookingResponse.data);
            setFilteredBookings(bookingResponse.data); // Initialize filteredBookings with all booking
          })
          .catch((bookingError) => {
            console.error('Error fetching booking:', bookingError);
          });
      })
      .catch((error) => {
        console.error('Error fetching employee:', error);
      });
  }, []);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = booking.filter((booking) => {
      // Modify this condition to match against the fields you want to search
      return (
        booking.userId.toLowerCase().includes(searchTerm) ||
        booking.model.toLowerCase().includes(searchTerm) ||
        booking.serviceType.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredBookings(filtered);
  };

  return (
    <div>
      <ServiceLayout />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', marginTop: 30 }}>Customers Assigned To You</p>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
        style={{ margin: '10px auto', display: 'block', padding: '5px' }}
      />
      {filteredBookings.map((booking, index) => (
        <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 10, backgroundColor: '#D4AF37' }} key={index}>
          <CardContent>
            <Typography variant="h5" component="div">
              User Details
            </Typography>
            <div>
            <Typography>ID: {booking._id}</Typography>
<Typography>User ID: {booking.userId}</Typography>
<Typography>Policy Type: {booking.policyType}</Typography>
<Typography>Policy Expiry Date: {booking.policyExpiryDate}</Typography>
<Typography>Policy No: {booking.policyNo}</Typography>
<Typography>Model: {booking.model}</Typography>
<Typography>Service Type: {booking.serviceType}</Typography>
<Typography>Registration No: {booking.regno}</Typography>
<Typography>Payment ID: {booking.paymentId}</Typography>
<Typography>Amount: {booking.amount}</Typography>
<Typography>Status: {booking.status}</Typography>
<Typography>Selected Date: {booking.selectedDate}</Typography>
<Typography>Booking Date: {booking.bookingDate}</Typography>
              
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ServiceHistory;
