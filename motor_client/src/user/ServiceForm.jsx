import { Card } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select, DatePicker } from 'antd'; // Import DatePicker
const { Option } = Select;
function ServiceForm() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);
    const [pickUp, setPickUp] = useState('No'); 
    const [selectedDate, setSelectedDate] = useState(null);
    const userId = localStorage.getItem('email');
    const cardStyle = {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: '20px',
        marginLeft: '100px',
        marginRight: '100px',
        width: '400px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)' // Add shadow
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
        const { selectedOption, vin, pickupAddress, pincode,date } = data;
        console.log("sele",date);
        console.log("dataa",data);
        if (selectedOption && vin) {
            // Use the state updater function's callback form
            setModel((prevModel) => {
                console.log('Model value:', prevModel); // Log the previous value
                // Pass the selected service type, VIN, and model as parameters in the URL
                navigate(`/${selectedOption}?service=${selectedOption}&vin=${vin}&model=${prevModel}&pickupAddress=${pickupAddress}&pincode=${pincode}&selectedDate=${selectedDate}`);

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
          {...register('pickupAddress', { 
            required: true,
            pattern: /^[a-zA-Z0-9\s,.'-]*$/ // Regular expression for alphanumeric with spaces and common special characters
          })}
        />
        {errors.pickupAddress && errors.pickupAddress.type === "required" && (
          <p style={{ color: 'red' }}>Pickup Address is required</p>
        )}
        {errors.pickupAddress && errors.pickupAddress.type === "pattern" && (
          <p style={{ color: 'red' }}>Invalid Pickup Address</p>
        )}
                        </Col>
                        <br></br>
                        <br></br>
                       
                        <Col style={{ display: 'flex', justifyContent: 'flex-end'}}>
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
        <div style={{ marginLeft: '200px', marginRight: 'auto' }}>

  
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
                                    style={{
                                        padding: '10px',
                                        fontSize: '16px',
                                        border: '2px solid #ccc',
                                        borderRadius: '5px',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                        boxSizing: 'border-box',
                                        width: '100%',
                                        marginBottom: '10px',
                                      }}
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
                                            value:/^[A-Z]{2}\s(?!00)\d{2}\s[A-Z]{2}\s(?!0000)\d{4}$/,
                                            message: 'Invalid VIN eg( GJ 03 AY 1097)',
                                        }
                                    })}
                                    style={{
                                        padding: '10px',
                                        fontSize: '16px',
                                        border: '2px solid #ccc',
                                        borderRadius: '5px',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                        boxSizing: 'border-box',
                                        width: '100%',
                                        marginBottom: '10px',
                                      }}
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
                                <label htmlFor="serviceType">SERVICE TYPE:</label>
                            </Col>
                            <Col>
                                <select
                                 style={{
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '2px solid #ccc',
                                    borderRadius: '5px',
                                    backgroundColor: '#f9f9f9',
                                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    marginBottom: '10px',
                                  }}
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
                            <label htmlFor="pickUp">PICK UP:</label>
                        </Col>
                        <Col>
                            <select
                              style={{
                                padding: '10px',
                                fontSize: '16px',
                                border: '2px solid #ccc',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                boxSizing: 'border-box',
                                width: '100%',
                                marginBottom: '10px',
                              }}
                                id="pickUp"
                                onChange={(e) => handlePickUpChange(e.target.value)}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </Col>
                    </Row>
                    <br />
                    <br></br>
                    {/* Render address fields conditionally based on pick-up selection */}
                    {renderAddressFields()}

                    {/* Date picker */}
                    <Row>
                        <Col>
                            <label htmlFor="date">Date:</label>
                        </Col>
                        <Col>
                            <DatePicker
                             name="date"
                                onChange={(date) => {
                                    console.log("dtaee,",date)
                                    setSelectedDate(date)}}
                                    
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <div style={{ textAlign: 'center' }}>
  <Button type='submit'>Submit</Button>
</div>
                </form>
            </Card>
        </div>
    );
}

export default ServiceForm;
