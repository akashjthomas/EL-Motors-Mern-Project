import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const LocationTracker = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState(null);
  const userId = localStorage.getItem('email');
  const storedPhoneNumber = localStorage.getItem('phone');
  const navigate = useNavigate();
  console.log(storedPhoneNumber);

  const [vehicleRegNumber, setVehicleRegNumber] = useState('');

  useEffect(() => {
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
  }, [storedPhoneNumber]);

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

  const validateVehicleRegNumber = () => {
    const regNumberPattern = /^[A-Z]{2}\s(?!00)\d{2}\s[A-Z]{2}\s(?!0000)\d{4}$/;
    return regNumberPattern.test(vehicleRegNumber);
  };

  const phoneValidation = () => {
    const phonePattern = /^\+91[1-9]\d{9}$/;
    return phonePattern.test(phoneNumber);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const cardStyle = {
    padding: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    width: '400px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
  };

  const sendLocationToServer = async () => {
    try {
      if (location) {
        if (!validateVehicleRegNumber()) {
          toast.error('Invalid Vehicle Registration Number');
          return;
        }
        if (!phoneValidation()) {
          toast.error('Invalid Phone Number');
          return;
        }

        console.log('Location data', location);
        console.log("phmn",phoneNumber)
        await axios.post(`http://localhost:5000/api/loki/${userId}/${vehicleRegNumber}/${phoneNumber}`,  location);
        console.log('Location data sent successfully', location);
        toast.success('Location data sent successfully');
        navigate('/success');
        
      } else {
        console.error('Location is not available.');
      }
    } catch (error) {
      console.error('Error sending location data:', error);
      toast.error('Error sending location data');
    }
  };

  return (
    <div>
      <Card style={cardStyle}>
        <br />
        <label>Vehicle Registration Number:</label>
        <input
          type="text"
          value={vehicleRegNumber}
          onChange={(e) => setVehicleRegNumber(e.target.value)}
          required
        />
        <label>Phone No:</label>
        <input
          type="text"
          id='phn'
          value={phoneNumber} // Here, value is set to phoneNumber
          onChange={handlePhoneChange}
          required
        />
        <br />
        <Button onClick={getLocation}>Request</Button>
        <br />
        <Button onClick={sendLocationToServer}>Send Location</Button>
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
