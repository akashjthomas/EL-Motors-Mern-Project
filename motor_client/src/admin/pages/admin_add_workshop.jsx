import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Grid, Paper, Typography, Card } from '@mui/material';

function AdminAddWorkshop() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
      phone: ''
    },
    criteriaMode: 'all'
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("http://localhost:5000/api/workshops", data);
      console.log("Success:", response);
      alert(response.data.message);
      // Optionally, you can navigate to another page after successful submission
      // navigate("/");
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data);
    }
  };

  const validationRules = {
    name: {
      required: 'Name is required',
      minLength: {
        value: 3,
        message: 'Name must have at least 3 characters',
      },
    },
    address: {
      required: 'Address is required',
      pattern: {
        value: /^[A-Za-z0-9\s\-,]+$/ ,
        message: 'Invalid street name. Street name can only contain alphabetic characters, numbers, spaces, and hyphens.'
      }
    },
    phone: {
      required: 'Phone number is required',
      pattern: {
        value: /^\+91[1-9]\d{9}$/,
        message: 'Invalid Indian phone number (e.g., +919876543210)',
      },
    }
  };

  return (
    <div>
      <Card style={{
        maxWidth: 300, marginLeft: '255px', marginRight: 'auto', height: '75%',
        borderRadius: '12px', // Adjust the radius value as needed
        overflow: 'hidden'
      }}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom>Add Workshop</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...register("name", validationRules.name)}
                />
                {errors.name && <span>{errors.name.message}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  {...register("address", validationRules.address)}
                />
                {errors.address && <span>{errors.address.message}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  {...register("phone", validationRules.phone)}
                />
                {errors.phone && <span>{errors.phone.message}</span>}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Add Workshop
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Card>
    </div>
  )
}

export default AdminAddWorkshop;
