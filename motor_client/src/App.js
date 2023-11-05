
//import Footer from './components/Footer';
//import Mini from './components/Mini';
//import Topbar from './components/Topbar';
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
         
          {/* private*/}
          <Route element={<PrivateRoute/>}>
          <Route path="/userhome" element={<Userhome/>} />
          </Route>
        </Routes>
        </ThemeProvider>
      </Router>
    </div>

  );
}

export default App;
