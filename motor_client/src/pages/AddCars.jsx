import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputLabel, MenuItem } from '@mui/material';
import { FormHelperText } from '@mui/material';
import toast from "react-hot-toast";


import { Select } from "antd";
const { Option } = Select;



function AddCar() {
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState("");
  // const [colors, setColors] = useState(null);
  // const [color, setColor] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get category
  const getAllCategory = async () => {
    
    try {
      const { data } = await axios.get("http://localhost:5000/api/get-category");
      console.log("Response data:", data); // Log the response data
      if (data) {
        setCategories(data);
        console.log("Categories after setting in state:", data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  
  useEffect(() => {
    getAllCategory();
  }, []);


  // //get all color
  // const getAllColor = async () => {
    
  //   try {
  //     const { data } = await axios.get("http://localhost:5000/api/getcolor");
  //     console.log("Response data:", data); // Log the response data
  //     if (data) {
  //       setColors(data);
  //       console.log("colors after setting in state:", data?.colors);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong in getting color");
  //   }
  // };
  
  // useEffect(() => {
  //   getAllColor();
  // }, []);

  const navigate = useNavigate();
  
  
  const onSubmit = (data) => {
    const carDetails = {
      engineNo: data.engineNo,
      co: data.co,
      model: data.model,
      make: data.make,
      manufacturingYear: data.manufacturingYear,
      category: category,
      cylinder: data.cylinder,
      price: data.price,
      fuelSource: data.fuelSource,
      interiorColor: data.interiorColor,
      interiorMaterial: data.interiorMaterial,
      airbags: data.airbags,
      audioSystem: data.audioSystem,
      transmission: data.transmission,
      wheeltype: data.wheeltype,
      seats: data.seats,
      size: data.size,
      length: data.length,
    };
  
    axios
      .post("http://localhost:5000/api/addCars", carDetails) // Send the carDetails object
      .then((response) => {
        console.log("Success:", response);
        alert(response.data.message);
  
        // After successfully adding the car, navigate to the "CarDetailsPage" with carDetails
        navigate("/car-details", { state: { carDetails } });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error");
      });
  };
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
    category:{
      required:true,
    },
     cylinder: {
      required: 'Cylinder is required',
    pattern: {
      value: /^[A-Za-z0-9\s\-()]+(?:\s[A-Za-z]+)?$/,
      message: 'Invalid cylinder type.',
    },
    },
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
      // color:{
      //   required:'color is required',
      // }
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
  <Select
    bordered={false}
    placeholder="Select a category"
    size="large"
    showSearch
    className="form-select mb-3"
    onChange={(value) => {
      setCategory(value);
    }}
  >
    {categories?.map((c) => (
      <Option key={c._id} value={c._id}>
        {c.name}
      </Option>
    ))}
  </Select>
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
            {/* <Grid item xs={12}>
            
  <Select
    bordered={false}
    placeholder="Select a color"
    size="large"
    showSearch
    className="form-select mb-3"
    onChange={(value) => {
      setColor(value);
    }}
  >
    {colors?.map((c) => (
      <Option key={c._id} value={c._id}>
        {c.name}
      </Option>
    ))}
  </Select>
</Grid> */}
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
