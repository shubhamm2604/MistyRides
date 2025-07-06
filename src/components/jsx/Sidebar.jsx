import React from 'react';
import { Edit3 } from 'lucide-react';
import { useBooking } from './BookingContext';
import '../css/Sidebar.css';

const includedServices = [
  'Flight & Ride Tracking',
  '24/7 Customer Call Center',
  'Multi-lingual Driver',
  'Full refund if cancelled 24 hours before the service',
  'Free 60 minutes waiting time for airport pickups, 15 minutes for all others',
];

const Sidebar = () => {
  const { formData, goToStep } = useBooking();

  const handleModify = () => {
    goToStep(1); // Go back to booking form
  };

  return (
    <aside className="sidebar-root">
      {/* Ride Info */}
      <div className="sidebar-rideinfo">
        <h3 className="sidebar-rideinfo-title">Ride Info</h3>
        <div className="sidebar-rideinfo-mapbox">
          <img 
            src="https://maps.googleapis.com/maps/api/staticmap?center=London&zoom=10&size=350x120&maptype=roadmap&markers=color:red%7CLondon&key=dummy" 
            alt="Map preview" 
            className="sidebar-rideinfo-map" 
          />
        </div>
        <div className="sidebar-rideinfo-details">
          <div className="sidebar-rideinfo-row">
            <span role="img" aria-label="calendar">📅</span> {formData.date || '--'}
            <span role="img" aria-label="clock">⏰</span> {formData.time || '--'}
          </div>
          <div className="sidebar-rideinfo-row">
            <span role="img" aria-label="user">👤</span> {formData.passengers || '--'} passengers
            <span role="img" aria-label="bag">🧳</span> {formData.luggage || '--'} bags
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
      <button
        className="sidebar-modify-btn"
        onClick={handleModify}
      >
        <Edit3 className="sidebar-modify-icon" />
        Modify Details
      </button>
    </aside>
  );
};

export default Sidebar;