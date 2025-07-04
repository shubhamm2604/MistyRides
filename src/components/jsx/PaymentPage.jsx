import React, { useState } from 'react';
import { useBooking } from './BookingContext';
import { useNavigate } from 'react-router-dom';

import '../css/PaymentPage.css';

const PaymentPage = () => {
  const { formData, selectedVehicle, addOns, resetBooking } = useBooking();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      resetBooking();
      navigate('/complete');
    }, 2000);
  };

  return (
    <div className="payment-page-root">
      <h2 className="payment-page-title">Booking Summary</h2>
      <div className="payment-page-summary">
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
          <span role="img" aria-label="user">👤</span> {formData.passengers || '--'}
          <span role="img" aria-label="bag">🧳</span> {formData.luggage || '--'}
        </div>
        <div className="payment-page-divider"></div>
        <div className="payment-page-vehicle-row">
          <img src={selectedVehicle?.image} alt={selectedVehicle?.name} className="payment-page-vehicle-img" />
          <div>
            <div className="payment-page-vehicle-name">{selectedVehicle?.name}</div>
            <div className="payment-page-vehicle-feature">{selectedVehicle?.features?.[0]}</div>
          </div>
        </div>
        <div className="payment-page-addons-row">
          <b>Add-ons:</b> {addOns.length > 0 ? addOns.map(a => a.label).join(', ') : 'None'}
        </div>
        <div className="payment-page-total-row">
          <span className="payment-page-total-label">Total: USD {getTotalPrice()}</span>
        </div>
      </div>
      <button
        className="payment-page-btn"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <span className="payment-page-btn-loading"><svg className="payment-page-btn-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Processing Payment...</span>
        ) : (
          'Pay & Complete Booking'
        )}
      </button>
    </div>
  );
};

export default PaymentPage;
