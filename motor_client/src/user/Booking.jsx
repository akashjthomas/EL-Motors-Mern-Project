import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import toast from "react-hot-toast";
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

function Booking() {
  const location = useLocation();
  const { carDetails } = location.state || {};
  const userId = localStorage.getItem('email');
  const {register,handleSubmit,formState:{ errors },} = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // Payment initiation
    try {
      const orderData = {
        amount: 50000, // Amount in paisa
        currency: 'INR',
        receipt: 'receipt_order_74394', // Generate a unique receipt ID for every order
      };
  
      const response = await axios.post('http://localhost:5000/api/create-order', orderData);
  
      const options = {
        key: 'rzp_test_kR8XiPc7MhwMkB', // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'EL_Motors',
        description: 'Test Payment',
        order_id: response.data.orderId, // Received from your backend
        handler: async function (response) {
          try {
            const { razorpay_payment_id } = response;
            toast.success('Payment successful');
            
            const bookingData = {
              ...data,
              paymentId: razorpay_payment_id,
              price: carDetails ? carDetails.price : '', // Include the price from carDetails
              userId: userId, // Include the userId
              model: carDetails ? carDetails.model : '', // Include the model from carDetails
              fuelSource: carDetails ? carDetails.fuelSource : '',
            };
  
            console.log(bookingData);
  
            // Submit booking data after successful payment
            const bookingResponse = await axios.post('http://localhost:5000/api/booking', bookingData);
  
            toast.success('Booking Successful:', bookingResponse);
            console.log("booking response",bookingResponse);
            alert(bookingResponse.data.message);
            navigate('/vieworders');
            const billData = {
              // bookingId: bookingResponse.data.bookingId, // Use the received booking ID or generate a new one
              model: carDetails ? carDetails.model : '',
              fuelSource: carDetails ? carDetails.fuelSource : '',
              price: carDetails ? carDetails.price : '',
              userId:userId,
              firstName: data.firstName,
              lastName: data.lastName,
              addressLine1: data.addressLine1,
              addressLine2: data.addressLine2,
              city: data.city,
              pincode: data.pincode,
              state: data.state,
              paymentId: razorpay_payment_id,
              amount: 500,
              // Other bill data...
            };
      
            const billResponse = await axios.post('http://localhost:5000/api/create-bill', billData);
      
            console.log('Bill saved successfully:', billResponse.data);
            // Additional actions after saving the bill...
          } catch (error) {
            console.error('Error processing booking after payment:', error);
            alert('Error processing booking after payment');
          }
        },
        prefill: {
          name: 'User Name', // Prefill user's name
          email: 'user@example.com', // Prefill user's email
          contact: '+918590440529', // Prefill user's contact number
        },
        notes: {
          address: 'Razorpay Corporate Office', // Additional notes, if any
        },
        theme: {
          color: '#1976D2', // Change the color according to your theme
        },


      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Error initiating payment');
    }
  };
  
  
  const validationRules = {
    mobileNo: {
      required: 'Phone number is required',
      pattern: {
        value: /^\+91[1-9]\d{9}$/,
        message: 'Invalid Indian phone number (e.g., +919876543210)',
      },
    },
    firstName: {
      required: 'First Name is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'First Name can only contain alphabetic characters',
      },
    },
    lastName: {
      required: 'Last Name is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Last Name can only contain alphabetic characters',
      },
    },
    addressLine1: {
      required: 'Street Name is required',
      pattern: {
        value: /^[A-Za-z0-9\s\-]+$/,
        message: 'Invalid street name. Street name can only contain alphabetic characters, numbers, spaces, and hyphens.'
    }},
    addressLine2: {
      required: 'Street Name is required',
      pattern: {
        value: /^[A-Za-z0-9\s\-]+$/,
        message: 'Invalid street name. Street name can only contain alphabetic characters, numbers, spaces, and hyphens.'
    }},
    city: {
      required: 'City is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Invalid city name. City can only contain alphabetic characters.',
      },
    },
    state: {
      required: 'State is required',
      validate: (value) =>
        indianStates.includes(value) || 'Invalid state. Please select a valid Indian state.State should begin with a capital letter eg:Madhya Pradesh',
    },

    pincode: {
      required: 'Postal Code is required',
      pattern: {
        value: /^[1-9][0-9]{5}$/,
        message: 'Invalid Indian postal code. Please enter a valid 6-digit PIN code.',
      },
    },
  
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      <h2 sx={{ fontSize: 24, fontWeight: 'bold', marginBottom: '16px' }}>Booking Details</h2>
      <form  style={{ width: '50%' }} onSubmit={handleSubmit(onSubmit)}>
      <TextField
          label="User Id"
          variant="outlined"
          value={userId}
          name='userId'
          fullWidth
          disabled
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Model"
          variant="outlined"
          name='model'
         value={carDetails ? carDetails.model : ''}
          fullWidth
          disabled
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Fuel Source"
          variant="outlined"
          name='fuelSource'
         value={carDetails ? carDetails.fuelSource : ''}
          fullWidth
          disabled
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Price"
          variant="outlined"
          name='price'
          value={carDetails ? carDetails.price : ''}
          fullWidth
          disabled
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Mobile Number"
          variant="outlined"
          name='mobileNo'
          sx={{ marginBottom: '8px' }}
          // value={formData.mobileNo}
          // onChange={handleChange}
          fullWidth
          error={!!errors.mobileNo} // Set error prop based on validation error
          {...register("mobileNo", validationRules.mobileNo)}
        />
        {errors.mobileNo && (
          <FormHelperText error>{errors.mobileNo.message}</FormHelperText>
        )}
        
      
        <TextField
          label="First Name"
          variant="outlined"
          // value={formData.firstName}
          name='firstName'
          // onChange={handleChange}
          fullWidth
          sx={{ marginBottom: '8px' }}
          error={!!errors.firstName} // Set error prop based on validation error
          {...register("firstName", validationRules.firstName)}
        />
        {errors.firstName && (
          <FormHelperText error>{errors.firstName.message}</FormHelperText>
        )}

        <TextField
          label="Last Name"
          variant="outlined"
          // value={formData.lastName}
          name='lastName'
          // onChange={handleChange}
          fullWidth
          sx={{ marginBottom: '8px' }}
          error={!!errors.lastName} // Set error prop based on validation error
          {...register("lastName", validationRules.lastName)}
        />
        {errors.lastName && (
          <FormHelperText error>{errors.lastName.message}</FormHelperText>
        )}

        <TextField
          label="Address Line 1"
          variant="outlined"
          name='addressLine1'
          // value={formData.addressLine1}
          fullWidth
          sx={{ marginBottom: '8px' }}
          error={!!errors.addressLine1} // Set error prop based on validation error
          {...register("addressLine1", validationRules.addressLine1)}
        />
        {errors.addressLine1&& (
          <FormHelperText error>{errors.addressLine1.message}</FormHelperText>
        )}

        <TextField
          label="Address Line 2"
          variant="outlined"
          name='addressLine2'
          // value={formData.addressLine2}
          fullWidth
          sx={{ marginBottom: '8px' }}
          error={!!errors.addressLine2} // Set error prop based on validation error
          {...register("addressLine2", validationRules.addressLine2)}
        />
        {errors.addressLine2 && (
          <FormHelperText error>{errors.addressLine2.message}</FormHelperText>
        )}

        <TextField
          label="Pincode"
          variant="outlined"
          // value={formData.pincode}
          name='pincode'
          fullWidth
          sx={{ marginBottom: '8px' }}
          error={!!errors.pincode} // Set error prop based on validation error
          {...register("pincode", validationRules.pincode)}
        />
        {errors.pincode && (
          <FormHelperText error>{errors.pincode.message}</FormHelperText>
        )}

         <TextField
          label="state"
          variant="outlined"
          // value={formData.state}
          name='state'
          fullWidth
          sx={{ marginBottom: '8px' }}
          error={!!errors.state} // Set error prop based on validation error
          {...register("state", validationRules.state)}
        />
        {errors.state && (
          <FormHelperText error>{errors.state.message}</FormHelperText>
        )}
      
            
        <TextField
          label="City"
          variant="outlined"
          name='city'
          // value={formData.city}
          // onChange={handleChange}
          fullWidth
          sx={{ marginBottom: '8px' }}
          error={!!errors.city} // Set error prop based on validation error
          {...register("city", validationRules.city)}
        />
        {errors.city && (
          <FormHelperText error>{errors.city.message}</FormHelperText>
        )}
      
        <button 
       
          type="submit"
          style={{
            padding: '8px',
            marginTop: '8px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: '#1976D2',
            color: '#fff',
          }}
        >
          Submit
        </button>
        
        
      </form>
    </Box>
  )
}

export default Booking

