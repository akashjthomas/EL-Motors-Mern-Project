import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


function AdminViewUsers({ isSidebarOpen }) {
  const usersPerPage = 10;
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const[logins,setLogins]=useState([]);
  const[lstatus,setlStatus]=useState(false);

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getalluser');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [statusUpdated]);
  //login credentials
  useEffect(() => {
   
    const fetchLogins = async () => {
      try {
        const responses = await axios.get('http://localhost:5000/api/getalllogin');
        setLogins(responses.data);
       
      } catch (error) {
        console.error('Error fetching loginusers:', error);
      }
    };
    fetchLogins();
  },);


  const handleDisableUser = async (email) => {
    try {
      console.log(email);
    
      // Send a request to disable the user with the given email
      // You may want to use your API endpoint for disabling users
    const responss= await axios.patch(`http://localhost:5000/api/blockuser/${email}`,{
      email:email,
      status:"blocked"

    });
  
      // Update the user status in the local state
    } catch (error) {
      console.error(error);
    }
  };
  const handleEnableUser = async (email) => {
    try {
      console.log(email);
    
      // Send a request to disable the user with the given email
      // You may want to use your API endpoint for disabling users
    const responss= await axios.patch(`http://localhost:5000/api/approveuser/${email}`,{
      email:email,
      status:"Authorised"

    });
  
      // Update the user status in the local state
    } catch (error) {
      console.error(error);
    }
  };
  

  

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  const pageCount = Math.ceil(users.length / usersPerPage);
  const tableWidth = isSidebarOpen ? 'calc(100% - 250px)' : '100%'; // Adjust table width based on sidebar state

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
 
  


  return (
    <div id="main">
      <div className="container mt-5 card" style={{padding:"20px"}}>
        <h2>User List</h2>
        <div className="table-responsive" style={{ width: tableWidth }}>
        <table className="table"  >
          <thead >
            <tr >
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Dob</th>
              <th>Disable</th>
              <th>Enable</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}  >
                <td >{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.dob}</td>
                <td>
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => handleDisableUser(user.email)}
    >
      Disable
    </button>
</td>
<td>
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => handleEnableUser(user.email)}
    >
     Enable
    </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
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

export default AdminViewUsers;
