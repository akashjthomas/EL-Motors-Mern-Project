import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarTypeFilter from "../components/buttons";
import { Box } from "@mui/material";


function CarList() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
  const [filterType, setFilterType] = useState("");
  
    useEffect(() => {
      // Fetch the list of cars from your server
      axios.get("http://localhost:5000/api/GetCars").then((response) => {
        setCars(response.data);
      });
    }, []);
    useEffect(() => {
        if (filterType === "") {
          setFilteredCars(cars);
        } else {
          const filtered = cars.filter((car) => car.type === filterType);
          setFilteredCars(filtered);
        }
      }, [filterType, cars]);
    
  
    return (
      <div>
        <Box> <CarTypeFilter  filterType={filterType} setFilterType={setFilterType} /></Box>
       <br></br>
        <Grid container spacing={2}>
        {filteredCars.map((car, index) => (
            <Grid item xs={4} key={index}>
              <Card>
                {/* <Carousel showArrows={true} showStatus={false} showThumbs={false}>
                  {car.images.map((image, imageIndex) => (
                    <div key={imageIndex}>
                      <img
                        alt={car.model}
                        src={`http://localhost:5000/public/cars/${image}`}
                      />
                    </div>
                  ))}
                </Carousel> */}
                <CardContent>
                  <Typography variant="h5" component="div">
                    {car.model}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Year: {car.manufacturingYear}
                  </Typography>
                  {/* Add more car details as needed */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  
export default CarList;
