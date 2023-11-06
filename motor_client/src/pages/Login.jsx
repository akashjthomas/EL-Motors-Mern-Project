import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/user/userSlice';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    axios
    .post('http://localhost:5000/api/login', data)
    .then((response) => {
      console.log('Success:', response);
  
      const existingLogin = response.data.existingLogin;
      if (existingLogin) {
        console.log(existingLogin.usertype);
        console.log(existingLogin.status);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("usertype", existingLogin.usertype);
        localStorage.setItem("status",existingLogin.status);
  
        if (existingLogin.usertype === "admin") {
          alert("Login Successfully as Admin");
          dispatch(login({ useremail: data.email }));
          navigate("/adminhome");
        } else if (existingLogin.usertype === "user") {
          alert("Login Successfully");
          dispatch(login({ useremail: data.email }));
          navigate("/userhome");
        } else if (existingLogin.usertype === "employee") {
          console.log(existingLogin.password);
          console.log(existingLogin.status);
          if (existingLogin.status === "Pending") {
            alert("Not approved");
            dispatch(login({ useremail: data.email }));
            navigate("/joinus");
          } else if (existingLogin.status === "Approved") {
            alert("Login Successfully as employee");
            dispatch(login({ useremail: data.email }));
            navigate("/employeehome");
          }
          else if (existingLogin.status === "terminated") {
            alert("you have been blocked");
            dispatch(login({ useremail: data.email }));
            navigate("/login");
          }
        }
      } else {
        alert('Invalid credentials');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error');
    });
  
  };

  const validationRules = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    password: {
      required: 'Password is required',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/,
        message:
          'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one special character.',
      },
    },
  };

  return (
    <div>
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10">
          <div
            className="col-xl-4 col-lg-5 col-md-7 mx-auto"
            style={{ width: '320px' }}
          >
            <div
              className="card z-index-0"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
            >
              <div className="card-header text-center pt-4">
                <h5 style={{ color: '#050100' }}>Login</h5>
                <p className="" style={{ color: '#050100' }}>
                  Log in with your data that you entered during registration.
                </p>
              </div>

              <div className="card-body">
                <form role="form text-left" onSubmit={handleSubmit(onSubmit)}>
                  <div className={`mb-3 ${errors.email ? 'has-danger' : ''}`}>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="email-addon"
                      {...register('email', validationRules.email)}
                    />
                    <p className="text-danger">{errors?.email && errors.email.message}</p>
                  </div>

                  <div className={`mb-3 ${errors.password ? 'has-danger' : ''}`}>
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="password-addon"
                      {...register('password', validationRules.password)}
                    />
                    <p className="text-danger">{errors?.password && errors.password.message}</p>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Login
                    </button>
                  </div>

                  <p className="text-sm mt-3 mb-0" style={{ color: '#050100' }}>
                    Don't have an account?{' '}
                    <Link to="/register">Sign up</Link>
                  </p>
                  <p className="text-sm mt-2">
                  <Link to="/forgot-password">Forgot password?</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
