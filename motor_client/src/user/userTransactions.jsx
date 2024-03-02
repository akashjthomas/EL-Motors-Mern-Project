import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, TableHead, TableRow, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import UserLayout from './UserLayout';
import { Table } from 'react-bootstrap';

function UserTransactions() {
    const [bookings, setBookings] = useState([]);
    const usermail = localStorage.getItem('email');
    const [sortedBookings, setSortedBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:5000/api/tran/${usermail}`)
            .then((response) => {
                console.log(response.data);
                const serviceBillData = response.data.servicebill || []; // Access servicebill property
                setBookings(serviceBillData);
                setSortedBookings(serviceBillData); // Initialize sortedBookings with serviceBillData
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    }, [usermail]);
    console.log('Bookings:', bookings); // Add this line to check bookings
    const handleSortByDate = () => {
        const sorted = [...bookings].sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
        setSortedBookings(sorted);
      };
      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filteredBookings = bookings.filter(booking =>
          Object.values(booking).some(value =>
            value.toString().toLowerCase().includes(event.target.value.toLowerCase())
          )
        );
        setSortedBookings(filteredBookings);
      };

    return (
      <div>
        <UserLayout/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Booking Details</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'  }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              style={{ marginRight: '10px' }}
            />

            <Button variant="contained" onClick={handleSortByDate}>Sort by Date</Button>
            </div>
            {sortedBookings.map((booking) => (
                <Card key={booking._id} style={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', height: '100%', backgroundColor: '#0000', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
                    
                <CardContent>
                    <Table>
                    <TableHead>
<TableRow>
                  <Typography variant="h6">Booking ID: {booking._id}</Typography>
                 
                  <Typography>User ID: {booking.userId}</Typography>
                  <Typography>Model: {booking.model}</Typography>
                  <Typography>Booking Date: {booking.bookingDate}</Typography>
                  <Typography>Payment ID: {booking.paymentId}</Typography>
                  <Typography>Amount: {booking.amount}</Typography>
                  </TableRow>
                  {/* Add other booking details */}
                  </TableHead>
                  </Table>
                </CardContent>
                <hr style={{ borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '20px' }} />
                
              </Card>
              
                  
            ))}
        </div>
        </div>
    );
}

export default UserTransactions;
