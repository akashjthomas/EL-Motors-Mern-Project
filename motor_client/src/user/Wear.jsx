
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import UserLayout from './UserLayout';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


function  Wear() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedService = searchParams.get('service');
  const Models=searchParams.get('model');
  const vin = searchParams.get('vin');
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
    };

    try {
      const response = await axios.post("http://localhost:5000/api/weared", formData);
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/userhome");
      } else {
        alert("Unexpected response from server");
      }
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
    { id: 1, service: 'Replacement of brake pads', description: 'Replacement of front and rear brake pads' },
    { id: 2, service: 'Replacement of front and rear brake discs', description: 'Replacement of front and rear brake discs' },
    { id: 3, service: 'Replacement of clutch', description: 'Replacement of clutch if necessary' },
    { id: 4, service: 'Replacement of wiper blades', description: 'Replacement of wiper blades' },
    // Add more rows as needed
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

export default  Wear ;