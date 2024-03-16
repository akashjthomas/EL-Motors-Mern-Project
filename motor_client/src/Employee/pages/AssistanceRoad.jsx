import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField'; 
import { useLocation,useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
const { Option } = Select;


function AssistanceRoad() {

const [emp, setEmp] = useState('');
const [emps, setEmps] = useState([]);
const userId = localStorage.getItem('email');
const location = useLocation();
const navigate = useNavigate();
const getEmp = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/serviceemp');
      if (data) {
        setEmps(data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting model');
    }
  };

  useEffect(() => {
    getEmp();
  }, []);
  const { userId: locationUserId, longitude, latitude, createdAt, updatedAt,vehicleRegNumber,phoneNumber,locationId} = location.state || {};
  const cardStyle = {
    padding: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    width: '700px',
    background: '#764ABC',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend endpoint for storage
      await axios.post('http://localhost:5000/api/resolver', {
        userId: userId,
        emp: emp,
        location: location.state
      });
    console.log( "userId:",userId,"emp: ",emp,"location: ",location.state)
      toast.success('Data stored successfully');
      // Redirect to another page or perform any other action upon successful submission
      navigate('/success'); // Using navigate instead of history.push
    } catch (error) {
    
      console.log(error);
      toast.error('Failed to store data');
    }
  };

  return (
    <div>
      <Card style={cardStyle}>
        <Box>
        AssistanceRoad
 <form>
          <label>
            User ID:
            <input
              readOnly
              name="userId"
              value={userId}
            
              required
            />
          </label>
<Select
    bordered={false}
    name="Emp"
    placeholder="Select a model"
    fullWidth
    value={emp}
    showSearch
    className="form-select mb-3"
    onChange={(value) => {
        setEmp(value);
    }}
>
    {emps?.map((emp, index) => (
        <Option key={index} value={emp.employee_email}>
            {emp.employee_email}
        </Option>
    ))}
</Select>
<TextField label=" ID" value={locationId} variant="outlined" fullWidth margin="normal" readOnly />
<TextField label="Location User ID" value={locationUserId} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="Location Longitude" value={longitude} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="Location Latitude" value={latitude} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="Location Created At" value={createdAt} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="Location Updated At" value={updatedAt} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="User's Contact" value={vehicleRegNumber} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="User's VIN" value={phoneNumber} variant="outlined" fullWidth margin="normal" readOnly />

                <Button type='submit' onClick={handleSubmit}>Submit</Button>
</form>

</Box>
</Card>
    </div>
  )
}

export default AssistanceRoad