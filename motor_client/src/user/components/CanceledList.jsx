import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import UserLayout from '../UserLayout';
import Box from '@mui/material/Box'; // Correct import statement

function CorderTable() {
  const [bookings, setBookings] = useState([]);
  const [sortedBookings, setSortedBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const usermail = localStorage.getItem('email');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/canceled/${usermail}`)
      .then((response) => {
        setBookings(response.data);
        setSortedBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [usermail]);

  const handleSortByDate = () => {
    const sorted = [...bookings].sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
    setSortedBookings(sorted);
  };

  const handleCardClick = (id) => {
    setSortedBookings(prevBookings =>
      prevBookings.map(booking =>
        booking._id === id ? { ...booking, isClicked: !booking.isClicked } : booking
      )
    );
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
      <UserLayout />
      <Box
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Canceled Booking Details</h2>
          <div style={{ display: 'flex' }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              style={{ marginRight: '10px' }}
            />
            <Button variant="contained" onClick={handleSortByDate}>Sort by Date</Button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
          {sortedBookings.map((booking) => (
            <Card
              key={booking._id}
              style={{
                backgroundColor: booking.isClicked ? '#6CB0A8' : '#0000',
                borderRadius: '12px',
                overflow: 'hidden',
                // boxShadow: booking.isClicked ? '0 0 20px 5px rgba(255,0,0,0.5)' : '#6CB0A8', // Neon glow effect
                border: booking.isClicked ? '2px solid rgba(255,0,0,0.5)' : '#6CB0A8', // Neon border
                transition: 'box-shadow 0.3s ease, border 0.3s ease' // Adding transition for smoother movement
              }}
              onClick={() => handleCardClick(booking._id)}
            >
              <CardContent style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <Typography variant="h6">Booking ID:</Typography>
                  <Typography>Model:</Typography>
                  <Typography>Fuel Source:</Typography>
                  <Typography>Price:</Typography>
                  <Typography>First Name:</Typography>
                  <Typography>Last Name:</Typography>
                  <Typography>Date:</Typography>
                </div>
                <div>
                  <Typography>{booking._id}</Typography>
                  <Typography>{booking.model}</Typography>
                  <Typography>{booking.fuelSource}</Typography>
                  <Typography>{booking.price}</Typography>
                  <Typography>{booking.firstName}</Typography>
                  <Typography>{booking.lastName}</Typography>
                  <Typography>{booking.bookingDate}</Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default CorderTable;
