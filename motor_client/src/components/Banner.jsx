import React from "react";
import { useEffect, useState } from "react";
import './Banner.css'
import Login from "../pages/Login";

// An array containing the URLs of the images to be displayed in the banner
const imageUrls = ["assets/img/hero-bg.jpg","assets/img/fordbg.jpg","assets/img/fordb.jpg"];

function Banner() {
  // State variable to keep track of the currently displayed image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use the useEffect hook to set up an interval that changes the image every 5 seconds
  useEffect(() => {
    // Create an interval that increments the image index every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 4000);

    // Clean up the interval when the component unmounts to avoid memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, []); // The empty dependency array ensures this effect runs once after initial render

  // Function to display the previous image when the left arrow button is clicked
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  // Function to display the next image when the right arrow button is clicked
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  // Inline CSS style for the container div, setting the background image and animation
  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrls[currentImageIndex]})`, // Set the background image URL
    animation: "fade 1s linear forwards", // Apply a CSS animation called "fade"
  };

  // Render the component
  return (
    <div className="about" >
      <div className="banner-container" style={backgroundImageStyle}>
        
        
        {/* Buttons for navigating to the previous and next images */}
        <button className="banner-arrow prev" onClick={prevImage}>
          &lt; {/* Left arrow character */}
        </button>
        <button className="banner-arrow next" onClick={nextImage}>
          &gt; {/* Right arrow character */}
        </button>
       
      </div>
      <div style={{  marginTop: '-550px'}}><Login/></div>
    </div>
  );
}

export default Banner;
