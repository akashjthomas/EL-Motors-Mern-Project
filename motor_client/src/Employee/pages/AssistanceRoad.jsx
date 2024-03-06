import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField'; 
import { useLocation } from 'react-router-dom';
const { Option } = Select;


function AssistanceRoad() {

const [emp, setEmp] = useState('');
const [emps, setEmps] = useState([]);
const userId = localStorage.getItem('email');
const location = useLocation();
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
  const { userId: locationUserId, longitude, latitude, createdAt, updatedAt } = location.state || {};
  return (
    <div>
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
<TextField label="Location User ID" value={locationUserId} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="Location Longitude" value={longitude} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="Location Latitude" value={latitude} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="Location Created At" value={createdAt} variant="outlined" fullWidth margin="normal" readOnly />
                <TextField label="Location Updated At" value={updatedAt} variant="outlined" fullWidth margin="normal" readOnly />
</form>
</Box>
    </div>
  )
}

export default AssistanceRoad