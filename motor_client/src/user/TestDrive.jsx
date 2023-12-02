import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { Box } from '@mui/material';
const { Option } = Select;

const TestDriveBookingForm = () => {
  const [userId, setUserId] = useState(localStorage.getItem('email'));
  const [model, setModel] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 am - 12:00 pm)');
  const [date, setDate] = useState(''); // Add a date state
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'userId':
        setUserId(value);
        break;
      case 'modelName':
        setModel(value);
        break;
      case 'timeSlot':
        setTimeSlot(value);
        break;
      case 'date':
        setDate(value); // Capture the date input
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const driveDetails = {
      userId,
      model,
      timeSlot,
      date, // Include the date in the request
    };

    axios
      .post('http://localhost:5000/api/bookdrive', driveDetails)
      .then((response) => {
        toast.success("test drive scheduled successfully");
        alert(response.data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error');
      });
  };

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
        <h2>Test Drive Booking</h2>
        <form onSubmit={handleSubmit}>
          <label>
            User ID:
            <input
              readOnly
              name="userId"
              value={userId}
              onChange={handleInputChange}
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
          <label>
  Select a Time Slot:
  <select
    name="timeSlot"
    value={timeSlot}
    onChange={handleInputChange}
    required
  >
    <option value="Morning (11:00 am - 12:00 pm)">Morning (11:00 am - 12:00 pm)</option>
    <option value="Afternoon (1:00 pm - 2:00 pm)">Afternoon (1:00 pm - 2:00 pm)</option>
    <option value="Evening (4:00 pm - 5:00 pm)">Evening (4:00 pm - 5:00 pm)</option>
  </select>
</label>
<label>
  Select a Date:
  <input
    type="date"
    name="date"
    value={date}
    onChange={handleInputChange}
    required
    min={(function() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    })()}
  />
</label>

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
};

export default TestDriveBookingForm;
