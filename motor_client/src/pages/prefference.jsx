import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

function getCarRecommendation(preferences) {
  const { usage, passengers, terrain, safety, fuel, size, tech, style } = preferences;
  console.log('Preferences:', preferences); 

 

  if (
    usage === 'daily' &&
    passengers === 'many' &&
    (terrain === 'urban' || terrain === 'suburban') &&
    (safety === 'moderate' || safety === 'high') &&
    (fuel === 'gasoline' || fuel === 'diesel' || fuel === 'hybrid') &&
    (size === 'compact' || size === 'midsize') &&
    tech === 'advanced' &&
    style === 'modern'
  ) {
    return 'Compact Car';
  }

  if (
    usage === 'travel' &&
    (size === 'compact' || size === 'midsize') &&
    safety === 'high'
  ) {
    return 'SUV';
  }

  if (usage === 'work' && (terrain === 'off-road' || terrain === 'suburban' || terrain === 'rural') && size === 'full-size') {
    return 'Truck';
  }

  if (
    fuel === 'electric' &&
    (size === 'compact' || size === 'midsize') &&
    (tech === 'advanced' || tech === 'high-tech')
  ) {
    return 'Electric Car';
  }

  if (
    passengers === 'small' &&
    size === 'compact' &&
    style === 'sporty'
  ) {
    return 'Sports Car';
  }
  if (
    usage === 'occasional' &&
    passengers === 'small' &&
    (fuel === 'gasoline' || fuel === 'diesel' || fuel === 'hybrid' || fuel === 'electric') &&
    (terrain === 'rural' || terrain === 'off-road') &&
    safety === 'moderate' &&
    size === 'midsize' &&
    tech === 'basic' &&
    style === 'classic'
  ) {
    return 'SUVs or Off-Road';
  }

  // Add more conditions and recommendations for other combinations here
  // For example:
  if (usage === 'daily' && passengers === 'many' && terrain === 'off-road') {
    return 'Off-Road SUV';
  }

  if (usage === 'work' && passengers === 'many' && terrain === 'urban' && tech === 'high-tech') {
    return 'Cargo Van';
  }
// Check usage and terrain and provide a car suggestion based on that
if (usage && terrain) {
  if (usage === 'daily' && terrain === 'urban') {
    return 'hybrid Car';
  } else if (usage === 'daily' && terrain === 'suburban') {
    return 'hybrid Car or suv';
  } else if (usage === 'travel' && terrain === 'rural') {
    return 'off-road';
  }
  // Add more conditions based on usage and terrain as needed
}

  // You can continue adding more conditions for other combinations

  // If no specific recommendation matches, return a default message
  return 'No specific recommendation for the selected preferences.';
}

const CarSelectorForm = () => {
  const [usage, setUsage] = useState('');
  const [passengers, setPassengers] = useState('');
  const [terrain, setTerrain] = useState('');
  const [safety, setSafety] = useState('');
  const [fuel, setFuel] = useState('');
  const [size, setSize] = useState('');
  const [tech, setTech] = useState('');
  const [style, setStyle] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [formError, setFormError] = useState(false); // Define the formError state variable

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the fields are empty
    if (!usage || !passengers || !terrain || !safety || !fuel || !size || !tech || !style) {
      setFormError(true);
    } else {
      setFormError(false);
      const recommendedCar = getCarRecommendation({
        usage,
        passengers,
        terrain,
        safety,
        fuel,
        size,
        tech,
        style,
      });
      setRecommendation(recommendedCar);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Usage</InputLabel>
          <Select
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            label="Usage"
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="occasional">Occasional</MenuItem>
            <MenuItem value="work">Work</MenuItem>
            <MenuItem value="travel">Travel</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Passengers</InputLabel>
          <Select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            label="Passengers"
          >
            <MenuItem value="small">2</MenuItem>
            <MenuItem value="many">Many</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Terrain</InputLabel>
          <Select
            value={terrain}
            onChange={(e) => setTerrain(e.target.value)}
            label="Terrain"
          >
            <MenuItem value="urban">Urban</MenuItem>
            <MenuItem value="suburban">Suburban</MenuItem>
            <MenuItem value="rural">Rural</MenuItem>
            <MenuItem value="off-road">Off-Road</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Safety</InputLabel>
          <Select
            value={safety}
            onChange={(e) => setSafety(e.target.value)}
            label="Safety"
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Fuel</InputLabel>
          <Select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            label="Fuel"
          >
            <MenuItem value="gasoline">Gasoline</MenuItem>
            <MenuItem value="diesel">Diesel</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Size</InputLabel>
          <Select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            label="Size"
          >
            <MenuItem value="compact">Compact</MenuItem>
            <MenuItem value="midsize">Midsize</MenuItem>
            <MenuItem value="full-size">Full-Size</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Tech</InputLabel>
          <Select
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            label="Tech"
          >
            <MenuItem value="basic">Basic</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
            <MenuItem value="high-tech">High-Tech</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Style</InputLabel>
          <Select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            label="Style"
          >
            <MenuItem value="classic">Classic</MenuItem>
            <MenuItem value="modern">Modern</MenuItem>
            <MenuItem value="sporty">Sporty</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
      {formError && (
        <Typography variant="body2" color="error">
          All fields are required.
        </Typography>
      )}

{recommendation && (
        <div style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '16px', fontFamily: 'Arial, sans-serif' }}>
          <Typography variant="h6" style={{ fontFamily: 'Arial, sans-serif' }}>Recommended Car Type:</Typography>
          <Typography variant="body1" style={{ fontFamily: 'Arial, sans-serif' }}>{recommendation}</Typography>
        </div>
      )}
    
    </form>
  );
}

export default CarSelectorForm;