
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Aboutus from './components/Aboutus';
import EmployeeRegistration from './components/EmployeeRegistration';
import Login from './pages/Login';
import Userhome from './user/Userhome';
import Adminhome from './admin/Adminhome';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme"
import Layout from './admin/layout';
import AdminViewusersPage from './admin/pages/admin_view_users_page';
import AdminViewUsers from './admin/components/admin_view_users';
import ProtectedRoutes from './pages/ProtectedRoutes';
import PrivateRoute from './pages/PrivateRoute';
import AdminViewEmployee from './admin/components/admin_view_employee';
import ForgotPassword from './pages/ForgotPassword';
//import ResetPassword from './pages/ResetPassword';
import OtpVerification from './pages/otpVerification';
import AdminAddCars from './admin/components/admin_add_cars';
import CarList from './pages/getCars';
import CarSelectorForm from './pages/prefference';
import MapComponent from './user/map';
import { Toaster } from 'react-hot-toast';
import CreateCategory from './admin/pages/admin_add_categories';
import CreateColor from './admin/pages/admin_add_color';
import AddCarimg from './pages/AddCarimg';
import Testdrive from './user/components/testdrive';
import EmployeeRoute from './pages/EmployeeRoute';
import Employeehome from './Employee/pages/Employeehome';
import ETestdrivelist from './Employee/pages/testdrivelist';
import Penguin from './user/penguin';
import Bronco from './user/Bronco';

import CarView from './pages/Views';
import Carbooking from './user/components/Car_booking';
import EmployeeDetailsPage from './user/EmployeeDetailspage';
import Orderdetails from './user/components/orderdetails';
import EmployeeassignedCustomers from './Employee/pages/EmployeeassignedCustomers';
import Geography from './admin/pages/geography';
import Overview from './admin/pages/Overview';
import Billing from './user/Billing';
import Delivery from './Employee/pages/Delivery';
import CorderTable from './user/components/CanceledList';
import ServiceHome from './service/pages/ServiceHome';
import Userservicehome from './user/user_servicehome';
import CarServiceForm from './user/components/CarServiceForm';





function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
   <Toaster/>
  
    <Router>
    <ThemeProvider theme={theme}>
          <CssBaseline />
        <Routes>
          {/*protected*/}
          <Route element={<ProtectedRoutes/>}>
          <Route path="/adminhome" element={<Adminhome/>} />
          </Route>
          <Route element={<ProtectedRoutes/>}>
          <Route path="/layout" element={<Layout/>} />
          </Route>
          <Route element={<ProtectedRoutes/>}>
          <Route path="/getalluser" element={<AdminViewusersPage/>} />
          </Route>
          <Route element={<ProtectedRoutes/>}>
          <Route path="/deleteuser/:id" element={<AdminViewUsers/>} /></Route>
        
          <Route element={<ProtectedRoutes/>}>
          <Route path="/viewemployee" element={<AdminViewEmployee/>} />
         </Route>
         <Route element={<ProtectedRoutes/>}>
          <Route path="/AddCars" element={<AdminAddCars/>} />
         </Route>
         <Route element={<ProtectedRoutes/>}>
          <Route path="/addcatergory" element={<CreateCategory/>} />
         </Route>
         <Route element={<ProtectedRoutes/>}>
          <Route path="/addcolors" element={<CreateColor/>} />
         </Route>
         <Route element={<ProtectedRoutes/>}>
          <Route path="/car-details" element={<AddCarimg/>} />
         </Route>
         <Route element={<ProtectedRoutes/>}>
         <Route path="/geographies" element={<Geography />} />
         </Route>
         <Route element={<ProtectedRoutes/>}>
         <Route path="/graph" element={<Overview />} />
         </Route>
         
  
          
         {/*public*/}
          <Route path="/register" element={<Registration/>} />
          <Route path="/" element={  <Home/> } />
          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/joinus" element={<EmployeeRegistration/>} />
          <Route path="/login" element={<Login/>} />
         
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password" element={<OtpVerification/>} />
          <Route path="/GetCars" element={<CarList/>} />
          <Route path="/preference" element={<CarSelectorForm/>} />
          <Route path="/location" element={<MapComponent/>} />
          <Route path="/penguin" element={<Penguin/>}/>
          <Route path="/Bronco" element={<Bronco/>}/>
          <Route path="/carview/:model/:engineNo" element={<CarView/>}/>
          <Route path='/book' element={<CarServiceForm/>}/>
          
         
          {/* private*/}
          <Route element={<PrivateRoute/>}>
          <Route path="/userhome" element={<Userhome/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
          <Route path="/testdrive" element={<Testdrive/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
          <Route path="/booking" element={<Carbooking/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
          <Route path="/vieworders" element={<Orderdetails/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
          <Route path="/contactdetails" element={<EmployeeDetailsPage/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
          <Route path="/billing" element={<Billing/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
          <Route path="/cancel" element={<CorderTable/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
        <Route path="/service" element={<Userservicehome/>} />
        </Route>
        
          {/* service */} 
        <Route element={<PrivateRoute/>}>
        <Route path="/servicehome" element={<ServiceHome/>} />
        </Route>
       


          {/* employee*/}
          <Route element={<EmployeeRoute/>}>
          <Route path="/employeehome" element={<Employeehome/>} />
          </Route>
          <Route element={<EmployeeRoute/>}>
          <Route path="/testdrivelist" element={<ETestdrivelist/>} />
         </Route>
         <Route element={<EmployeeRoute/>}>
          <Route path="/viewu" element={<EmployeeassignedCustomers/>} />
         </Route>
         <Route element={<EmployeeRoute/>}>
          <Route path="/deliver" element={<Delivery/>} />
          </Route>

        </Routes>
        </ThemeProvider>
       
      </Router>
    </div>

  );
}

export default App;
