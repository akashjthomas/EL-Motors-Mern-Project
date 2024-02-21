import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import UserLayout from './UserLayout';

function UserTransactions() {
    const [bookings, setBookings] = useState([]);
    const usermail = localStorage.getItem('email');
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/tran/${usermail}`)
            .then((response) => {
                console.log(response.data);
                setBookings(response.data.servicebill); // Access servicebill property
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    }, [usermail]);

    console.log('Bookings:', bookings); // Add this line to check bookings

    return (
      <div>
        <UserLayout/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Booking Details</h2>
            {bookings.map((booking) => (
                <Card key={booking._id} style={{ maxWidth: 500, marginBottom: 20 }}>
                    <CardContent>
                        <Typography variant="h6">Booking ID: {booking._id}</Typography>
                        <Typography>User ID: {booking.userId}</Typography>
                        <Typography>Model: {booking.model}</Typography>
                        <Typography>bookingDate: {booking.bookingDate}</Typography>
                        <Typography>Payment ID: {booking.paymentId}</Typography>
                        <Typography>Amount: {booking.amount}</Typography>
                        {/* Add other booking details */}
                    </CardContent>
                </Card>
            ))}
        </div>
        </div>
    );
}

export default UserTransactions;
