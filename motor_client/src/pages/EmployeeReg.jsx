import React ,{useState}from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

function EmployeeReg() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    document.getElementById('file').textContent = e.target.files[0].name;
  };

   //const navigate = useNavigate();
   const onSubmit = (data) =>
   {
    const formData = new FormData();
    formData.append('fname', data.fname);
    formData.append('lname', data.lname);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    formData.append('dept', data.dept);
    formData.append('houseno', data.houseno);
    formData.append('saddress', data.saddress);
    formData.append('ecity', data.ecity);
    formData.append('estate', data.estate);
    formData.append('epostalcode', data.epostalcode);
    formData.append('gender', data.gender);
    formData.append('qualification', data.qualification);
   
    if(file){
      formData.append('emp_doc', file);
    }
    
 
    console.log(data);
     axios.post('http://localhost:5000/api/joinus',formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    })
    .then((response) => {
      console.log('Employee Registered:', response.data);
      alert(response.data.message);
      navigate("/");
    })
    .catch((error) => {
      console.error('Error while Registering employee:', error);
 
    });
    
  }
  const validationRules = {
    fname: {
      required: 'First Name is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'First Name can only contain alphabetic characters',
      },
    },
    lname: {
      required: 'Last Name is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Last Name can only contain alphabetic characters',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
     phone: {
      required: 'Phone number is required',
      pattern: {
        value: /^\+91[1-9]\d{9}$/,
        message: 'Invalid Indian phone number (e.g., +919876543210)',
      },
    },
    password: {
      required: true,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/,
      message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one special character.',
    },
    
    confirmPassword: {
      required: 'Confirm password is required',
      validate: (value, context) => {
        return value === context.password || 'Passwords do not match';
      },
    },
     houseno: {
      required: 'House Number is required',
    pattern: {
      value: /^[A-Za-z0-9]+$/,
      message: 'Invalid house number. House number can only contain alphabetic characters and numbers.',
    },
    },
     saddress: {
      required: 'Street Name is required',
      pattern: {
        value: /^[A-Za-z0-9\s\-]+$/,
        message: 'Invalid street name. Street name can only contain alphabetic characters, numbers, spaces, and hyphens.'
    }},
    ecity: {
      required: 'City is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Invalid city name. City can only contain alphabetic characters.',
      },
    },
    estate: {
      required: 'State is required',
      validate: (value) =>
        indianStates.includes(value) || 'Invalid state. Please select a valid Indian state.State should begin with a capital letter eg:Madhya Pradesh',
    },

    epostalcode: {
      required: 'Postal Code is required',
      pattern: {
        value: /^[1-9][0-9]{5}$/,
        message: 'Invalid Indian postal code. Please enter a valid 6-digit PIN code.',
      },
    },
    
    gender: {
      required: 'Gender is required',
    },
    qualification: {
      required: 'Latest Qualification is required',
    },
    dept: {
        required: 'Department is required',
      },
  };

  return (
    <div style={{  backgroundColor: '#000000',
    backgroundImage: 'linear-gradient(147deg, #000000 0%, #2c3e50 74%)',
      }}
      >
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10" >
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto" style={{ width: '430px' }}>
            <div className="card z-index-1" style={{top:"150px"}}>
              <div className="card-header text-center pt-4">
                <h5>Employee Registration</h5>
                <p className="">Register as an employee.</p>
              </div>
              <div className="row px-xl-5 px-sm-4 px-3">{/* Social media login buttons */}</div>
              <div className="card-body">
                <form role="form text-left" onSubmit={handleSubmit(onSubmit)}>
                  <div className={`mb-3 ${errors.fname ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="fname"
                      {...register('fname', validationRules.fname)}
                      className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                      placeholder="First Name"
                      aria-label="fname"
                      aria-describedby="fname-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.fname && errors.fname.message}</p>

                  <div className={`mb-3 ${errors.lname ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="lname"
                      {...register('lname', validationRules.lname)}
                      className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                      placeholder="Last Name"
                      aria-label="lname"
                      aria-describedby="lname-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.lname && errors.lname.message}</p>

                  <div className={`mb-3 ${errors.email ? 'has-danger' : ''}`}>
  <input
    type="text"
    name="email"
    {...register('email', {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: 'Invalid email address',
      },
    })}
    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
    placeholder="Email"
    aria-label="email"
    aria-describedby="email-addon"
  />
</div>
<p className="text-danger">{errors?.email && errors.email.message}</p>


                  <div className={`mb-3 ${errors.phone ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="phone"
                      {...register('phone', validationRules.phone)}
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="Phone"
                      aria-label="phone"
                      aria-describedby="phone-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.phone && errors.phone.message}</p>

                  <div className={`mb-3 ${errors.dept ? 'has-danger' : ''}`}>
                    <select
                      name="dept"
                      {...register('dept', validationRules.dept)}
                      className={`form-select ${errors.dept ? 'is-invalid' : ''}`}
                      aria-label="dept"
                    >
                      <option value="">Select Department</option>
                      <option value="sales">Sales</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  <p className="text-danger">{errors?.dept && errors.dept.message}</p>

                  <div className={`mb-3 ${errors.password ? 'has-danger' : ''}`}>
                    <input
                      type="password"
                      name="password"
                      {...register('password', validationRules.password)}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
                      aria-label="password"
                      aria-describedby="password-addon"
                    />
                  </div>
                  <p className="text-danger">{""}{errors?.password && errors.password.message}</p>

                  <div className={`mb-3 ${errors.confirmPassword ? 'has-danger' : ''}`}>
                    <input
                      type="password"
                      name="confirmPassword"
                      {...register('confirmPassword', validationRules.confirmPassword)}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Confirm Password"
                      aria-label="confirmPassword"
                      aria-describedby="confirmPassword-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.confirmPassword && errors.confirmPassword.message}</p>

                  <div className={`mb-3 ${errors.houseno ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="houseno"
                      {...register('houseno', validationRules.houseno)}
                      className={`form-control ${errors.houseno ? 'is-invalid' : ''}`}
                      placeholder="House-no"
                      aria-label="houseno"
                      aria-describedby="houseno-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.houseno && errors.houseno.message}</p>

                  <div className={`mb-3 ${errors. saddress ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="saddress"
                      {...register('saddress', validationRules.saddress)}
                      className={`form-control ${errors.saddress ? 'is-invalid' : ''}`}
                      placeholder="Street Name"
                      aria-label="saddress"
                      aria-describedby=" saddress-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.saddress && errors.saddress.message}</p>

                  <div className={`mb-3 ${errors.ecity ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="ecity"
                      {...register('ecity', validationRules.ecity)}
                      className={`form-control ${errors.ecity ? 'is-invalid' : ''}`}
                      placeholder="City"
                      aria-label="ecity"
                      aria-describedby="ecity-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.ecity && errors.ecity.message}</p>

                  <div className={`mb-3 ${errors.estate ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="estate"
                      {...register('estate', validationRules.estate)}
                      className={`form-control ${errors.estate ? 'is-invalid' : ''}`}
                      placeholder="State"
                      aria-label="estate"
                      aria-describedby="estate-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.estate && errors.estate.message}</p>

                  <div className={`mb-3 ${errors.epostalcode ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="epostalcode"
                      {...register('epostalcode', validationRules.epostalcode)}
                      className={`form-control ${errors.epostalcode ? 'is-invalid' : ''}`}
                      placeholder="Postal Code"
                      aria-label="epostalcode"
                      aria-describedby="epostalcode-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.epostalcode && errors.epostalcode.message}</p>

                  <div className={`mb-3 ${errors.gender ? 'has-danger' : ''}`}>
                    <select
                      name="gender"
                      {...register('gender', validationRules.gender)}
                      className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                      aria-label="gender"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <p className="text-danger">{errors?.gender && errors.gender.message}</p>

                  <div className={`mb-3 ${errors.qualification ? 'has-danger' : ''}`}>
                    <select
                    name="qualification"
                    {...register('qualification', validationRules.qualification)}
                     className={`form-control ${errors.qualification ? 'is-invalid' : ''}`}
                    aria-label="qualification"
                    aria-describedby="qualification-addon"
                    >
                    <option value="">Select Qualification</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Others">Others</option>
                    </select>
                    </div>
                    <p className="text-danger">{errors?.qualification && errors.qualification.message}</p>
                  
                   
                    <label htmlFor="emp_doc" style={{backgroundColor: '#637591',
    color: '#fff',
    padding: '5px 7px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: '7px',}}>
  Choose a PDF File
</label>
<input
  type="file"
  accept=".pdf"
  id="emp_doc"
  name="emp_doc"
  style={{ display: 'none' }}
  onChange={handleFileChange}
/>
<span id="file" style={{ marginLeft: '10px',  color:'gray'}}>
  {file ? file.name : 'No file chosen'}
</span>


                  <div className="form-check form-check-info text-left">
                    <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" defaultChecked />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      I agree to the <a href="javascript:;" className="text-dark font-weight-bolder">Terms and Conditions</a>
                    </label>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="attractive-button btn-block btn-lg shadow-lg mt-5">
                      Register
                    </button>
                  </div>

                  <p className="text-sm mt-3 mb-0">
                    Already have an account?
                    <Link to="/">
                      <a className="font-bold">Login</a>
                    </Link>
                  </p>
                  <p>
                    <Link to="/forgotpwd">
                      <a className="font-bold">Forgot password?</a>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default EmployeeReg; 