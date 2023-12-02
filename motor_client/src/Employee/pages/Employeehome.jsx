import React from 'react'
import EmployeeLayout from '../components/employeeLayout'
import { Box, Grid, Hidden,Card} from '@mui/material';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
function Employeehome() {
  const empemail=localStorage.getItem("email");
  const meetings = [
    { day: 'Monday', type: 'Meeting with Team Lead', purpose: 'Goals for the Week' },
    { day: 'Wednesday', type: 'Meeting with Team Lead', purpose: 'Progress Assessment' },
    { day: 'Saturday', type: 'Meeting with Team Lead', purpose: 'Sales Report' },
  ];
  return (
    <div>
        <EmployeeLayout/>
        <Box 
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s"
      >
        <div>
          <h4>Welcome, {empemail} 
          </h4>
        </div>
        
    
      
        <Box className="d-flex flex-column align-items-start"> 
        <Card style={{ maxWidth:500, marginLeft: '255px', marginRight: 'auto', height: '100%', backgroundColor: '#0000',borderRadius: '12px', // Adjust the radius value as needed
            overflow: 'hidden' }}>
        <h1>TERMS AND CONDITIONS</h1>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br></br>
 It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Card>
      <br></br>
      <h1>SCHEDULES</h1>
      <Card style={{ maxWidth:500, marginLeft: '255px', marginRight: 'auto', height: '100%', backgroundColor: '#0000',borderRadius: '12px', 
            overflow: 'hidden' }}>
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>Day</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Purpose</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {meetings.map((meeting, index) => (
          <TableRow key={index}>
            <TableCell>{meeting.day}</TableCell>
            <TableCell>{meeting.type}</TableCell>
            <TableCell>{meeting.purpose}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </Card>
        </Box>
        
      <h3>Your Rights</h3><br></br>
      <Card style={{backgroundColor: '#0000',borderRadius: '12px', 
            overflow: 'hidden' }}>
      <b>[1] The Maternity Benefit Act,2017</b> <br></br> An Act further to amend the Maternity Benefit Act, 1961.<br></br>

<b>[2] Payment of Gratuity Act, 1972</b><br></br> An Act to provide for a scheme for the payment of gratuity to employees engaged in factories, mines, oilfields, plantations, ports, railway companies, shops or other establishments and for matters connected therewith or incidental thereto.<br></br>

<b>[3] Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013</b> <br></br> An Act to provide protection against sexual harassment of women at workplace and for the prevention and redressal of complaints of sexual harassment and for matters connected therewith or incidental thereto.<br></br>
       </Card>
      </Box>
      
     
    </div>
  )
}

export default Employeehome