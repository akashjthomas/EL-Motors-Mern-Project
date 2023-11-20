import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Card } from 'antd';

const EmployeeDetailsPage = () => {
  const location = useLocation();
  const { selectedEmployee } = location.state || {};
  console.log("selected",selectedEmployee);

  return (
    <div>
        <Card style={{ maxWidth:500, marginLeft: '255px', marginRight: 'auto', height: '100%', backgroundColor: 'slateblue', }}>
      <h2>Employee Details</h2>
      {selectedEmployee && (
        <div>
          <Typography>Name: {selectedEmployee.employee_firstName}</Typography>
          <Typography>Email: {selectedEmployee.employee_email}</Typography>
          <Typography>Contact no: {selectedEmployee.employee_phone}</Typography>
          {/* Display other employee details */}
        </div>
      )}
      </Card>
    </div>
  );
};

export default EmployeeDetailsPage;
