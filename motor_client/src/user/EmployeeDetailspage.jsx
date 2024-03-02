import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Typography } from '@mui/material';
import { Card } from 'antd';

const EmployeeDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigate function
  const { selectedEmployee } = location.state || {};
  console.log("selected",selectedEmployee);

  const handleChatClick = () => {
    // Navigate to the chat page
    navigate('/chat');
  };

  return (
    <div>
      <Card style={{ maxWidth:500, marginLeft: '255px', marginRight: 'auto', height: '100%', backgroundColor: 'slateblue', }}>
        <h2>Employee Details</h2>
        {selectedEmployee && (
          <div>
            <Typography>Name: {selectedEmployee.employee_firstName}</Typography>
            <Typography>Email: {selectedEmployee.employee_email}</Typography>
            <Typography>Contact no: {selectedEmployee.employee_phone}</Typography>
            
            {/* Add an event handler to navigate to the chat page */}
            <button onClick={handleChatClick}>Chat</button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmployeeDetailsPage;
