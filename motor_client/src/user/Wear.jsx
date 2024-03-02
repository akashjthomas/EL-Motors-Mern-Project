import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import UserLayout from './UserLayout';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Wear() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedService = searchParams.get('service');
  const Models=searchParams.get('model');
  const vin = searchParams.get('vin');
  const pincode = searchParams.get('pincode');
  const pickupAddress=searchParams.get('pickupAddress');
  const selectedDate=searchParams.get('selectedDate');
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const userId = localStorage.getItem('email');
  const [checked, setChecked] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, name]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((checkbox) => checkbox !== name));
    }
  };

  const handleSelectAll = () => {
    if (checked.length === rows.length) {
      setChecked([]); // If all are checked, uncheck all
      setSelectedCheckboxes([]);
    } else {
      const newChecked = rows.map((row) => row.id);
      setChecked(newChecked);
      setSelectedCheckboxes(rows.map((row) => row.service)); // Select all checkboxes
    }
  };

  const onSubmit = async () => {
    const formData = {
        userId,
        selectedService,
        vin,
        Models,
        selectedOptions: selectedCheckboxes,
        pickupAddress,
        pincode,
        selectedDate,
        amount: 5000, // Hardcoded amount in paisa
        currency: 'INR', // Hardcoded currency
    };

    try {
        // Step 1: Create an order
        const orderResponse = await axios.post("http://localhost:5000/api/create-service", formData);
        const orderId = orderResponse.data.orderId;

        // Step 2: Initiate payment with Razorpay
        const options = {
            key: 'rzp_test_kR8XiPc7MhwMkB',
            amount: formData.amount,
            currency: 'INR',
            name: 'EL_Motors',
            description: 'Test Payment',
            order_id: orderId,
            handler: async function (response) {
                try {
                    // Step 3: Handle payment response
                    const { razorpay_payment_id } = response;
                    toast.success('Payment successful');
                    
 // Step 4: Prepare bill data
 const billData = {
  model: Models,
  userId,
  paymentId: razorpay_payment_id,
  amount: 50, // Hardcoded amount in paisa
  // Other bill data...
};

// Step 5: Send bill data to server
const billResponse = await axios.post('http://localhost:5000/api/create-servicebill', billData);

console.log('Bill saved successfully:', billResponse.data);
// Additional actions after saving the bill...
                    // Proceed with form submission
                    const bookingData = {
                        ...formData,
                        paymentId: razorpay_payment_id
                    };

                    const bookingResponse = await axios.post('http://localhost:5000/api/weared', bookingData);
                    if (bookingResponse.status === 201) {
                        alert(bookingResponse.data.message);
                        navigate("/userhome");
                    } else {
                        alert("Unexpected response from server");
                    }
                } catch (error) {
                    console.error('Error processing booking after payment:', error);
                    alert('Error processing booking after payment');
                }
                
            },
           
            
            prefill: {
                name: 'User Name',
                email: 'user@example.com',
                contact: '+918590440529'
            },
            notes: {
                address: 'Razorpay Corporate Office'
            },
            theme: {
                color: '#1976D2'
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Error:", error);
        if (error.response) {
            alert(error.response.data.error || "Server error occurred");
        } else if (error.request) {
            alert("No response received from server");
        } else {
            alert("An error occurred while sending the request");
        }
    }
};


  const rows = [
    { id: 1, service: 'Engine oil services', description: 'Regular maintenance of engine oil' },
    { id: 2, service: 'Brake checkup', description: 'Inspection and maintenance of brakes' },
    { id: 3, service: 'Tire rotation', description: 'Rotating tires to ensure even wear' },
    { id: 4, service: 'Spark plugs checkup', description: 'Examining or replacing spark plugs' },
    { id: 5, service: 'Fuel Filter checkup', description: 'Examining or replacing fuel filters' },
    { id: 6, service: 'Air Filter checkup', description: 'Examining or replacing air filter' },
    { id: 7, service: 'Micro filter checkup', description: 'Examining or replacing micro filter' },
  ];

  return (
    <div>
      <UserLayout />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{ maxWidth: 700, marginLeft: '255px', marginRight: 'auto', height: '75%', borderRadius: '12px', overflow: 'hidden' }}>
          <Row style={{ backgroundColor: '#F1F3CE', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <Col>
              <label htmlFor="userId">UserID:</label>
            </Col>
            <Col>
              <input
                type="text"
                id="userId"
                value={userId}
                disabled
                required
                style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
              />
            </Col>
          </Row>
          {selectedService && (
            <div style={{ backgroundColor: '#F1F3CE', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <label style={{ marginBottom: '5px' }}>Selected Service:</label>
              <input type="text" value={selectedService} readOnly style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />
            </div>
          )}
          {vin && (
            <div style={{ backgroundColor: '#F1F3CE', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <label style={{ marginBottom: '5px' }}>VIN:</label>
              <input type="text" value={vin} readOnly style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />
            </div>
          )}
           {Models && (
            <div style={{ backgroundColor: '#F1F3CE', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <label style={{ marginBottom: '5px' }}>MODEL:</label>
              <input type="text" value={Models} readOnly style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />
            </div>
          )}
           {pincode && (
            <div style={{ backgroundColor: '#F1F3CE', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <label style={{ marginBottom: '5px' }}>PINCODE:</label>
              <input type="text" value={pincode} readOnly style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />
            </div>
          )}
          {pickupAddress && (
            <div style={{ backgroundColor: '#F1F3CE', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <label style={{ marginBottom: '5px' }}>PICK UP ADDRESS</label>
              <input type="text" value={pickupAddress} readOnly style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />
            </div>
          )}
           {selectedDate&& (
            <div style={{ backgroundColor: '#F1F3CE', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <label style={{ marginBottom: '5px' }}>Selected Date</label>
              <input type="text" value={selectedDate} readOnly style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />
            </div>
          )}
          <TableContainer component={Paper}>
            <Table>   
              <TableHead>
                <TableRow>
                  <TableCell>
                    select all
                    <Checkbox
                      checked={checked.length === rows.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Services</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCheckboxes.includes(row.service)}
                        onChange={handleCheckboxChange}
                        name={row.service}
                      />
                    </TableCell>
                    <TableCell>{row.service}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button type='submit'>Submit</Button>
        </Card>
      </Form>
    </div>
  );
}

export default Wear;
