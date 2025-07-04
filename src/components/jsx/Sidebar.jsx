import React from 'react';

import { useBooking } from './BookingContext'    
import { useLocation, useNavigate } from 'react-router-dom';

import '../css/Sidebar.css'; 

const steps = [
  'Ride info',
  'Choose a vehicle',
  'Payment',
];

const includedServices = [
  'Flight & Ride Tracking',
  '24/7 Customer Call Center',
  'Multi-lingual Driver',
  'Full refund if cancelled 24 hours before the service',
  'Free 60 minutes waiting time for airport pickups, 15 minutes for all others',
];

const Sidebar = ({ currentStep }) => {
  const { formData } = useBooking();
  const location = useLocation();
  const navigate = useNavigate();
  const showModify = location.pathname !== '/book';

  return (
    <aside className="sidebar-root">
      {/* Progress Indicator */}
      <div className="sidebar-progress">
        {steps.map((step, idx) => (
          <div key={step} className="sidebar-progress-step">
            <div className={`sidebar-progress-circle ${idx === currentStep ? 'active' : idx < currentStep ? 'done' : ''}`}>{idx + 1}</div>
            {idx < steps.length - 1 && (
              <div className={`sidebar-progress-bar ${idx < currentStep ? 'done' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
      {/* Ride Info */}
      <div className="sidebar-rideinfo">
        <h3 className="sidebar-rideinfo-title">Ride Info</h3>
        <div className="sidebar-rideinfo-mapbox">
          <img src="https://maps.googleapis.com/maps/api/staticmap?center=London&zoom=10&size=350x120&maptype=roadmap&markers=color:red%7CLondon&key=dummy" alt="Map preview" className="sidebar-rideinfo-map" />
        </div>
        <div className="sidebar-rideinfo-details">
          <div className="sidebar-rideinfo-row">
            <span role="img" aria-label="calendar">📅</span> {formData.date || '--'}
            <span role="img" aria-label="clock">⏰</span> {formData.time || '--'}
            <span role="img" aria-label="user">👤</span> {formData.passengers || '--'}
            <span role="img" aria-label="bag">🧳</span> {formData.luggage || '--'}
          </div>
          <div className="sidebar-rideinfo-row">
            <span role="img" aria-label="pickup">📍</span> {formData.pickup || '--'}
          </div>
          <div className="sidebar-rideinfo-row">
            <span role="img" aria-label="dropoff">🏁</span> {formData.dropoff || '--'}
          </div>
          {formData.distance && (
            <div className="sidebar-rideinfo-row">
              <span role="img" aria-label="distance">🛣️</span> {formData.distance} | <span role="img" aria-label="duration">⏱️</span> {formData.duration}
            </div>
          )}
        </div>
      </div>
      {/* Included Services */}
      <div className="sidebar-included">
        <h4 className="sidebar-included-title">All our vehicles include:</h4>
        <ul className="sidebar-included-list">
          {includedServices.map((service, i) => (
            <li key={i} className="sidebar-included-item">
              <span className="sidebar-included-plus">+</span> {service}
            </li>
          ))}
        </ul>
      </div>
      {/* Modify Button */}
      {showModify && (
        <button
          className="sidebar-modify-btn"
          onClick={() => navigate('/book')}
        >
          Modify
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
