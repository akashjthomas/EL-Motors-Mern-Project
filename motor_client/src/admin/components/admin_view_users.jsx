import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


function AdminViewUsers({ isSidebarOpen }) {
  const usersPerPage = 10;
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [statusUpdated, setStatusUpdated] = useState(false);

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


  // const handleDeleteUser = async (userId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/deleteuser/${userId}`);
      
  //     const updatedUsers = users.filter((user) => user._id !== userId);
  //     setUsers(updatedUsers);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  

  

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
              <th>Delete</th>
              <th>Disable</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}  >
                <td >{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.dob}</td>
                {/* <td><button type="button" class="btn btn-danger"  onClick={() => handleDeleteUser(user._id)}>Delete</button></td> */}
                <td><button type="button" class="btn btn-danger" >Disable</button></td>
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
