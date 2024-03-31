import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

function Insurance() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
const userid=localStorage.getItem('email')
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const fileName = e.target.files[0].name;
    const fileDisplay = document.getElementById('file');
    if (fileDisplay) {
      fileDisplay.textContent = fileName;
    } else {
      console.error("Element with id 'file' not found.");
    }
  };
  
 
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('policy_type', data.policy_type);
    formData.append('policy_no', data.policy_no);
    formData.append('policy_date', data.policy_date);
    formData.append('policy_end', data.policy_end);
    formData.append('insured_name', data.insured_name);
    formData.append('invoice', data.invoice);
    formData.append('regno', data.regno);
    formData.append('idv', data.idv);
    formData.append('Coverage', data.Coverage);
    formData.append('insurername', data.insurername);
    formData.append('contact', data.contact);
    formData.append('userid',userid);
    if (file) {
      formData.append('policyFile', file);
    }

    axios
      .post("http://localhost:5000/api/insure", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })
      .then((response) => {
        console.log("Success:", response);
        alert(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.error(error.response.data);
        alert(error.response.data);
      });
  };
  const validationRules = {
    policy_type: {
      required: 'Policy type is required',
      pattern:{
        value:/^[a-zA-Z]+$/,
        message: 'Policy type format must be correct'
      },
    },
    policy_no: {
      required: 'Policy number is required',
      pattern: {
        value: /^\d{16}$/,
        message: 'Policy number must be exactly 16 digits',
      },
      validate: (policyNumber) => {
        const minValue = 1000000000000000; // Minimum policy number value
    
        if (!policyNumber) {
          return 'Policy number is required';
        }
    
        if (parseInt(policyNumber) < minValue) {
          return 'Policy number value should be greater than or equal to 1000000000000000';
        }
    
       
      }
    },
    policy_date: {
      required: 'Policy start date is required',
    },
    policy_end: {
      required: 'Policy end date is required',
      validate: (value, { policy_date }) => {
        const startDate = moment(policy_date, 'YYYY-MM-DD');
        const endDate = moment(value, 'YYYY-MM-DD');
        const currentDate = moment();
    
        if (!startDate.isValid() || !endDate.isValid()) {
          return 'Please enter valid dates';
        }
    
        if (startDate.isAfter(endDate)) {
          return 'Policy end date must be later than policy start date';
        }
    
        const maxValidity = moment(policy_date).add(1, 'year');
        if (endDate.isAfter(maxValidity)) {
          return 'Policy end date must be within one year from the policy start date.';
        }
    
        if (endDate.isBefore(currentDate)) {
          return 'Policy end date should not be older than current date';
        }
    
        return true;
      },
    },
    
    insured_name: {
      required: 'Insured name is required',
      pattern:{
        value:/^[a-zA-Z]|[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/,
        message :'name is required'
      },
      validate: (insuredName) => {
        if (!insuredName) {
          return 'Insured name is required';
        } else if (insuredName.length <= 1) {
          return 'Insured name should contain more than one character';
        }
       
      }
      
    },
    invoice: {
      required: 'Invoice is required',
      validate: (invoiceNumber) => {
        const minValue = 10000; // Minimum invoice value
        const maxLength = 14; // Maximum invoice length
    
        if (!invoiceNumber) {
          return 'Invoice is required';
        } else if (invoiceNumber.length < 5 || invoiceNumber.length > maxLength) {
          return 'Invoice length should be between 6 and 14 characters';
        } else if (parseInt(invoiceNumber) < minValue) {
          return 'Invoice value should be greater than 1000';
        }
      }
    },
    regno:{
      required:"Registration no is required",
      pattern: {
        value:/^[A-Z]{2}\s(?!00)\d{2}\s[A-Z]{2}\s(?!0000)\d{4}$/,
        message: 'Invalid VIN eg( GJ 03 AY 1097)',
    }
    },

    idv: {
      required: 'Insured Declared Value is required',
      validate: (value) => {
        const minValue = 10000; // Minimum IDV value
        const maxValue = 2000000; // Maximum IDV value
    
        if (!value && value !== 0) {
          return 'Insured Declared Value is required';
        }
    
        else if (isNaN(value)) {
          return 'Insured Declared Value must be a number';
        }
    
        else if (value < minValue || value > maxValue) {
          return `Insured Declared Value must be between ${minValue} and ${maxValue}`;
        }
    
       
      }
    },
      Coverage: {
        required: ' Coverage Details is required',
        pattern:{
          value:/^[a-zA-Z]+$/,
          message: 'Policy type format must be correct'
        },
      },
      insurername:{
        required: 'insurers name is required',
        pattern:{
          value:/^[a-zA-Z]|[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/,
          message :'name is required'
        },
        validate: (insuredName) => {
          if (!insuredName) {
            return 'Insured name is required';
          } else if (insuredName.length <= 1) {
            return 'Insured name should contain more than one character';
          }
         
        }

      },
      contact:{
        required: 'contact is required',
        pattern: {
          value: /^\+91[1-9]\d{9}$/,
          message: 'Invalid Indian phone number (e.g., +919876543210)',
        },
      },
    // Add other validation rules here...
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      backgroundImage: 'linear-gradient(147deg, #000000 0%, #2c3e50 74%)',
    }}>
      <br />
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10" style={{ height: '1000px' }}>
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto" style={{ width: '430px' }}>
            <div className="card z-index-0" style={{ top: '120px', bottom: '50px' }}>
              <div className="card-header text-center pt-4">
                <h5>Insurance</h5>
                <p className="">Add Insurance Details </p>
              </div>

              <div className="card-body">
                <form role="form text-left" onSubmit={handleSubmit(onSubmit)}>
                  <div className={`mb-3 ${errors.policy_type ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="policy_type"
                      {...register('policy_type', validationRules.policy_type)}
                      className={`form-control ${errors.policy_type ? 'is-invalid' : ''}`}
                      placeholder="Policy Type"
                      aria-label="policy_type"
                      aria-describedby="policy_type-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.policy_type && errors.policy_type.message}</p>

                  <div className={`mb-3 ${errors.policy_no ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="policy_no"
                      {...register('policy_no', validationRules.policy_no)}
                      className={`form-control ${errors.policy_no ? 'is-invalid' : ''}`}
                      placeholder="Policy Number"
                      aria-label="policy_no"
                      aria-describedby="policy_no-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.policy_no && errors.policy_no.message}</p>

                  <div className={`mb-3 ${errors.policy_date ? 'has-danger' : ''}`}>
                    <label>Policy start Date</label>
                    <input
                      type="date"
                      name="policy_date"
                      {...register('policy_date', validationRules.policy_date)}
                      className={`form-control ${errors.policy_no ? 'is-invalid' : ''}`}
                      placeholder="Policy Issued On"
                      aria-label="policy_date"
                      aria-describedby="policy_date-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.policy_date && errors.policy_date.message}</p>
{/* policy end */}
<label>Policy Expiry Date</label>
                    <div className={`mb-3 ${errors.policy_end ? 'has-danger' : ''}`}>
                    <input
                      type="date"
                      name="policy_end"
                      {...register('policy_end', validationRules.policy_end)}
                      className={`form-control ${errors.policy_end ? 'is-invalid' : ''}`}
                      placeholder="Policy expires On"
                      aria-label="policy_end"
                      aria-describedby="policy_end-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.policy_end && errors.policy_end.message}</p>

                  {/* insured name */}
                  <div className={`mb-3 ${errors.insured_name ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="insured_name"
                      {...register('insured_name', validationRules.insured_name)}
                      className={`form-control ${errors.insured_name ? 'is-invalid' : ''}`}
                      placeholder="Insured Name"
                      aria-label="insured_name"
                      aria-describedby="insured_name-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.insured_name && errors.insured_name.message}</p>
{/* invoice */}
                    <div className={`mb-3 ${errors.invoice ? 'has-danger' : ''}`}>
                    <input
                      type="number"
                      name="invoice"
                      {...register('invoice', validationRules.invoice)}
                      className={`form-control ${errors.invoice ? 'is-invalid' : ''}`}
                      placeholder="Invoice no"
                      aria-label="invoice"
                      aria-describedby="invoice-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.invoice && errors.invoice.message}</p>

{/* Vehicle regno */}
                   <div className={`mb-3 ${errors.regno ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="regno"
                      {...register('regno', validationRules.regno)}
                      className={`form-control ${errors.regno ? 'is-invalid' : ''}`}
                      placeholder="Vehicle Registration no"
                      aria-label="regno"
                      aria-describedby="regno-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.regno && errors.regno.message}</p>

                  {/* Insured Declared Value */}
                  <div className={`mb-3 ${errors.idv ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="idv"
                      {...register('idv', validationRules.idv)}
                      className={`form-control ${errors.idv ? 'is-invalid' : ''}`}
                      placeholder=" Insured Declared Value"
                      aria-label="idv"
                      aria-describedby="idv-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.idv && errors.idv.message}</p>

                  {/* Coverage Details */}

                  <div className={`mb-3 ${errors.Coverage ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="Coverage"
                      {...register('Coverage', validationRules.Coverage )}
                      className={`form-control ${errors.Coverage ? 'is-invalid' : ''}`}
                      placeholder=" Coverage Details"
                      aria-label="Coverage"
                      aria-describedby="Coverage-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.Coverage && errors.Coverage.message}</p>

                  {/* Insurer's Name */}

                  <div className={`mb-3 ${errors.insurername ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="insurername"
                      {...register('insurername', validationRules.insurername )}
                      className={`form-control ${errors.insurername ? 'is-invalid' : ''}`}
                      placeholder=" insurer's name"
                      aria-label="insurername"
                      aria-describedby="insurername-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.insurername && errors.insurername.message}</p>

                  {/* contact */}

                  <div className={`mb-3 ${errors.contact ? 'has-danger' : ''}`}>
                    <input
                      type="text"
                      name="contact"
                      {...register('contact', validationRules.contact )}
                      className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                      placeholder="contact details(insurance company)"
                      aria-label="contact"
                      aria-describedby="contact-addon"
                    />
                  </div>
                  <p className="text-danger">{errors?.contact && errors.contact.message}</p>



                  {/* File upload field */}
                  <div className={`mb-3 ${errors.policyFile ? 'has-danger' : ''}`}>
                    <input
                      type="file"
                      name="policyFile"
                      {...register('policyFile')}
                      className={`form-control ${errors.policyFile ? 'is-invalid' : ''}`}
                      aria-describedby="policyFile-addon"
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="text-danger">{errors?.policyFile && errors.policyFile.message}</p>

                

                  <div className="text-center">
                    <button type="submit" className="attractive-button btn-block btn-lg shadow-lg mt-5">Insurance</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Insurance;
