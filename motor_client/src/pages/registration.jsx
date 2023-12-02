import React from 'react';
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

  const navigate = useNavigate();
  const {register,handleSubmit,formState:{ errors },} = useForm({mode: 'onChange'});
    const onSubmit = (data) =>
     {
       console.log(data);
       axios.post("http://localhost:5000/api/register", data)
            .then((response) => {
                console.log("Success:", response);
                alert(response.data.message);
                navigate("/");
        })
        .catch((error) => {
           console.error(error.response.data);
            alert(error.response.data);
        });     
     
     }
  
  const validationRules = {
    username: {
      required: 'Name is required',
      minLength: {
        value: 3,
        message: 'Name must have at least 3 characters',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
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
    dob: {
      required: 'Date of birth is required',
      validate: {
        validDate: (value) => {
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
          if (!dateRegex.test(value)) {
            return 'Invalid date format. Use YYYY-MM-DD format.';
          }
    
          const dobDate = new Date(value);
          const currentDate = new Date();
          const minAllowedDate = new Date();
          
          // Calculate the minimum allowed date (18 years ago from the current date)
          minAllowedDate.setFullYear(currentDate.getFullYear() - 18);
    
          if (isNaN(dobDate.getTime())) {
            return 'Invalid date. Please enter a valid date.';
          }
    
          if (dobDate >= minAllowedDate) {
            return 'You must be at least 18 years old to register.';
          }
    
          return true; // Validation passed
        },
      },
    },
    
    
    password: {
      required: true,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/,
      message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one special character.',
      },
    
    confirmPassword: {
      required: 'Confirm password is required',
      validate: (value, context) =>
        value === context.password || 'Passwords do not match',
    },
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      backgroundImage: 'linear-gradient(147deg, #000000 0%, #2c3e50 74%)',
    }}>
      <br />
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10" style={{ height: '700px' }}>
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto" style={{ width: '430px' }}>
            <div className="card z-index-0" style={{ top: '120px', bottom: '50px' }}>
              <div className="card-header text-center pt-4">
                <h5>Register</h5>
                <p className="">Create a new account</p>
              </div>

              <div className="card-body">
                <form role="form text-left" onSubmit={handleSubmit(onSubmit)}>
                  <div className={`mb-3 ${errors.username ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="username"
                      {...register('username', validationRules.username)}
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      placeholder="Full Name"
                      aria-label="username"
                      aria-describedby="username-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.username && errors.username.message}</p>

                  <div className={`mb-3 ${errors.email ? 'has-danger' : ''}`}>
                    <input
                      type="email"
                      name="email"
                      {...register('email', validationRules.email)}
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
                      placeholder="Phone Number"
                      aria-label="phone"
                      aria-describedby="phone-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.phone && errors.phone.message}</p>

                  <div className={`mb-3 ${errors.dob ? 'has-danger' : ''}`}>
                    <input
                      type="date"
                      name="dob"
                      {...register('dob', validationRules.dob)}
                      className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                      placeholder="Date of Birth"
                      aria-label="dob"
                      aria-describedby="dob-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.dob && errors.dob.message}</p>

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
                  <p className="text-danger">{errors?.password && errors.password.message}</p>

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

                  <div className="text-center">
                    <button type="submit" className="attractive-button btn-block btn-lg shadow-lg mt-5">Register</button>
                  </div>
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
    </div>
  );
}

export default Register;
