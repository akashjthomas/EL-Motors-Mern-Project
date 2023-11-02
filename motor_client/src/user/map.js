import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';

class MapComponent extends Component {
  state = {
    searchQuery: '', // Initialize with an empty string
    errorMessage: '', // Initialize error message
  };

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2FubmFiZXlvdXJzIiwiYSI6ImNsb2hieW9kdDFhM20yam9pazlyazdvcjAifQ.3yg0bo1UCIeOiY03xE8C-Q';

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [76.5740323493548, 10.2006029531576],
      zoom: 13,
      pitch: 80,
      bearing: 41,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.addControl(geocoder);
    map.on('style.load', () => {
        map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        });

    // Listen for the geocoder result event
    geocoder.on('result', (event) => {
      const coordinates = event.result.center;
      const searchQuery = event.result.text.toLowerCase(); // Get the search query in lowercase
      this.queryTerrainData(coordinates, searchQuery);
    });
  }

  queryTerrainData(coordinates, searchQuery) {
    // List of valid districts in Kerala (all lowercase)
    const validDistricts = [
      'thiruvananthapuram',
      'kollam',
      'pathanamthitta',
      'alappuzha',
      'kottayam',
      'idukki',
      'ernakulam',
      'thrissur',
      'palakkad',
      'malappuram',
      'kozhikode',
      'wayanad',
      'kannur',
      'kasaragod',
    ];
  
    // Convert searchQuery to lowercase for case-insensitive comparison
    searchQuery = searchQuery.toLowerCase();
  
    // Log the searchQuery for debugging
    console.log('Search Query:', searchQuery);
  
    switch (searchQuery) {
        case 'idukki':
          // Special message for "Idukki"
          this.setState({ searchQuery, errorMessage: "Idukki is a hilly place. You should probably choose an SUV or offroad vehicle." });
          // Log a message for debugging
          console.log('Special Message for Idukki');
          break;
    
        case 'thiruvananthapuram':
          // Special message for "Thiruvananthapuram"
          this.setState({ searchQuery, errorMessage: "You could have vehicle of your choice as the roads but if you looking for a beach drive you should go for a off road vehicle" });
          // Log a message for debugging
          console.log('Special Message for Thiruvananthapuram');
          break;
    
        case 'kollam':
          // Special message for "Kollam"
          this.setState({ searchQuery, errorMessage: "you could go for sedan or hybrid but ultimately its upto you go for it" });
          // Log a message for debugging
          console.log('Special Message for Kollam');
          break;
    
        // Add more cases for other districts as needed
        case 'kottayam':
          // Special message for "Kollam"
          this.setState({ searchQuery, errorMessage: "you could go for sedan or hybrid but ultimately its upto you go for it" });
          // Log a message for debugging
          console.log('Special Message for Kollam');
          break;

        
        case 'ernakulam':
            // Special message for "Kollam"
            this.setState({ searchQuery, errorMessage: "you could go for sedan or hybrid but ultimately its upto you go for it" });
            // Log a message for debugging
            console.log('Special Message for Kollam');
            break;

        case 'thrissur':
                // Special message for "Kollam"
                this.setState({ searchQuery, errorMessage: "you could go for sedan or hybrid but ultimately its upto you go for it" });
                // Log a message for debugging
                console.log('Special Message for Kollam');
                break;

        case 'kozhikode':
                    // Special message for "Kollam"
                    this.setState({ searchQuery, errorMessage: "Beach ridges, backwater marshes and sandbars are landforms which are exhibited in the flat, narrow terrain of the coastal plains \n. you could go for suv or sedan||hybrid" });
                    // Log a message for debugging
                    console.log('Special Message for Kollam');
                    break;
        case 'kasaragod':
                        // Special message for "Idukki"
                        this.setState({ searchQuery, errorMessage: "You should probably choose an SUV or offroad vehicle." });
                        // Log a message for debugging
                        console.log('Special Message for Idukki');
                        break;
        case 'pathanamthitta':
                            // Special message for "Idukki"
                            this.setState({ searchQuery, errorMessage: "You should probably choose an SUV or offroad vehicle." });
                            // Log a message for debugging
                            console.log('Special Message for Idukki');
                            break;
      
        case 'alappuzha':
                         // Special message for "Kollam"
                        this.setState({ searchQuery, errorMessage: "you could go for sedan or hybrid but ultimately its upto you go for it" });
                        // Log a message for debugging
                        console.log('Special Message for Kollam');
                        break;
        case 'malappuram':
                            // Special message for "Idukki"
                            this.setState({ searchQuery, errorMessage: "You should probably choose an SUV or offroad vehicle." });
                            // Log a message for debugging
                            console.log('Special Message for Idukki');
                            break;
        case 'wayanad':
                            // Special message for "Idukki"
                          this.setState({ searchQuery, errorMessage: "You should probably choose an SUV or offroad vehicle." });
                        // Log a message for debugging
                           console.log('Special Message for Idukki');
                            break;
        case 'kannur':
                         // Special message for "Kollam"
                        this.setState({ searchQuery, errorMessage: "you could go for sedan or hybrid but ultimately its upto you go for it" });
                        // Log a message for debugging
                        console.log('Special Message for Kollam');
                         break;
     case 'palakkad':
                     // Special message for "Kollam"
                           this.setState({ searchQuery, errorMessage: "you could go for sedan or hybrid but ultimately its upto you go for it" });
                           // Log a message for debugging
                           console.log('Special Message for Kollam');
                            break;
        default:
          // Invalid district
          this.setState({ searchQuery: '', errorMessage: 'Enter a valid district of Kerala' });
          // Log a message for debugging
          console.log('Invalid District');
      }

    const [longitude, latitude] = coordinates;
    const terrainAPI = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${longitude},${latitude},1/1024x1024.pngraw?access_token=YOUR_MAPBOX_ACCESS_TOKEN`; // Replace with your Mapbox access token

    axios
      .get(terrainAPI, { responseType: 'arraybuffer' })
      .then((response) => {
        // Process the elevation data and terrain information
        // You may need to parse and interpret the data as per your requirements
        console.log(response.data); // Log the response for demonstration
      })
      .catch((error) => {
        console.error('Error fetching terrain data:', error);
      });
  }

  render() {
    return (
      <div>
        <div ref={(el) => (this.mapContainer = el)} style={{ width: '75%', height: '500px' }} />
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
        <p>Search Query: {this.state.searchQuery}</p>
      </div>
    );
  }
}

export default MapComponent;
