import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import UserLayout from '../UserLayout';


function CorderTable() {
  const [bookings, setBookings] = useState([]);
  const usermail = localStorage.getItem('email');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/canceled/${usermail}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [usermail,bookings]);

   // Function to fetch employee details based on booking ID




  return (
    <div>
        <UserLayout/>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <h2> Canceled Booking Details</h2>
      
        {bookings.map((booking) => (
        
            <Card style={{ maxWidth:500, marginLeft: '255px', marginRight: 'auto', height: '100%', backgroundColor: '#0000',borderRadius: '12px', // Adjust the radius value as needed
            overflow: 'hidden' }}>
              <CardContent>
                <Typography variant="h6">Booking ID: {booking._id}</Typography>
                <Typography>Model: {booking.model}</Typography>
                <Typography>Fuel Source: {booking.fuelSource}</Typography>
                <Typography>Price: {booking.price}</Typography>
                <Typography>First Name: {booking.firstName}</Typography>
                <Typography>Last Name: {booking.lastName}</Typography>
                <Typography>Address Line 1: {booking.addressLine1}</Typography>
                <Typography>Address Line 2: {booking.addressLine2}</Typography>
                <Typography>City: {booking.city}</Typography>
                <Typography>Pincode: {booking.pincode}</Typography>
                <Typography>State: {booking.state}</Typography>
                <Typography>Status: {booking.status}</Typography>
                {/* Add other booking details */}
              </CardContent>
    
            </Card>
        
        ))}
      
    </div>
    </div>
  );
}

export default CorderTable;
