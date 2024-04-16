import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography,  Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import UserLayout from './UserLayout';

function FreeServiceBooked() {
  const [bookings, setBookings] = useState([]);
  const usermail = localStorage.getItem('email');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold employee details
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderWearBookings, setOrderWearBookings] = useState([]);
  const [statusUpdated, setStatusUpdated] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/myfreeorders/${usermail}`)
      .then((response) => {
        setBookings(response.data);
        console.log("bookingg",setBookings);
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
useEffect(() => {
  console.log("payment", selectedPayment);
}, [selectedPayment]);
const goToBilling =async (paymentId) => {
  try{
    const response = await axios.get(`http://localhost:5000/api/billy/${paymentId}`);
    console.log("pay", response.data); // Check API response here
    setSelectedPayment(response.data); // Set selected employee details
    navigate("/billss", { state: { selectedPayment: response.data } });

  }catch(error){
    console.error('Error fetching payment details:', error);
  }
};
useEffect(() => {
  
}, [statusUpdated]);
const bookingCancel = async (bookingId,usermail) => {
  try {
    console.log(bookingId);
    console.log(usermail);
    setStatusUpdated(false);
    const response = await axios.patch(`http://localhost:5000/api/fbookingcancel/${bookingId}`, 
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
    <div>
       <UserLayout/>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
   
      <h2>Booking Details</h2>
      
        {bookings.map((booking) => (
        
        <Card style={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', height: '100%', backgroundColor: '#0000', borderRadius: '12px', overflow: 'hidden' }}>
        <CardContent>
        <hr style={{ borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '20px' }} />
          <table>
            <tbody>
           
              <tr>
                <td><Typography variant="h6">Booking ID:</Typography></td>
                <td><Typography>{booking._id}</Typography></td>
              </tr>
              <tr>
                <td><Typography>Model:</Typography></td>
                <td><Typography>{booking.model}</Typography></td>
              </tr>
              <tr>
                <td><Typography>VIN:</Typography></td>
                <td><Typography>{booking.regno}</Typography></td>
              </tr>
              <tr>
                <td><Typography>Booking Date:</Typography></td>
                <td><Typography>{booking.bookingDate}</Typography></td>
              </tr>
              <tr>
                <td><Typography>policy no:</Typography></td>
                <td><Typography>{booking.policyNo}</Typography></td>
              </tr>
              <tr>
              </tr>
              <tr>
                <td><Typography>Selected Date:</Typography></td>
                <td><Typography>{booking.selectedDate}</Typography></td>
              </tr>
              <tr>
                <td><Typography>status:</Typography></td>
                <td><Typography>{booking.status}</Typography></td>
              </tr>
              {/* Add other booking details */}
            </tbody>
          </table>
          <hr style={{ borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '20px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button onClick={() => getEmployeeDetails(booking.scheduledEmployee)} style={{ backgroundColor: '#fdde6c', color: 'white', marginRight: '10px' }}>Contact</Button>
            <Button onClick={() => goToBilling(booking.paymentId)} style={{ backgroundColor: '#fdde6c', color: 'white', marginRight: '10px' }}>Go to Billing</Button>
            <Button onClick={() => bookingCancel(booking._id)} style={{ backgroundColor: '#fdde6c', color: 'white' }}>Cancel Booking</Button>
            
          </div>
        </CardContent>
      </Card>
      
        
        ))}
         

      
    </div>
    </div>
  );
}

export default FreeServiceBooked;
