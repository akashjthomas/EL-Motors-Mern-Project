import React from 'react'
	

	import {Navigate, Outlet} from 'react-router-dom'
	

	const useAuth=()=>{
	  //const user=localStorage.getItem('isLoggedIn')
	  const type=localStorage.getItem('usertype')
	  if(type==="admin"){
	    return true
	  } else {
	    return false
	  }
	}
	
	

	const  ProtectedRoutes=(props) =>{
	

	  const auth=useAuth()
	

	  return auth?<Outlet/>: <Navigate to="/login"/>
	}
	

	export default ProtectedRoutes;;