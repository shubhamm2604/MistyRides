import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { useBooking } from './BookingContext';
import '../css/PaymentPage.css';

const PaymentPage = () => {
  const { formData, selectedVehicle, addOns, customerDetails, resetBooking, prevStep, nextStep } = useBooking();
  const [loading, setLoading] = useState(false);

  const getTotalPrice = () => {
    if (!selectedVehicle) return 0;
    let total = selectedVehicle.price;
    addOns.forEach(addOn => {
      total += addOn.price;
    });
    return total.toFixed(2);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nextStep(); // Go to completion step
    }, 2000);
  };

  return (
    <div className="payment-page-root">
      <div className="payment-page-header">
        <h2 className="payment-page-title">
          <Lock className="payment-page-title-icon" />
          Secure Payment
        </h2>
        <p className="payment-page-desc">Review your booking details and complete your payment</p>
      </div>

      <div className="payment-page-summary">
        <h3 className="payment-page-summary-title">Booking Summary</h3>
        
        <div className="payment-page-info-section">
          <h4 className="payment-page-section-title">Trip Details</h4>
          <div className="payment-page-info-row">
            <span role="img" aria-label="calendar">📅</span> {formData.date || '--'}
            <span role="img" aria-label="clock">⏰</span> {formData.time || '--'}
          </div>
          <div className="payment-page-info-row">
            <span role="img" aria-label="pickup">📍</span> {formData.pickup || '--'}
          </div>
          <div className="payment-page-info-row">
            <span role="img" aria-label="dropoff">🏁</span> {formData.dropoff || '--'}
          </div>
          {formData.distance && (
            <div className="payment-page-info-row">
              <span role="img" aria-label="distance">🛣️</span> {formData.distance} | <span role="img" aria-label="duration">⏱️</span> {formData.duration}
            </div>
          )}
          <div className="payment-page-info-row">
            <span role="img" aria-label="user">👤</span> {formData.passengers || '--'} passengers
            <span role="img" aria-label="bag">🧳</span> {formData.luggage || '--'} bags
          </div>
        </div>

        <div className="payment-page-divider"></div>

        <div className="payment-page-info-section">
          <h4 className="payment-page-section-title">Customer Information</h4>
          <div className="payment-page-customer-info">
            <div className="payment-page-customer-name">
              {customerDetails.firstName} {customerDetails.lastName}
            </div>
            <div className="payment-page-customer-contact">
              {customerDetails.email} • {customerDetails.phone}
            </div>
            {customerDetails.specialRequests && (
              <div className="payment-page-special-requests">
                <strong>Special Requests:</strong> {customerDetails.specialRequests}
              </div>
            )}
          </div>
        </div>

        <div className="payment-page-divider"></div>

        <div className="payment-page-info-section">
          <h4 className="payment-page-section-title">Vehicle & Add-ons</h4>
          <div className="payment-page-vehicle-row">
            <img src={selectedVehicle?.image} alt={selectedVehicle?.name} className="payment-page-vehicle-img" />
            <div>
              <div className="payment-page-vehicle-name">{selectedVehicle?.name}</div>
              <div className="payment-page-vehicle-feature">{selectedVehicle?.features?.[0]}</div>
              <div className="payment-page-vehicle-price">USD {selectedVehicle?.price}</div>
            </div>
          </div>
          <div className="payment-page-addons-row">
            <strong>Add-ons:</strong> {addOns.length > 0 ? addOns.map(a => `${a.label} (+$${a.price})`).join(', ') : 'None'}
          </div>
        </div>

        <div className="payment-page-total-row">
          <span className="payment-page-total-label">Total Amount: USD {getTotalPrice()}</span>
        </div>
      </div>

      <div className="payment-page-actions">
        <button
          type="button"
          onClick={prevStep}
          className="payment-page-btn payment-page-btn-back"
        >
          <ArrowLeft className="payment-page-btn-icon" />
          Back to Customer Details
        </button>

        <button
          className="payment-page-btn payment-page-btn-pay"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <span className="payment-page-btn-loading">
              <svg className="payment-page-btn-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Processing Payment...
            </span>
          ) : (
            <>
              <CreditCard className="payment-page-btn-icon" />
              Pay & Complete Booking
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;