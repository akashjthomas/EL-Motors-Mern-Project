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
            <Typography>Payment Id: {selectedPayment.bill.paymentId}</Typography>
            <Typography>Model: {selectedPayment.bill.model}</Typography>
            <Typography>Amount paid: {selectedPayment.bill.amount}</Typography>
            <Typography>Amount paid: {selectedPayment.bill.amount}</Typography>
            <QRCode value={`${selectedPayment.bill.paymentId}, Model: ${selectedPayment.bill.model}, Amount paid: ${selectedPayment.bill.amount}`} />
          </div>
        )}
      </Card>
    </div>
  );
});

function Billing() {
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

export default Billing;
