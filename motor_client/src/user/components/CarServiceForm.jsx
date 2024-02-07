import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { Box } from '@mui/material';
const { Option } = Select;


const CarServiceForm = () => {
    const [userId, setUserId] = useState(localStorage.getItem('email'));
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);
  
    const getModel = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/getmodel');
        if (data) {
          setModels(data);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong in getting model');
      }
    };
  
    useEffect(() => {
      getModel();
    }, []);
  
    return (
      <div>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '16px',
        }}
      >
        <h2>Service  Booking</h2>
        <form 
        >
          <label>
            User ID:
            <input
              readOnly
              name="userId"
              value={userId}
            //   onChange={handleInputChange}
              required
            />
          </label>
          <br></br>
          <br></br>
          <Select
            bordered={false}
            name="model"
            placeholder="Select a model"
            fullWidth
            value={model}
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setModel(value);
            }}
          >
            {models?.map((model, index) => (
              <Option key={index} value={model}>
                {model}
              </Option>
            ))}
          </Select>
         


          <br></br>
          <br></br>
          <div className="col-sm-12 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-1 mb-1">
              Schedule
            </button>
          </div>
        </form>
      </Box>
      </div>
    );
}

export default CarServiceForm;
