
import React, { useState,useEffect  } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import toast from "react-hot-toast";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import { Box } from "@mui/material";
const { Option } = Select;

function AddCarimg() {
    const navigate = useNavigate();
    const location = useLocation();
    const [colors, setColors] = useState(null);
    const [color, setColor] = useState("");
    const [file, setFile] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({mode: 'onChange'});
  //get all color
  const getAllColor = async () => {
    
    try {
      const { data } = await axios.get("http://localhost:5000/api/getcolor");
      console.log("Response data:", data); // Log the response data
      if (data) {
        setColors(data);
        console.log("colors after setting in state:", data?.colors);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting color");
    }
  };
  
  useEffect(() => {
    getAllColor();
  }, []);

  //usenavigate
    const carDetails = location.state.carDetails;
    if (!carDetails) {
        return <div>No car details found.</div>;
      }

///
      
      const onSubmit = (datas) =>
      {
        console.log("Data to be sent to the backend:", datas); 
        console.log("Engine Number:", datas.engineNo);
console.log("Model:", datas.model);
console.log("Color:", datas.color);
console.log("File:", file); // Check if the file object is not null

        const formData = new FormData();
    
        formData.append("color", datas.color);
        formData.append("engineNo", String(datas.engineNo));
        formData.append("model", String(datas.model));
    
        if (file) {
          formData.append("car_img", file);
        }
    console.log(formData,"formdata");
        axios
          .post("http://localhost:5000/api/addimage", formData)
          .then((response) => {
            console.log("Success:", response);
            alert(response.data.message);
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error");
          });
      };

    return (
<div>
    <Box
     sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Adjust the height as needed to center vertically
        padding: "16px",
      }}>
  <h1 sx={{ fontSize: 24, fontWeight: "bold", marginBottom: "16px" }}>Car Details</h1>
  <ul>
  
    {/* Add similar fields for other car details here */}
  </ul>
  <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl variant="outlined" sx={{ width: "100%", marginBottom: "16px" }}>
    <TextField
            label="Engine No"
            variant="outlined"
            value={carDetails.engineNo}
            fullWidth
            {...register("engineNo")} 
          />
    <br></br>
    <TextField label="Model"  variant="outlined"  value={carDetails.model} fullWidth  {...register("model")}/><br></br>
    <h5>Add color</h5>
      <Select
        fullWidth
        {...register("color")} 
        value={color}
        onChange={(e) => setColor(e.target.value)}
        label="Color"
        id="color-select"
        sx={{ fontSize: "1rem", padding: "5px" }}
      >
        {colors?.map((c) => (
          <MenuItem key={c._id} value={c._id}>
            {c.name}
          </MenuItem>
        ))
        }
      </Select>
    </FormControl>
    <div>
        <input type="file"
            className="form-control"
            name="car_img"
            onChange={(e) => setFile(e.target.files[0])}
                              />
                            </div>
    <br></br>              
    <div className="col-sm-12 d-flex justify-content-center" >
          <button type="submit" className="btn btn-primary me-1 mb-1" >
            Submit
            </button>
 </div>
  </form>
  </Box>
</div>
    );
  }
export default AddCarimg




  


