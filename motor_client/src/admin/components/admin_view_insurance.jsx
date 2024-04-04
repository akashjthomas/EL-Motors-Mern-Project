import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function AdminViewInsurance() {
  const usersPerPage = 10;
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [statusUpdated, setStatusUpdated] = useState(false);

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getinsurance');
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

  const handleApproveClick = async (_id) => {
    try {
      console.log(_id);
     
      setStatusUpdated(false);
      const response = await axios.patch(`http://localhost:5000/api/ainsurance/${_id}`, 
      { status: 'Approved',
         
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
        <h2>Insurance Request List</h2>
        <table className="table">
          <thead>
            <tr>
            <th>policy type</th>
              <th>policy no</th>
              <th>requested on</th>
              <th>policy expiry</th>
              <th>insured name</th>
              <th>vehicle regno</th>
              <th>insurer name</th>
              <th>insurer contact</th>
              <th>Docs</th>
              <th>Status</th>
              {/* <th>Approve</th> */}
             
            </tr>
          </thead>
          <tbody>
          {currentemployees.map((tr) => (
  // Check the status and conditionally render the row
  tr.status === 'Rejected' ? (
    <tr key={tr._id}>
      <td>{tr.policy_type}</td>
      <td>{tr.policy_no}</td>
      <td>{tr.policy_date}</td>
      <td>{tr.policy_end}</td>
      <td>{tr.insured_name}</td>
      <td>{tr.regno}</td>
      <td>{tr.insurername}</td>
      <td>{tr.contact}</td>
      <td>
  <a href={`http://localhost:5000/downloads/${tr.policyFile}`} download>
    Download Document
  </a>
</td>
      <td><span className="badge bg-danger">{tr.status}</span></td>
      <td><button
        type="button"
        onClick={() => handleApproveClick(tr._id, tr.regno)}
        className="btn btn-primary"
      >
        Approve
      </button></td>
     
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
        <h2>Insurance Updated List</h2>
        <table className="table">
          <thead style={{padding:"20px",backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
            <tr>
            <th>policy type</th>
              <th>policy no</th>
              <th>requested on</th>
              <th>policy expiry</th>
              <th>insured name</th>
              <th>vehicle regno</th>
              <th>insurer name</th>
              <th>insurer contact</th>
              <th>Docs</th>
              <th>Status</th>
              {/* <th>Approve</th> */}
              
            </tr>
          </thead>
          <tbody style={{padding:"20px",backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
          {currentemployees.map((tr) => (
  // Check the status and conditionally render the row
  tr.status === 'Approved' ? (
    <tr key={tr._id}>
      <td>{tr.policy_type}</td>
      <td>{tr.policy_no}</td>
      <td>{tr.policy_date}</td>
      <td>{tr.policy_end}</td>
      <td>{tr.insured_name}</td>
      <td>{tr.regno}</td>
      <td>{tr.insurername}</td>
      <td>{tr.contact}</td>
      <td>
      <a href={`http://localhost:5000/downloads/${tr.policyFile}`} download>
    Download Document
  </a>
</td>
      <td>  <span className="badge bg-success">{tr.status}</span></td>


      {/* handel approve */}
      
      
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

export default AdminViewInsurance;
