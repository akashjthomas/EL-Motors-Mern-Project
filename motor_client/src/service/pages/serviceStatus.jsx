import React, { useState, useEffect } from 'react';
import { Box, TextField } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ServiceStepper = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate hook from React Router v6
    const state = location.state;
    const selectedBooking = state?.bookings;
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [disabledStatus, setDisabledStatus] = useState('');
    const [inputStatus, setInputStatus] = useState('');
    const [otp, setOtp] = useState('');
    const allowedStatuses = ['Arrived in Showroom', 'Vehicle Inspection', 'Working in Progress', 'Delivered'];

    useEffect(() => {
        const mail = localStorage.getItem('email');

        axios.get(`http://localhost:5000/api/emp/${mail}`)
            .then((response) => {
                setSelectedEmployee(response.data);

                // Fetch bookings for the selected employee
                axios.get(`http://localhost:5000/api/empfree/${response.data._id}`)
                    .then((bookingResponse) => {
                        const latestBooking = bookingResponse.data[0]; // Assuming the latest booking is at index 0
                        setBookings(bookingResponse.data);
                        setInputStatus(latestBooking.status); // Set the initial input status
                        setDisabledStatus(latestBooking.status); // Set the disabled status
                    })
                    .catch((bookingError) => {
                        console.error('Error fetching bookings:', bookingError);
                    });
            })
            .catch((error) => {
                console.error('Error fetching employee:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        setInputStatus(event.target.value);
    };

    const handleStatusChange = () => {
        if (!allowedStatuses.includes(inputStatus)) {
            alert('Invalid status. Please enter one of the allowed statuses.');
            return;
        }

        if (inputStatus === 'Delivered') {
            // Navigate to a new page when status is Delivered
            navigate(`/serdel/${selectedBooking._id}`);

        } else {
            // Make API call to update status in the database for other statuses
            updateStatusInDatabase();
        }
    };

    const updateStatusInDatabase = () => {
        axios.put(`http://localhost:5000/api/stepperstate/${selectedBooking._id}`, { status: inputStatus })
            .then((response) => {
                console.log('Status updated successfully:', response.data);
                setDisabledStatus(inputStatus); // Update the local state with the new status
            })
            .catch((error) => {
                console.error('Error updating status:', error);
            });
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
            }}
        >
            <h6>Product status should be updated using</h6>
            1.Arrived in Showroom<br />
            2.Vehicle Inspection<br></br>
            3.Working in Progress<br></br>
            4.Delivered<br></br>
            <hr></hr>
            <TableContainer component={Paper} style={{ maxWidth: '700px' }}>
                <Table style={{ maxWidth: '700px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Booking Date</TableCell>
                            <TableCell>Booking ID</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>User ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{selectedBooking && selectedBooking.bookingDate}</TableCell>
                            <TableCell>{selectedBooking && selectedBooking._id}</TableCell>
                            <TableCell>{selectedBooking && selectedBooking.model}</TableCell>
                            <TableCell>{selectedBooking && selectedBooking.userId}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <hr></hr>
            <TextField
                label="Service Status"
                variant="outlined"
                value={inputStatus}
                onChange={handleInputChange}
                disabled={disabledStatus === 'Delivered'}
            />
            {disabledStatus === 'Delivered' && (
                <TextField
                    label="Enter OTP"
                    variant="outlined"
                    value={otp}
                    onChange={handleOtpChange}
                />
            )}
            <Button onClick={handleStatusChange}>Submit</Button>
        </Box>
    );
};

export default ServiceStepper;
