import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function OrderTable() {
  const [bookings, setBookings] = useState([]);
  const usermail = localStorage.getItem('email');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold employee details
  useEffect(() => {
    axios.get(`http://localhost:5000/api/myorder/${usermail}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [usermail]);

   // Function to fetch employee details based on booking ID
useEffect(() => {
  console.log("emp", selectedEmployee);
}, [selectedEmployee]);

const navigate = useNavigate();
const getEmployeeDetails = async (bookingId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/employess/${bookingId}`);
    console.log("res", response.data); // Check API response here
    setSelectedEmployee(response.data); // Set selected employee details
    navigate("/contactdetails", { state: { selectedEmployee: response.data } });
  } catch (error) {
    console.error('Error fetching employee details:', error);
  }
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <h2>Booking Details</h2>
      
        {bookings.map((booking) => (
        
            <Card style={{ maxWidth:500, marginLeft: '255px', marginRight: 'auto', height: '100%', backgroundColor: '#4984c2', }}>
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
                {/* Add other booking details */}
              </CardContent>
              <Button onClick={() => getEmployeeDetails(booking.scheduledEmployee)} style={{ backgroundColor: '#4984c2',color: 'white' }}>
                Contact
              </Button>
            </Card>
        
        ))}
      
    </div>
  );
}

export default OrderTable;
