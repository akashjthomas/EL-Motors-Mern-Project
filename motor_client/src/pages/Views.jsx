import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import UserLayout from "../user/UserLayout";
import { Link } from "react-router-dom";


function CarView() {
  const { model,engineNo } = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [carImages, setCarImages] = useState([]);

  useEffect(() => {
    // Fetch car details based on the model
    axios.post(`http://localhost:5000/api/view/${model}/${engineNo}`)
      .then((response) => {
        setCarDetails(response.data);
    
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });

    // Fetch car images based on the model
    axios.post(`http://localhost:5000/api/carimages/${model}/${engineNo}`)
      .then((response) => {
        setCarImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car images:", error);
      });
  }, [model,engineNo]);

  return (
    <div>
      <UserLayout/>
      <Box ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0.3s">
        <Typography variant="h4" gutterBottom>
          {carDetails.model}
        </Typography>
      </Box>
    
      <Card style={{ maxWidth: 300, marginLeft: '255px', marginRight: 'auto', height: '100%' }}>
        {carImages.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/cars/${image.url}`}
            alt={`${carDetails.model} - Image ${index + 1}`}
            style={{ maxWidth: "100%" }}
          />
        ))}
      </Card>

      <Card style={{ maxWidth: 300, margin: 'auto',height:'100%',marginLeft: '255px', marginRight: 'auto' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Car Details
          </Typography>
          <Typography variant="body1">
            <strong>Model:</strong> {carDetails.model}
          </Typography>
          <Typography variant="body1">
            <strong>Year:</strong> {carDetails.manufacturingYear}
          </Typography>
          <Typography variant="body1">
            {carDetails.model === "Mustang" && (
            <Link to="/bronco"><strong>View in 360</strong>  </Link>
          )}
          </Typography>
          
          <Typography variant="body1">
            {carDetails.model === "Mustang19" && (
            <Link to="/penguin"><strong>View in 360</strong>  </Link>
          )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CarView;
