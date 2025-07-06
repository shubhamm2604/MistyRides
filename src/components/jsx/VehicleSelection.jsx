import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useBooking } from './BookingContext';
import '../css/VehicleSelection.css';

const categories = [
  { id: 'sedan', label: 'Sedan', priceFrom: 212 },
  { id: 'suv', label: 'SUV', priceFrom: 287 },
  { id: 'van', label: 'Minivan', priceFrom: 297 },
  { id: 'bus', label: 'Bus', priceFrom: 1240 },
];

const vehicles = [
  { id: 'sedan1', category: 'sedan', name: 'Sedan', price: 212.62, image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Toyota Prius or similar', 'Max 3', 'Max 3'], addOns: [{ id: 'meet', label: 'Add Meet and Greet service', price: 14.18 }, { id: 'child', label: 'Need child seats?', price: 0 }] },
  { id: 'sedan2', category: 'sedan', name: 'Comfort Sedan', price: 223.26, image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Toyota Camry or similar', 'Max 3', 'Max 3'], addOns: [{ id: 'meet', label: 'Add Meet and Greet service', price: 14.18 }, { id: 'child', label: 'Need child seats?', price: 0 }] },
  { id: 'sedan3', category: 'sedan', name: 'Business Sedan', price: 255.15, image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Mercedes E220 or similar', 'Max 3', 'Max 3'], addOns: [{ id: 'meet', label: 'Add Meet and Greet service', price: 14.18 }, { id: 'child', label: 'Need child seats?', price: 0 }] },
  { id: 'sedan4', category: 'sedan', name: 'EV Sedan', price: 318.94, image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Chevy Bolt EUV or similar', 'Max 3', 'Max 3'], addOns: [{ id: 'meet', label: 'Add Meet and Greet service', price: 14.18 }, { id: 'child', label: 'Need child seats?', price: 0 }] },
  { id: 'suv1', category: 'suv', name: 'Standard SUV', price: 287.50, image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Toyota RAV4 or similar', 'Max 6', 'Max 4'], addOns: [{ id: 'meet', label: 'Add Meet and Greet service', price: 14.18 }, { id: 'child', label: 'Need child seats?', price: 0 }] },
  { id: 'suv2', category: 'suv', name: 'Luxury SUV', price: 345.80, image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['BMW X5 or similar', 'Max 6', 'Max 5'], addOns: [{ id: 'meet', label: 'Add Meet and Greet service', price: 14.18 }, { id: 'child', label: 'Need child seats?', price: 0 }] },
  { id: 'van1', category: 'van', name: 'Standard Van', price: 297.00, image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Ford Transit or similar', 'Max 8', 'Max 6'], addOns: [{ id: 'meet', label: 'Add Meet and Greet service', price: 14.18 }, { id: 'child', label: 'Need child seats?', price: 0 }] },
  { id: 'bus1', category: 'bus', name: 'Charter Bus', price: 1240.00, image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Mercedes Sprinter or similar', 'Max 20', 'Max 15'], addOns: [{ id: 'meet', label: 'Add Meet and Greet service', price: 14.18 }] },
];

const VehicleSelection = () => {
  const { selectedVehicle, updateSelectedVehicle, addOns, updateAddOns, nextStep, prevStep, isStepValid } = useBooking();
  const [activeCategory, setActiveCategory] = useState('sedan');
  const [selectedAddOns, setSelectedAddOns] = useState(addOns || []);

  const handleSelectVehicle = (vehicle) => {
    updateSelectedVehicle(vehicle);
    setSelectedAddOns([]);
    updateAddOns([]);
  };

  const handleAddOnChange = (addOn, checked) => {
    let newAddOns = checked
      ? [...selectedAddOns, addOn]
      : selectedAddOns.filter(a => a.id !== addOn.id);
    setSelectedAddOns(newAddOns);
    updateAddOns(newAddOns);
  };

  const getTotalPrice = (vehicle) => {
    if (!vehicle) return 0;
    let total = vehicle.price;
    if (selectedVehicle?.id === vehicle.id) {
      selectedAddOns.forEach(addOn => {
        total += addOn.price;
      });
    }
    return total.toFixed(2);
  };

  const handleNext = () => {
    if (!selectedVehicle) {
      alert('Please select a vehicle to continue.');
      return;
    }
    nextStep();
  };

  return (
    <div className="vehicle-selection-root">
      {/* Category Tabs */}
      <div className="vehicle-selection-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`vehicle-selection-tab${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label} <span className="vehicle-selection-tab-price">From ${cat.priceFrom}</span>
          </button>
        ))}
      </div>

      {/* Vehicle Cards */}
      <div className="vehicle-selection-list">
        {vehicles.filter(v => v.category === activeCategory).map(vehicle => (
          <div key={vehicle.id} className={`vehicle-card${selectedVehicle?.id === vehicle.id ? ' selected' : ''}`}>
            <img src={vehicle.image} alt={vehicle.name} className="vehicle-card-img" />
            <div className="vehicle-card-info">
              <div className="vehicle-card-info-row">
                <div>
                  <h4 className="vehicle-card-title">{vehicle.name}</h4>
                  <div className="vehicle-card-feature">{vehicle.features[0]}</div>
                  <div className="vehicle-card-features">
                    <span>👤 {vehicle.features[1]}</span>
                    <span>🧳 {vehicle.features[2]}</span>
                  </div>
                </div>
                <div className="vehicle-card-price">
                  USD {getTotalPrice(vehicle)}
                  <div className="vehicle-card-price-note">All inclusive</div>
                </div>
              </div>
              
              {/* Add-ons - only show for selected vehicle */}
              {selectedVehicle?.id === vehicle.id && (
                <div className="vehicle-card-addons">
                  {vehicle.addOns.map(addOn => (
                    <label key={addOn.id} className="vehicle-card-addon-label">
                      <input
                        type="checkbox"
                        checked={selectedAddOns.some(a => a.id === addOn.id)}
                        onChange={e => handleAddOnChange(addOn, e.target.checked)}
                        className="vehicle-card-addon-checkbox"
                      />
                      {addOn.label} {addOn.price > 0 && <span className="vehicle-card-addon-price">for USD {addOn.price}</span>}
                    </label>
                  ))}
                </div>
              )}
              
              <button
                className={`vehicle-card-btn${selectedVehicle?.id === vehicle.id ? ' selected' : ''}`}
                onClick={() => handleSelectVehicle(vehicle)}
              >
                {selectedVehicle?.id === vehicle.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="vehicle-selection-footer">
        <button
          type="button"
          onClick={prevStep}
          className="vehicle-card-btn vehicle-card-btn-back"
        >
          <ArrowLeft className="vehicle-card-btn-icon" />
          Back to Ride Details
        </button>

        <button
          className="vehicle-card-btn vehicle-card-btn-next"
          onClick={handleNext}
          disabled={!isStepValid(2)}
        >
          Continue to Customer Details
          <ArrowRight className="vehicle-card-btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default VehicleSelection;