// components/ViewReview.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ViewReview() {
  const [assistanceRoads, setAssistanceRoads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/viewreview'); // Assuming your backend endpoint is '/api/assistance-roads'
        setAssistanceRoads(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const filteredRoads = assistanceRoads.filter(road => {
    return (
      road.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      road.emp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      road.location.longitude.toString().includes(searchTerm) ||
      road.location.latitude.toString().includes(searchTerm) ||
      road.location.vehicleRegNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      road.location.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const downloadAsPDF = () => {
    const input = document.getElementById('table-container');
    input.querySelectorAll('td').forEach(td => {
        td.style.color = '#FF0000'; // Change to your desired text color
      });

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('assistance_road_data.pdf');
      });
  };
  return (
    <div style={{ overflowX: 'auto' }}>
      <h2>Assistance Road Data</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
            <button onClick={downloadAsPDF}>Download as PDF</button>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #f7d560' }} id="table-container">
        <thead>
          <tr>
          <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>Request ID</th>
            <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>Your ID</th>

            <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}> Vehicle Reg Number</th>
            <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>Recipient ID</th>
            <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>Problem Solved?</th>
            <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>Image</th>
            <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>createdAt</th>
            <th style={{ backgroundColor: '#36454f', border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>UpdatedAt</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoads.map((road) => (
            <tr key={road._id}>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road._id}</td>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road.id}</td>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road.yourId}</td>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road.vehicleRegNum}</td>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road.userId}</td>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road.problemSolved}</td>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road.image}</td>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road.createdAt}</td>
              <td style={{ border: '1px solid #f7d560', padding: '8px', textAlign: 'left' }}>{road.updatedAt}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReview;
  