import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    // Fetch test drive bookings when the component mounts
    axios.get('http://localhost:5000/api/assist')
      .then((response) => {
        console.log(response.data);
        setWorkshops(response.data);
      })
      .catch((error) => {
        console.error('Error fetching test drive bookings:', error);
      });
  }, []);

  return (
    <div>
      <h2>Road Side assistance</h2>
      <TableContainer component={Paper}style={{ width: '60%',Height: "400px", overflow: "auto" }}>
      <Table style={{ width: '70%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshops.map((workshop) => (
              <TableRow key={workshop._id}>
                <TableCell>{workshop.name}</TableCell>
                <TableCell>{workshop.address}</TableCell>
                <TableCell>{workshop.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkshopList;
