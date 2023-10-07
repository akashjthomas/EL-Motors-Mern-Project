import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/user/userSlice'; // Import the logout action
import UserLayout from './UserLayout';



function Userhome() {
  //const username=localStorage.getItem("name");
  const useremail=localStorage.getItem("email");
  console.log(useremail);
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
      localStorage.clear();
      dispatch(logout({userid:"",useremail:""}));
      navigate("/",{replace:true},{redirect:true});
  };
  return (
    <div>
      <UserLayout/>
      <div>
      Welcome, 
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

export default Userhome;
