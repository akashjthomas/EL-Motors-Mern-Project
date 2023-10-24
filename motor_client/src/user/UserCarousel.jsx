import UserCarousel from "./user_carousel";
import React from 'react';

const UCarousel = () => {
  // Define different sets of images and captions for each usage of UserCarousel
  const images1 = [
    { src: 'assets/img/fordlogo.jpg' },
    { src: 'assets/img/holdinghands.jpg' },
  ];
  const captions1 = ['Since 1903', 'Commited to Serve'];

  const images2 = [
    { src: 'assets/img/ford.jpeg' },
    { src: 'assets/img/fordbb.jpg' },
  ];
  const captions2 = ['Discover New Horizons', 'Adventure Awaits YOU.'];

  const images3 = [
    { src: 'assets/img/hero-bg.jpg' },
    { src: 'assets/img/fordb.jpg' },
  ];
  const captions3= ['Form is temporary,', 'class is permanent'];

  const containerStyle = {
    display: 'flex', // Create a flex container to align items horizontally
    justifyContent: 'space-between',
    width: '100%', // Full width for the image
    
   
    
    
  };

  const carouselStyle = {
    width: '100%', // Adjust the width as needed to leave some space between carousels
    padding: '20px',
    // border: '1px solid #ccc', // Optional: Add a border for separation
    objectFit: 'cover', // Ensure the image covers the available space
   
  };

  

  return (
    <div style={containerStyle} className="ucarousel-container">
      <div style={carouselStyle} className="ucarousel">
        <UserCarousel images={images1} captions={captions1}  />
      </div>

      <div style={carouselStyle} className="ucarousel">
        <UserCarousel images={images2} captions={captions2}/>
      </div>

      <div style={carouselStyle} className="ucarousel">
        <UserCarousel images={images3} captions={captions3}/>
      </div>
      
    </div>
  );
};

export default UCarousel;
