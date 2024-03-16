import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LocationTracker = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState(null);
  const [vehicleRegNumber, setVehicleRegNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [vehicleRegNumberError, setVehicleRegNumberError] = useState('');
  const userId = localStorage.getItem('email');
  const storedPhoneNumber = localStorage.getItem('phone');
  const navigate = useNavigate();

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

  const validateVehicleRegNumber = (value) => {
    const regNumberPattern = /^[A-Z]{2}\s(?!00)\d{2}\s[A-Z]{2}\s(?!0000)\d{4}$/;
    const isValid = regNumberPattern.test(value);
    setVehicleRegNumberError(isValid ? '' : 'Invalid Vehicle Registration Number');
    return isValid;
  };

  const phoneValidation = (value) => {
    const phonePattern = /^\+91[1-9]\d{9}$/;
    const isValid = phonePattern.test(value);
    setPhoneNumberError(isValid ? '' : 'Invalid Phone Number');
    return isValid;
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    phoneValidation(value);
  };

  const handleRegNumberChange = (event) => {
    const value = event.target.value;
    setVehicleRegNumber(value);
    validateVehicleRegNumber(value);
  };

  const cardStyle = {
    padding: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    width: '700px',
    background: 'linear-gradient(45deg, #d9afd9,#97d9e1)',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
  };

  const sendLocationToServer = async () => {
    try {
      if (location) {
        if (!validateVehicleRegNumber(vehicleRegNumber) || !phoneValidation(phoneNumber)) {
          return;
        }

        await axios.post(`http://localhost:5000/api/loki/${userId}/${vehicleRegNumber}/${phoneNumber}`,  location);
        console.log('Location data sent successfully', location);
        navigate('/success');
        
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
        <br />
        <Form>
          <label style={{ marginRight: '10px' }}>Vehicle Registration Number:</label>
          <input
            type="text"
            value={vehicleRegNumber}
            onChange={handleRegNumberChange}
            required
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              transition: 'all 0.3s ease-in-out',
              marginRight: '20px' // Adjust as needed
            }}
          />
          {vehicleRegNumberError && <p style={{ color: 'red', marginLeft: '10px' }}>{vehicleRegNumberError}</p>}
          <br/><br/>
          <label style={{ marginRight: '10px' }}>Phone No:</label>
          <input
            type="text"
            id='phn'
            value={phoneNumber}
            onChange={handlePhoneChange}
            required
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              transition: 'all 0.3s ease-in-out',
              marginRight: '20px' // Adjust as needed
            }}
          />
          {phoneNumberError && <p style={{ color: 'red', marginLeft: '10px' }}>{phoneNumberError}</p>}
          <br />
          <br/>
          <Button  onClick={getLocation}>Request</Button>
          <br />
          <br/>
          <Button onClick={sendLocationToServer}>Send Location</Button>
          {location ? (
            <p>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default LocationTracker;
