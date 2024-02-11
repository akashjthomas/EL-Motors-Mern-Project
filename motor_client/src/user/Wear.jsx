import React , { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Row, Col, Form, Card } from 'react-bootstrap';
import UserLayout from './UserLayout';

function Wear() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedService = searchParams.get('service');
    const vin = searchParams.get('vin');

  const userId = localStorage.getItem('email');

  const [checked, setChecked] = useState([]);
  
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSelectAll = () => {
    if (checked.length === rows.length) {
      // If all rows are already checked, uncheck all
      setChecked([]);
    } else {
      // Otherwise, check all rows
      const newChecked = rows.map((row) => row.id);
      setChecked(newChecked);
    }
  };

  const rows = [
    { id: 1, service: 'Replacement of brake pads', description: 'Replacement of front and rear brake pads' },
    { id: 2, service: 'Replacement of front and rear brake discs', description:'Replacement of front and rear brake discs' },
    { id: 3, service: 'Replacement of clutch', description: 'Replacement of clutch if neccessary' },
    { id: 4, service: 'Replacement of wiper blades', description:'Replacement of wiper blades' },
    // Add more rows as needed
  ];

  return (
    <div>
        <UserLayout/>
        <Form>
            <Card  style={{ maxWidth: 700, marginLeft: '255px', marginRight: 'auto', height: '75%',
  borderRadius: '12px', // Adjust the radius value as needed
  overflow: 'hidden'}}>
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>select all
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
                <Checkbox style={{ color: '#89ABE3' }}
                  checked={checked.indexOf(row.id) !== -1}
                  onChange={handleToggle(row.id)}
                />
              </TableCell>
              <TableCell>{row.service}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
    </Form>
    </div>
  )
}

export default Wear