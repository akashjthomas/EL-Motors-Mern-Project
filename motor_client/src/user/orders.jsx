import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography,  Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function OrderTable() {
  const [bookings, setBookings] = useState([]);
  const usermail = localStorage.getItem('email');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold employee details
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [statusUpdated, setStatusUpdated] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/myorder/${usermail}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [usermail,bookings]);

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
useEffect(() => {
  console.log("payment", selectedPayment);
}, [selectedPayment]);
const goToBilling =async (paymentId) => {
  try{
    const response = await axios.get(`http://localhost:5000/api/generatebill/${paymentId}`);
    console.log("pay", response.data); // Check API response here
    setSelectedPayment(response.data); // Set selected employee details
    navigate("/billing", { state: { selectedPayment: response.data } });

  }catch(error){
    console.error('Error fetching payment details:', error);
  }
};
useEffect(() => {
  
}, [statusUpdated]);
const bookingCancel = async (bookingId,usermail) => {
  try {
    console.log(bookingId);
    console.log(usermail)
    setStatusUpdated(false);
    const response = await axios.patch(`http://localhost:5000/api/bookingcancel/${bookingId}`, 
    { status: 'canceled',
    usermail:usermail,
  });

  console.log(response.data.message);
  setStatusUpdated(true);
  alert(response.data.message);
  setStatusUpdated(false);
  } catch (error) {
    console.error('Error updating status:', error);
    alert("Error updating status");
  }
 
};
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <h2>Booking Details</h2>
      
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
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
              <Button onClick={() => getEmployeeDetails(booking.scheduledEmployee)} style={{ backgroundColor: '#fdde6c',color: 'white' }}>
                Contact
              </Button>
              <br></br>
              <Button onClick={() => goToBilling(booking.paymentId)}style={{ backgroundColor: '#fdde6c',color: 'white' }}>Go to Billing</Button>
              <br></br>
              <Button onClick={() =>bookingCancel (booking._id)}style={{ backgroundColor: '#fdde6c',color: 'white' }}>Cancel Booking</Button>
              </div>
            </Card>
        
        ))}
      
    </div>
  );
}

export default OrderTable;
