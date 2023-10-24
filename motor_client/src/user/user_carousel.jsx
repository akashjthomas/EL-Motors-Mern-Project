import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const UserCarousel = ({ images, captions }) => {
  

  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showIndicators={true}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
    >
       {images.map((image, index) => (
        <div key={index} className="carousel-slide" >
          <img src={image.src} alt={`Slide ${index + 1}`} />
          <div className="carousel-caption">
            <h3 className="carousel-title">{captions[index]}</h3>
          </div>
        </div>
      ))}
    </Carousel>

  );
};

export default UserCarousel;
