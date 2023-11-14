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
import './carcard.css';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

function CarList() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [images, setImages] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    // Fetch the list of cars from your server
    axios.get("http://localhost:5000/api/GetCars").then((response) => {
      setCars(response.data);
    });
  }, []);

  useEffect(() => {
    // Fetch the list of car images from your server
    axios.get("http://localhost:5000/api/getimage").then((response) => {
      setImages(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredCars = filterType
      ? cars.filter((car) => car.category._id === filterType) // Use the correct field path
      : cars;

    setFilteredCars(filteredCars);
  }, [filterType, cars]);

  useEffect(() => {
    const filteredCars = filterType
      ? cars.filter((car) => car.category._id === filterType) // Use the correct field path
      : cars;

    // Filter cars based on the search query
    const searchFilteredCars = filteredCars.filter((car) => {
      const carValues = Object.values(car).join(" ").toLowerCase();
      return carValues.includes(searchQuery.toLowerCase());
    });

    setFilteredCars(searchFilteredCars);
  }, [filterType, cars, searchQuery]);

  return (
    <div>
      <Box>
        <CarTypeFilter filterType={filterType} setFilterType={setFilterType} />
      </Box>
      <br />
       {/* Search bar */}
       <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ borderRadius: "20px",width:"200px" }}
      />
      <Grid container spacing={2}>
     
        {filteredCars.map((car, index) => (
          <Grid item xs={4} key={index}>
      
            <Card style={{ height: "100%" }}
            className={`car-card ${hoveredCard === index ? "hovered" : ""}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}>
            <Carousel showArrows={true} showStatus={false} showThumbs={false}>
  {images
    .filter((image) => image.model === car.model)
    .map((image, index) => (
      <img
        key={index}
        src={`http://localhost:5000/cars/${image.url}`}
        alt={car.model}
        style={{ maxWidth: "100%" }}
      />
    ))}
</Carousel>

              <CardContent>
                <Typography variant="h5" component="div">
                  {car.model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Year: {car.manufacturingYear}
                </Typography>
                <Link to={`/carview/${car.model}/${car.engineNo}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" 
         style={{
          backgroundColor: "#4169E1",
          color: "white",
        }}
    
        >
          View
        </Button>
      </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
      </Grid>
    </div>
  );
}

export default CarList;
