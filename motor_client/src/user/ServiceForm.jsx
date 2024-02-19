import { Card } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
const { Option } = Select;
function ServiceForm() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);
    const [pickUp, setPickUp] = useState('No'); 
    const userId = localStorage.getItem('email');
    const cardStyle = {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: '20px',
        marginLeft: '100px',
        marginRight: '100px',
        width: '300px'
    }; 
   
    const getModel = async () => {
        try {
          const { data } = await axios.get('http://localhost:5000/api/getmodel');
          if (data) {
            setModels(data);
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong in getting model');
        }
      };
    
      useEffect(() => {
        getModel();
      }, []);

      useEffect(() => {
        console.log('Models state:', model);
    }, [model]);

    const { register, handleSubmit, formState: { errors } } = useForm(({mode: 'onChange'}));
  
    const onSubmit = (data) => {
        const { selectedOption, vin, pickupAddress, pincode } = data;
        if (selectedOption && vin) {
            // Use the state updater function's callback form
            setModel((prevModel) => {
                console.log('Model value:', prevModel); // Log the previous value
                // Pass the selected service type, VIN, and model as parameters in the URL
                navigate(`/${selectedOption}?service=${selectedOption}&vin=${vin}&model=${prevModel}&pickupAddress=${pickupAddress}&pincode=${pincode}`);
                return prevModel; // Return the previous value
            });
        }
    };
    
       // Function to handle pick-up selection
       const handlePickUpChange = (value) => {
        setPickUp(value);
    };

    // Conditional rendering for address fields based on pick-up selection
    const renderAddressFields = () => {
        if (pickUp === 'Yes') {
            return (
                <>
                    <Row>
                        <Col>
                            <label htmlFor="pickupAddress">Pickup Address:</label>
                        </Col>
                        <Col>
                            <input
                                type="text"
                                id="pickupAddress"
                                {...register('pickupAddress', { required: true })}
                            />
                            {errors.pickupAddress && <p style={{ color: 'red' }}>Pickup Address is required</p>}
                        </Col>
                        <Col>
                        <label htmlFor="pincode">Pincode:</label>
        <input
            type="text"
            id="pincode"
            {...register('pincode', { required: true, pattern: /^\d{6}$/ })}
        />
        {errors.pincode && <p style={{ color: 'red' }}>Pincode must be 6 digits</p>}
    </Col>
                    </Row>
                    <br />
                    {/* Additional address fields can be added here */}
                </>
            );
        }
        return null;
    };

    return (
        <div>
  
            <Card style={cardStyle}>
                <h2>Schedule Service</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <div>
                            <Col>
                                <label htmlFor="userId">UserID:</label>
                            </Col>
                            <Col>
                                <input
                                    type="text"
                                    id="userId"
                                    defaultValue={userId}
                                    disabled
                                    required
                                    {...register('userId')}
                                />
                            </Col>
                        </div>
                    </Row>
                    <br />
                    <Row>
                        <div>
                            <Col><label htmlFor="vin">VIN (Vehicle Identification Number):</label></Col>
                            <Col>
                                <input
                                    type="text"
                                    id="vin"
                                    required
                                    {...register('vin', {
                                        required: 'VIN is required',
                                        pattern: {
                                            value:/^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/,
                                            message: 'Invalid VIN eg( GJ 03 AY 1097)',
                                        }
                                    })}
                                />
                                {errors.vin && <p style={{ color: 'red' }}>{errors.vin.message}</p>}
                            </Col>
                        </div>
                    </Row>
                    <br />
                    <Col><label htmlFor="model">MODEL </label></Col>
<Select
    bordered={false}
    name="model"
    placeholder="Select a model"
    fullWidth
    required
    value={model}
    showSearch
    className="form-select mb-3"
    onChange={(value) => {
        console.log('Selected model:', value);
        setModel(value); // Update the model state here
    }}
>
{models?.map((modelItem, index) => (
    <Option key={index} value={modelItem}>
        {modelItem}
    </Option>
))}
</Select>


         
                    <Row>
                        <div>
                            <Col>
                                <label htmlFor="serviceType">Service Type:</label>
                            </Col>
                            <Col>
                                <select
                                    id="serviceType"
                                    {...register('selectedOption', { required: true })}
                                >
                                    <option value="">Service Type</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Wear">Wear and Tear</option>
                                   
                                </select>
                                {errors.selectedOption && <p style={{ color: 'red' }}>Service Type is required</p>}
                            </Col>
                        </div>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <label htmlFor="pickUp">Pick Up:</label>
                        </Col>
                        <Col>
                            <select
                                id="pickUp"
                                onChange={(e) => handlePickUpChange(e.target.value)}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </Col>
                    </Row>
                    <br />
                    {/* Render address fields conditionally based on pick-up selection */}
                    {renderAddressFields()}
                    <Button type='submit'>Submit</Button>
                </form>
            </Card>
        </div>
    );
}

export default ServiceForm;
