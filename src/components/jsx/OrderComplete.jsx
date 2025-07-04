import React from 'react';

import '../css/OrderComplete.css';

const OrderComplete = () => (
  <div className="order-complete-root">
    <div className="order-complete-content">
      <div className="order-complete-iconbox">
        <svg className="order-complete-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="order-complete-title">Thank you!</h2>
      <p className="order-complete-message">Your booking is complete.<br />A confirmation has been sent to your email.</p>
    </div>
    <a href="/" className="order-complete-btn">Back to Home</a>
  </div>
);

export default OrderComplete;
