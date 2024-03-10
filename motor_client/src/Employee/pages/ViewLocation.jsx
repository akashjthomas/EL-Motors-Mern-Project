import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const ViewLocation = () => {
  const [locations, setLocations] = useState([]);
  const [locationNames, setLocationNames] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/vloki')
      .then((response) => {
        console.log(response.data);
        setLocations(response.data);
        fetchLocationNames(response.data);
      })
      .catch((error) => {
        console.error('Error fetching  bookings:', error);
      });
  }, []);

  const handleUpdateStatus = (locationId, userId, longitude, latitude, createdAt, updatedAt,vehicleRegNumber, phoneNumber) => {
    axios.put(`http://localhost:5000/api/uploki/${locationId}`)
      .then((response) => {
        console.log('Location status updated successfully:', response.data);
        const updatedLocations = locations.map(location => {
          if (location._id === locationId) {
            return { ...location, status: 'resolved' };
          }
          return location;
        });
        setLocations(updatedLocations);
        // Navigate to the new page while passing location details
        navigate(`/se/${locationId}`, { state: { locationId,userId, longitude, latitude, createdAt, updatedAt,vehicleRegNumber, phoneNumber} });
      })
      .catch((error) => {
        console.error('Error updating location status:', error);
      });
  };

  const fetchLocationNames = (locations) => {
    locations.forEach(location => {
      getLocationName(location.latitude, location.longitude)
        .then(name => {
          setLocationNames(prevState => ({
            ...prevState,
            [location._id]: name
          }));
        })
        .catch(error => {
          console.error('Error fetching location name:', error);
        });
    });
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2ac614dec93b45faaa49c367991b9b48`);
      const place = response.data.results[0].formatted;
      return place;
    } catch (error) {
      console.error('Error fetching location name:', error);
      return null;
    }
  };

  return (
    <div>        
      <h2>Road side Assistance List</h2>
      <TableContainer component={Paper} style={{ width: '100%', height: "400px", overflow: "auto" }}>
        <Table style={{ width: '100%' }}>
          <TableHead>
            <TableRow>
            <TableCell> ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Location Name</TableCell>
              <TableCell>users contact</TableCell>
              <TableCell>users VIN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location._id}>
                <TableCell>{location._id}</TableCell>
                <TableCell>{location.userId}</TableCell>
                <TableCell>{location.longitude}</TableCell>
                <TableCell>{location.latitude}</TableCell>
                <TableCell>{location.createdAt}</TableCell>
                <TableCell>{location.updatedAt}</TableCell>
    
                <TableCell>
                  {location.status !== 'resolved' && (
                    <Button variant="contained" onClick={() => handleUpdateStatus(location._id, location.userId, location.longitude, location.latitude, location.createdAt, location.updatedAt,location.phoneNumber,location.vehicleRegNumber)}>Resolve</Button>
                  )}
                </TableCell>
                <TableCell>
                  {locationNames[location._id]}
                </TableCell>
                <TableCell>{location.phoneNumber}</TableCell>
                <TableCell>{location.vehicleRegNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewLocation;
