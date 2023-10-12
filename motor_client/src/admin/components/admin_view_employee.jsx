import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function AdminViewEmployee() {
  const usersPerPage = 10;
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [statusUpdated, setStatusUpdated] = useState(false);

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [statusUpdated]);

  
  

  const offset = currentPage * usersPerPage;
  const currentemployees = employees.slice(offset, offset + usersPerPage);

  const pageCount = Math.ceil(employees.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleApproveClick = async (employeeId,email) => {
    try {
      console.log(employeeId);
      console.log(email)
      setStatusUpdated(false);
      const response = await axios.patch(`http://localhost:5000/api/approveemployees/${employeeId}`, 
      { status: 'Approved',
         email:email,
    });

    console.log(response.data.message);
    setStatusUpdated(true);
    alert(response.data.message);
    setStatusUpdated(true);
    } catch (error) {
      console.error('Error updating status:', error);
      alert("Error updating status");
    }
   
  };

  return (
    <div id="main">
      <div className="container mt-5 card" style={{padding:"20px"}}>
        <h2>Employee Request</h2>
        <table className="table">
          <thead>
            <tr>
            <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
              <th>department</th>
              <th>qualification</th>
              <th>Document</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {currentemployees.map((tr) => (
  // Check the status and conditionally render the row
  tr.status === 'Pending' ? (
    <tr key={tr._id}>
      <td>{tr.employee_firstName}</td>
      <td>{tr.employee_lastName}</td>
      <td>{tr.employee_email}</td>
      <td>{tr.employee_phone}</td>
      <td>{tr.employee_department}</td>
      <td>{tr.employee_qualification}</td>
      <td>
  <a href={`http://localhost:5000/downloads/${tr.employee_document}`} download>
    Download Document
  </a>
</td>
      <td><span className="badge bg-danger">{tr.status}</span></td>
      <td><button
        type="button"
        onClick={() => handleApproveClick(tr._id, tr.employee_email)}
        className="btn btn-primary"
      >
        Approve
      </button></td>
      <td><button type="button" className="btn btn-danger">Delete</button></td>
    </tr>
  ) : null// Render nothing if the status is not 'Approved'
))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>



      <div className="container mt-5 card" style={{padding:"20px",backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
        <h2>Employee Updated List</h2>
        <table className="table">
          <thead style={{padding:"20px",backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
            <tr>
            <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
              <th>department</th>
              <th>qualification</th>
               <th>Document</th> 
              <th>Status</th>
              <th>Approve</th>
              
            </tr>
          </thead>
          <tbody style={{padding:"20px",backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
          {currentemployees.map((tr) => (
  // Check the status and conditionally render the row
  tr.status === 'Approved' ? (
    <tr key={tr._id}>
      <td>{tr.employee_firstName}</td>
      <td>{tr.employee_lastName}</td>
      <td>{tr.employee_email}</td>
      <td>{tr.employee_phone}</td>
      <td>{tr.employee_department}</td>
      <td>{tr.employee_qualification}</td>
      <td>
  <a href={`http://localhost:5000/downloads/${tr.employee_document}`} download>
    Download Document
  </a>
</td>
      <td>  <span className="badge bg-success">{tr.status}</span></td>
      <td><button
        type="button"
       
        className="btn btn-warning"
      >
        Terminate
      </button></td>
    </tr>
  ) : null // Render nothing if the status is not 'Approved'
))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default AdminViewEmployee;
