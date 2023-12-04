import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
function EmployeeViewUsers() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const mail = localStorage.getItem('email');

    axios.get(`http://localhost:5000/api/emp/${mail}`)
      .then((response) => {
        setSelectedEmployee(response.data);

        // Fetch bookings for the selected employee
        axios.get(`http://localhost:5000/api/bookeduser/${response.data._id}`)
          .then((bookingResponse) => {
            setBookings(bookingResponse.data);
          })
          .catch((bookingError) => {
            console.error('Error fetching bookings:', bookingError);
          });
      })
      .catch((error) => {
        console.error('Error fetching employee:', error);
      });
  }, []);
  const handleCheckDelivery = (bookings) => {
    setSelectedBooking(bookings); 
    console.log("steeper",bookings);// Set the selected booking to navigate to the stepper
    navigate('/deliver',{ state: {bookings } }); // Redirect to the stepper page
  };

  return (
    <div>
         <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', marginTop: 30 }}>Customers Assigned To You</p>
         {bookings.map((bookings, index) => (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 10, backgroundColor: '#D4AF37' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          User Details
        </Typography>
       
        <div key={index}>
            <Typography>ID: {bookings._id}</Typography>
            <Typography>User ID: {bookings.userId}</Typography>
            <Typography>Model: {bookings.model}</Typography>
            <Typography>Fuel Source: {bookings.fuelSource}</Typography>
            <Typography>Price: {bookings.price}</Typography>
            <Typography>Mobile No: {bookings.mobileNo}</Typography>
            <Typography>First Name: {bookings.firstName}</Typography>
            <Typography>Address Line 1: {bookings.addressLine1}</Typography>
            <Typography>Address Line 2: {bookings.addressLine2}</Typography>
            <Typography>Pincode: {bookings.pincode}</Typography>
            <Typography>State: {bookings.state}</Typography>
            <Typography>City: {bookings.city}</Typography>
            <Typography>Delivery Status: {bookings.deliverystatus}</Typography>
            <Typography>Booking Date: {bookings.bookingDate}</Typography>
          </div>
      </CardContent>
      <Button onClick={() => handleCheckDelivery(bookings)}>Check Delivery</Button>
    </Card>
      ))}
    </div>
  );
}

export default EmployeeViewUsers;
