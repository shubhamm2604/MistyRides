import React from 'react';
import { Check, Home, Download } from 'lucide-react';
import { useBooking } from './BookingContext';
import '../css/OrderComplete.css';

const OrderComplete = () => {
  const { resetBooking, formData, selectedVehicle, customerDetails } = useBooking();

  const handleBackToHome = () => {
    resetBooking();
    window.location.href = '/';
  };

  const generateBookingReference = () => {
    return `MR${Date.now().toString().slice(-6)}`;
  };

  return (
    <div className="order-complete-root">
      <div className="order-complete-content">
        <div className="order-complete-iconbox">
          <Check className="order-complete-icon" />
        </div>
        
        <h2 className="order-complete-title">Booking Confirmed!</h2>
        
        <div className="order-complete-details">
          <p className="order-complete-message">
            Thank you, {customerDetails.firstName}! Your booking has been confirmed.
          </p>
          
          <div className="order-complete-reference">
            <strong>Booking Reference:</strong> {generateBookingReference()}
          </div>
          
          <div className="order-complete-summary">
            <div className="order-complete-summary-item">
              <span>📅 Date:</span> {formData.date}
            </div>
            <div className="order-complete-summary-item">
              <span>⏰ Time:</span> {formData.time}
            </div>
            <div className="order-complete-summary-item">
              <span>🚗 Vehicle:</span> {selectedVehicle?.name}
            </div>
            <div className="order-complete-summary-item">
              <span>📧 Email:</span> {customerDetails.email}
            </div>
          </div>
          
          <p className="order-complete-note">
            A confirmation email has been sent to your email address with all the booking details.
            Our driver will contact you 30 minutes before pickup.
          </p>
        </div>
      </div>
      
      <div className="order-complete-actions">
        <button 
          onClick={handleBackToHome}
          className="order-complete-btn order-complete-btn-home"
        >
          <Home className="order-complete-btn-icon" />
          Back to Home
        </button>
        
        <button className="order-complete-btn order-complete-btn-download">
          <Download className="order-complete-btn-icon" />
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderComplete;