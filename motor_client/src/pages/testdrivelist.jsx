import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TestDriveList = () => {
  const [testDrives, setTestDrives] = useState([]);

  useEffect(() => {
    // Fetch test drive bookings when the component mounts
    axios.get('http://localhost:5000/api/driveview')
      .then((response) => {
        console.log(response.data);
        setTestDrives(response.data);
      })
      .catch((error) => {
        console.error('Error fetching test drive bookings:', error);
      });
  }, []);

  return (
    <div>
      <h2>Test Drive Bookings</h2>
      <TableContainer component={Paper}style={{ width: '60%',Height: "400px", overflow: "auto" }}>
      <Table style={{ width: '70%' }}>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Time Slot</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testDrives.map((testDrive) => (
              <TableRow key={testDrive._id}>
                <TableCell>{testDrive.userId}</TableCell>
                <TableCell>{testDrive.model}</TableCell>
                <TableCell>{testDrive.timeSlot}</TableCell>
                <TableCell>{testDrive.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TestDriveList;
