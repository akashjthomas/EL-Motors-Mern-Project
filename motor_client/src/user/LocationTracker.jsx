import React, { useState } from 'react';
import axios from 'axios';
import {  Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const userId = localStorage.getItem('email');
  // Function to get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const cardStyle = {
    padding: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    width: '400px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)' // Add shadow
}; 
  // Function to send location data to the server
  const sendLocationToServer = async () => {
    try {
      if (location) {
        console.log('Location data',location);
        await axios.post(`http://localhost:5000/api/loki/${userId}`, location);
        console.log('Location data sent successfully',location);
      } else {
        console.error('Location is not available.');
      }
    } catch (error) {
      console.error('Error sending location data:', error);
    }
  };

  return (
    <div>
       <Card style={cardStyle}>
      <Button onClick={getLocation}>Request</Button> {/* Call getLocation when button is clicked */}
      <br></br>
      <Button onClick={sendLocationToServer}>Send Location</Button> {/* Call sendLocationToServer when button is clicked */}
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )}
      </Card>
    </div>
  );
};

export default LocationTracker;
