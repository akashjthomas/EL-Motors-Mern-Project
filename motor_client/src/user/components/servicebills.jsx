import React, { useRef, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { Card } from 'antd';
import QRCode from 'qrcode.react';
import ReactToPrint from 'react-to-print';

// Use forwardRef to handle ref in functional component
const PrintComponent = forwardRef(({ selectedPayment }, ref) => {
  return (
    <div ref={ref}>
      <Card style={{ maxWidth: 500, marginLeft: '255px', marginRight: 'auto', height: '100%', backgroundColor: 'slateblue' }}>
        <h2>Bill</h2>
        {selectedPayment && (
          <div>
            <Typography>Payment Id: {selectedPayment.servicebill.paymentId}</Typography>
<Typography>Model: {selectedPayment.servicebill.model}</Typography>
<Typography>Amount paid(in ps): {selectedPayment.servicebill.amount}</Typography>
<QRCode value={`${selectedPayment.servicebill.paymentId}, Model: ${selectedPayment.servicebill.model}, Amount paid: ${selectedPayment.servicebill.amount}`} />

          </div>
        )}
      </Card>
    </div>
  );
});

function ServiceBills() {
  const location = useLocation();
  const { selectedPayment } = location.state || {};
  const componentRef = useRef(null);

  return (
    <div>
      {/* Use ReactToPrint with forwarded ref */}
      <ReactToPrint
        trigger={() => <Button style={{ color: 'white' }}>Download as PDF</Button>}
        content={() => componentRef.current}
      />
      {/* Pass ref to PrintComponent */}
      <PrintComponent ref={componentRef} selectedPayment={selectedPayment} />
    </div>
  );
}

export default ServiceBills;
