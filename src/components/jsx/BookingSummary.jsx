import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

import '../css/BookingSummary.css';

const steps = [
  'Ride Info',
  'Select Vehicle',
  'Confirm',
  'Payment',
  'Done',
];

const vehicles = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'suv',
    name: 'Luxury SUV',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'van',
    name: 'Premium Van',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'limo',
    name: 'Luxury Limousine',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const BookingSummary = ({ rideInfo, currentStep = 2 }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!rideInfo) {
      navigate('/book');
    }
  }, [rideInfo, navigate]);

  return (
    <div className="booking-summary-root">
      <div className="booking-summary-main">
        {/* Progress Bar */}
        <div className="booking-summary-progress">
          {steps.map((step, idx) => (
            <div key={step} className="booking-summary-progress-step">
              <div className={`booking-summary-progress-circle ${idx <= currentStep ? 'active' : ''}`}>{idx + 1}</div>
              {idx < steps.length - 1 && (
                <div className={`booking-summary-progress-bar ${idx < currentStep ? 'active' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="booking-summary-content">
          {/* Left: Ride Info */}
          <div className="booking-summary-rideinfo">
            <h2 className="booking-summary-rideinfo-title">Your Ride Info</h2>
            <ul className="booking-summary-rideinfo-list">
              {rideInfo && Object.entries(rideInfo).map(([key, value]) => (
                <li key={key} className="booking-summary-rideinfo-item"><span className="booking-summary-rideinfo-label">{key}:</span> {value}</li>
              ))}
            </ul>
            <button
              className="booking-summary-modify-btn"
              onClick={() => navigate('/book', { state: { rideInfo } })}
            >
              Modify
            </button>
          </div>
          {/* Right: Vehicle Selection */}
          <div className="booking-summary-vehicles">
            <h2 className="booking-summary-vehicles-title">Select Vehicle Type</h2>
            <div className="booking-summary-vehicles-list">
              {vehicles.map(vehicle => (
                <div
                  key={vehicle.id}
                  className={`booking-summary-vehicle-card${selectedVehicle === vehicle.id ? ' selected' : ''}`}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <img src={vehicle.image} alt={vehicle.name} className="booking-summary-vehicle-img" />
                  <span className="booking-summary-vehicle-name">{vehicle.name}</span>
                  {selectedVehicle === vehicle.id && <span className="booking-summary-vehicle-selected">Selected</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
