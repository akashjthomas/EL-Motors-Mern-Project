import React from 'react'
	

	import {Navigate, Outlet} from 'react-router-dom'
	

	const useAuth=()=>{
	  //const user=localStorage.getItem('isLoggedIn')
      const type=localStorage.getItem('usertype')
	  if( type==="employee"){
	    return true
	  } else {
	    return false
	  }
	}
	

	const  EmployeeRoute=(props) =>{
	

	  const auth=useAuth()
	

	  return auth?<Outlet/>: <Navigate to="/login"/>
	}
	

	export default EmployeeRoute;;