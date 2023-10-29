import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputLabel, Select, MenuItem } from '@mui/material';
import { FormHelperText } from '@mui/material';


function AddCar() {
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("engineNo", data.engineNo);
    formData.append("co", data.co);
    formData.append("model", data.model);
    formData.append("make", data.make);
    formData.append("manufacturingYear", data.manufacturingYear);
    formData.append("type", data.type);
    formData.append("cylinder", data.cylinder);
    formData.append("variant", data.variant);
    formData.append("price", data.price);
    formData.append("fuelSource", data.fuelSource);
    formData.append("interiorColor", data.interiorColor);
    formData.append("interiorMaterial", data.interiorMaterial);
    formData.append("airbags", data.airbags);
    formData.append("audioSystem", data.audioSystem);
    formData.append("transmission", data.transmission);
    formData.append("wheeltype", data.wheeltype);
    formData.append("seats", data.seats);
    formData.append("size", data.size);
    formData.append("length", data.length);

    if (file) {
      for (let i = 0; i < file.length; i++) {
        formData.append("addcars", file[i]);
      }
    }
    
    axios
      .post("http://localhost:5000/api/AddCars", formData)
      .then((response) => {
        console.log("Success:", response);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error");
      });
  };
  const carVariants = [
    "Sedan", "SUV", "Hatchback", "Crossover", "Convertible",
    "Coupe", "Minivan", "Truck", "Sports Car",
    "Electric Vehicle (EV)", "Hybrid", "Luxury Car", "Off-Road Vehicle"
  ];
  const validationRules = {
    engineNo: {
      required: 'Engine No is required',
      pattern: {
        value: /^[0-9A-Z]{17}$/,
        message: 'format:4S3BMHB683286050',
      },
    },
    co: {
      required: 'co is required',
      pattern: {
        value: /^ELMOTORS\d+$/,
        message: 'CO is required ',
      },
    },
    model: {
      required: 'model is required',
      pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: 'Invalid model  address',
      },
    },
     make: {
      required: 'make is required',
      pattern: {
        value: /^FORD$/ ,
        message: 'invalid',
      },
    },
    manufacturingYear: {
      required: true,
      pattern: /^(19[0-9][0-9]|20[0-9][0-9])$/ ,
      message: 'enter the manufacting year',
    },
    
    type: {
      required: 'Type is required',
      pattern:["Sedan", "SUV", "Hatchback", "Crossover", "Convertible", "Coupe", "Minivan", "Truck", "Sports Car", "Electric Vehicle (EV)", "Hybrid", "Luxury Car", "Off-Road Vehicle"],
    },
     cylinder: {
      required: 'Cylinder is required',
    pattern: {
      value: /^[A-Za-z0-9\s\-()]+(?:\s[A-Za-z]+)?$/,
      message: 'Invalid cylinder type.',
    },
    },
    variant: {
      required: 'Variant Name is required',
      pattern: {
        value: ["Standard Trim", "Mid-Level Trim", "Top-End Trim", "Platinum Trim"],
        message: 'Invalid variant name.'
    }},
    price: {
      required: 'price is required',
      pattern: {
        value: /^\d+(\.\d{1,2})?$/,
        message: 'invalid price format.',
      },
    },
    fuelSource: {
      required: 'fuelsource is required',
      pattern: {
        value: /^[A-Za-z0-9\s\-()]+(?:\s[A-Za-z]+)?$/ ,
        message: 'invalid format.',
      },
    },

    interiorColor: {
      required: 'interior color is required',
      pattern: {
        message: 'colour is required',
      },
    },
    
    airbags: {
      required: 'number  of airbags  are  required',
    },
    interiorMaterial: {
      required: 'interior material  is required',
    },
    audioSystem: {
        required: 'audiosystem is required',
      },
      transmission: {
        required: 'transmission is required',
      },
     seats: {
        required: 'number of seats are required',
      },
      wheeltype: {
        required: 'wheel type is required',
      },
      size: {
        required: 'size of the  vehicle  is required',
      },
      length: {
        required: 'length of the vehicle is required ',
      },
  };


  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3}>
        <Typography component="h2" variant="h5">
          Add a Car
        </Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Engine No"
                name="engineNo"
                fullWidth
                error={!!errors.engineNo} // Set error prop based on validation error
  {...register("engineNo", validationRules.engineNo)}
/>
{errors.engineNo && (
  <FormHelperText error>{errors.engineNo.message}</FormHelperText>
)}
            </Grid>
            <Grid item xs={12}>
              <TextField label="CO"   name="co" fullWidth 
              error={!!errors.co} // Set error prop based on validation error
              {...register("co", validationRules.co)}
            />
            {errors.co && (
              <FormHelperText error>{errors.co.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Model" 
              name="model"
              fullWidth 
              error={!!errors.model} // Set error prop based on validation error
              {...register("model", validationRules.model)}
            />
            {errors.model&& (
              <FormHelperText error>{errors.model.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Make"
              name="make"
              fullWidth  error={!!errors.make} // Set error prop based on validation error
              {...register("make", validationRules.make)}
            />
            {errors.make && (
              <FormHelperText error>{errors.make.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Manufacturing Year"
                type="number"
                name="manufacturingYear"
                fullWidth
                error={!!errors.manufacturingYear} // Set error prop based on validation error
                {...register("manufacturingYear", validationRules.manufacturingYear)}
              />
              {errors.manufacturingYear && (
                <FormHelperText error>{errors.manufacturingYear.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Type" 
              name="type"
              fullWidth  error={!!errors.type} // Set error prop based on validation error
              {...register("type", validationRules.type)}
            />
            {errors.type && (
              <FormHelperText error>{errors.type.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Cylinder"
              name="cylinder" 
              fullWidth 
              error={!!errors.cylinder} // Set error prop based on validation error
              {...register("cylinder", validationRules.cylinder)}
            />
            {errors.cylinder && (
              <FormHelperText error>{errors.cylinder.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
            <InputLabel>Variant</InputLabel>
            <Select  
      fullWidth
      error={!!errors.variant} // Set error prop based on validation error
    {...register("variant", validationRules.variant)}
  >
     
      {carVariants.map((variant) => (
        <MenuItem key={variant} value={variant}>
          {variant}
        </MenuItem>
      ))}
    </Select>
    {errors.variant && (
    <FormHelperText error>{errors.variant.message}</FormHelperText>
  )}</Grid>
            <Grid item xs={12}>
              <TextField label="Price" type="number"
              name="price"
              fullWidth error={!!errors.price} // Set error prop based on validation error
              {...register("price", validationRules.price)}
            />
            {errors.price && (
              <FormHelperText error>{errors.price.message}</FormHelperText>
            )} 
            </Grid>
            <Grid item xs={12}>
              <TextField label="Fuel Source" 
              name="fuelSource"
              fullWidth error={!!errors.fuelSource} // Set error prop based on validation error
              {...register("fuelSource", validationRules.fuelSource)}
            />
            {errors.fuelSource && (
              <FormHelperText error>{errors.fuelSource.message}</FormHelperText>
            )} 
            </Grid>
            <Grid item xs={12}>
              <TextField label="Interior Color"
              name="interiorColor"
               fullWidth error={!!errors.interiorColor} // Set error prop based on validation error
               {...register("interiorColor", validationRules.interiorColor)}
             />
             {errors.interiorColor && (
               <FormHelperText error>{errors.interiorColor.message}</FormHelperText>
             )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Interior Material" 
              name="interiorMaterial"
              fullWidth error={!!errors.interiorMaterial} // Set error prop based on validation error
              {...register("interiorMaterial", validationRules.interiorMaterial)}
            />
            {errors.interiorMaterial && (
              <FormHelperText error>{errors.interiorMaterial.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Airbags" type="number" 
              name="airbags"
              fullWidth  error={!!errors.airbags} // Set error prop based on validation error
              {...register("airbags", validationRules.airbags)}
            />
            {errors.airbags && (
              <FormHelperText error>{errors.airbags.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Audio System" 
              name="audioSystem"
              fullWidth  error={!!errors.audioSystem} // Set error prop based on validation error
              {...register("audioSystem", validationRules.audioSystem)}
            />
            {errors.audioSystem && (
              <FormHelperText error>{errors.audioSystem.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Transmission"
               name="transmission"
              fullWidth error={!!errors.transmission} // Set error prop based on validation error
              {...register("transmission", validationRules.transmission)}
            />
            {errors.transmission && (
              <FormHelperText error>{errors.transmission.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Wheel Type" 
              name="wheeltype"
              fullWidth error={!!errors.wheeltype} // Set error prop based on validation error
              {...register("wheeltype", validationRules.wheeltype)}
            />
            {errors.wheeltype && (
              <FormHelperText error>{errors.wheeltype.message}</FormHelperText>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Seats" type="number"
              name="seats"
               fullWidth error={!!errors.seats} // Set error prop based on validation error
               {...register("seats", validationRules.seats)}
             />
             {errors.seats && (
               <FormHelperText error>{errors.seats.message}</FormHelperText>
             )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Size"
              name="size"
               fullWidth error={!!errors.size} // Set error prop based on validation error
               {...register("size", validationRules.size)}
             />
             {errors.size && (
               <FormHelperText error>{errors.size.message}</FormHelperText>
             )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Length"
              name="length" 
               fullWidth error={!!errors.length} // Set error prop based on validation error
               {...register("length", validationRules.length)}
             />
             {errors.length && (
               <FormHelperText error>{errors.length.message}</FormHelperText>
             )}
            </Grid>
            <Grid item xs={12}>
            <input
  type="file"
  className="form-control"
  name="addcars"
  multiple
  onChange={(e) => setFile(e.target.files)} // Capture all selected files
/>
            </Grid>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Add Car
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddCar;
