import { Card } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function ServiceForm() {
    const theme = useTheme();
    const navigate = useNavigate();
    const userId = localStorage.getItem('email');
    const cardStyle = {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: '20px',
        marginLeft: '100px',
        marginRight: '100px',
        width: '300px'
    }; 

    const { register, handleSubmit, formState: { errors } } = useForm(({mode: 'onChange'}));
  
    const onSubmit = (data) => {
        const { selectedOption, vin } = data;
        if (selectedOption && vin) {
            // Pass the selected service type and VIN as parameters in the URL
            navigate(`/${selectedOption}?service=${selectedOption}&vin=${vin}`);
        }
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
                    <Button type='submit'>Submit</Button>
                </form>
            </Card>
        </div>
    );
}

export default ServiceForm;
