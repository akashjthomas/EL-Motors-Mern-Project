import React, { useState } from 'react';
import axios from 'axios';

function VehicleDataInput() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [predictedResult, setPredictedResult] = useState('');
    const [formData, setFormData] = useState({
        engineTemp: '',
        oilPressure: '',
        coolantLevel: '',
        oxygenSensor: '',
        fuelEfficiency: '',
        mileage: '',
        vehicleAge: '',
        rpm: '',
        vehicleSpeed: '',
        altitude: '',
        co2Emissions: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const uploadToDebugPrint = async (formData) => {
        try {
            const response = await axios.post('http://localhost:8000/debug-print/', formData);
            console.log('Response:', response.data);
            setPredictedResult(response.data.predicted_result);
            console.log(formData);
            setSuccess(true);
        } catch (error) {
            console.error('Error uploading data to Debug Print:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData) {
                setError('No data selected');
                return;
            }
            await uploadToDebugPrint(formData);
        } catch (error) {
            console.error('Error uploading data to Debug Print:', error);
            setError('Error uploading data to Debug Print');
        }
    };
    return (
        <div className="container">
            <h1>Enter Vehicle Data</h1>
            <form id="vehicleForm"  onSubmit={handleSubmit} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
                
               
                
                {Object.entries(formData).map(([key, value]) => (
                    <div className="form-group" key={key} style={{ marginBottom: '15px' }}>
                        <label htmlFor={key}>{key}</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            placeholder={`Enter ${key}`}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                ))}
                <button type="submit" style={{ color: 'wheat', backgroundColor: 'blue', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} className="btn">Submit</button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>Successfully submitted</p>}
            {predictedResult && <p>Predicted Result: {predictedResult}</p>}
        </div>
    );
}

export default VehicleDataInput;
