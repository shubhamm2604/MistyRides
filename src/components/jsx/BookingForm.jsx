import React, { useState, useEffect } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import '../css/BookingForm.css'
import {
  Calendar, Users, Luggage, MapPin, Clock, ArrowUpDown,
  Car, Timer, RefreshCw, Clock10
} from 'lucide-react'
import { GOOGLE_API_KEY } from '../../config'
import { useNavigate } from 'react-router-dom';
import { useBooking } from './BookingContext';

const BookingForm = () => {
  const { formData: contextFormData, updateFormData } = useBooking();
  const [serviceType, setServiceType] = useState(contextFormData.serviceType || 'oneway')
  const [formData, setFormData] = useState({
    date: contextFormData.date || '',
    time: contextFormData.time || '',
    passengers: contextFormData.passengers || '',
    luggage: contextFormData.luggage || '',
    pickup: contextFormData.pickup || '',
    dropoff: contextFormData.dropoff || '',
    hours: contextFormData.hours || '',
    pickupLat: contextFormData.pickupLat || null,
    pickupLng: contextFormData.pickupLng || null,
    dropoffLat: contextFormData.dropoffLat || null,
    dropoffLng: contextFormData.dropoffLng || null,
  });
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null)
  const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null)
  const [distanceInfo, setDistanceInfo] = useState(contextFormData.distance ? { distance: contextFormData.distance, duration: contextFormData.duration } : null)
  const [isLoading, setIsLoading] = useState(false)
  const [pickupPlaceSelected, setPickupPlaceSelected] = useState(!!contextFormData.pickup);
  const [dropoffPlaceSelected, setDropoffPlaceSelected] = useState(!!contextFormData.dropoff);
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (!contextFormData.date) {
      const today = new Date().toISOString().split('T')[0]
      setFormData(prev => ({ ...prev, date: today }))
    }
  }, [contextFormData.date])

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      serviceType,
      date: '',
      time: '',
      passengers: '',
      luggage: '',
      pickup: '',
      dropoff: '',
      hours: '',
      pickupLat: null,
      pickupLng: null,
      dropoffLat: null,
      dropoffLng: null,
    }))
    setDistanceInfo(null)
    setPickupPlaceSelected(false);
    setDropoffPlaceSelected(false);
  }, [serviceType])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const swapLocations = () => {
    setFormData(prev => ({
      ...prev,
      pickup: prev.dropoff,
      dropoff: prev.pickup,
      pickupLat: prev.dropoffLat,
      pickupLng: prev.dropoffLng,
      dropoffLat: prev.pickupLat,
      dropoffLng: prev.pickupLng,
    }))
  }

  const validateForm = () => {
    // Basic validation for required fields
    return (
      formData.date &&
      formData.time &&
      formData.passengers &&
      formData.luggage &&
      formData.pickup &&
      formData.dropoff &&
      (serviceType !== 'hourly' || formData.hours)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill all required fields.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      updateFormData({ ...formData, serviceType, ...(distanceInfo || {}) });
      navigate('/select-vehicle');
    }, 1000);
  }

  // 🧠 Calculate distance and time

  useEffect(() => {
    const fetchDistance = async () => {
      if (!formData.pickup || !formData.dropoff) return

      try {
        const response = await fetch(
          'https://routes.googleapis.com/directions/v2:computeRoutes',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': GOOGLE_API_KEY,
              'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters'
            },
            body: JSON.stringify({
              origin: {
                address: formData.pickup
              },
              destination: {
                address: formData.dropoff
              },
              travelMode: 'DRIVE'
            })
          }
        )

        const data = await response.json()

        if (data.routes && data.routes[0]) {
          const distanceInKm = (data.routes[0].distanceMeters / 1000).toFixed(1)
          const durationInMinutes = Math.ceil(parseInt(data.routes[0].duration.replace('s', '')) / 60)

          setDistanceInfo({
            distance: `${distanceInKm} km`,
            duration: `${durationInMinutes} mins`
          })
        } else {
          console.warn('No route found', data)
          setDistanceInfo(null)
        }
      } catch (err) {
        console.error('Error fetching route info:', err)
        setDistanceInfo(null)
      }
    };

    fetchDistance()
  }, [formData.pickup, formData.dropoff])

  const serviceTypes = [
    { id: 'oneway', label: 'One Way', icon: Car },
    { id: 'roundtrip', label: 'Round Trip', icon: RefreshCw },
    { id: 'hourly', label: 'Hourly', icon: Clock10 },
    { id: 'multiday', label: 'Multi-Day', icon: Calendar }
  ]

  const getButtonText = () => {
    switch (serviceType) {
      default: return 'Choose Vehicle'
    }
  }
  const onPickupPlaceChanged = () => {
    if (pickupAutocomplete !== null) {
      const place = pickupAutocomplete.geatPlace();
      if (place.geometry && place.geometry.location) {
        setFormData(prev => ({
          ...prev,
          pickup: place.formatted_address,
          pickupLat: place.geometry.location.lat(), // Add this line
          pickupLng: place.geometry.location.lng(), // Add this line
        }));
        setPickupPlaceSelected(true);
      } else {
        // Handle cases where no geometry or location is available
        setFormData(prev => ({
          ...prev,
          pickup: place.name || '',
          pickupLat: null, // Add this line
          pickupLng: null, // Add this line
        }));
        setPickupPlaceSelected(false);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };
  const onDropoffPlaceChanged = () => {
    if (dropoffAutocomplete !== null) {
      const place = dropoffAutocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setFormData(prev => ({
          ...prev,
          dropoff: place.formatted_address,
          dropoffLat: place.geometry.location.lat(), // Add this line
          dropoffLng: place.geometry.location.lng(), // Add this line
        }));
        setDropoffPlaceSelected(true);
      } else {
        // Handle cases where no geometry or location is available
        setFormData(prev => ({
          ...prev,
          dropoff: place.name || '',
          dropoffLat: null, // Add this line
          dropoffLng: null, // Add this line
        }));
        setDropoffPlaceSelected(false);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div className="bookingform-outer">
      <div className="bookingform-container">
        <div className="bookingform-header">
          <h2 className="bookingform-title">Book Your Premium Ride</h2>
          <p className="bookingform-desc">Experience comfort and reliability with our premium transportation service</p>
        </div>

        {/* Service Type Switcher */}
        <div className="bookingform-switcher-wrap">
          <div className="bookingform-switcher">
            {serviceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setServiceType(type.id)}
                className={`bookingform-switch-btn${serviceType === type.id ? ' active' : ''}`}
              >
                <type.icon className="bookingform-switch-icon" />
                <span className="bookingform-switch-label">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bookingform-success">
            ✅ Your booking request has been submitted successfully!
          </div>
        )}

        {/* Form Start */}
        <form onSubmit={handleSubmit} className="bookingform-form">
          {/* Date, Passengers, Luggage */}
          <div className="bookingform-row">
            {/* Date */}
            <div className="bookingform-field">
              <label className="bookingform-label">
                <Calendar className="bookingform-label-icon" /><span>Date *</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="bookingform-input"
                required
              />
            </div>

            {/* Passengers */}
            <div className="bookingform-field">
              <label className="bookingform-label">
                <Users className="bookingform-label-icon" /><span>Passengers *</span>
              </label>
              <select
                value={formData.passengers}
                onChange={(e) => handleInputChange('passengers', e.target.value)}
                className="bookingform-input"
                required
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
                <option value="9+">9+ Passengers</option>
              </select>
            </div>

            {/* Luggage */}
            <div className="bookingform-field">
              <label className="bookingform-label">
                <Luggage className="bookingform-label-icon" /><span>Luggage *</span>
              </label>
              <select
                value={formData.luggage}
                onChange={(e) => handleInputChange('luggage', e.target.value)}
                className="bookingform-input"
                required
              >
                <option value="">Select</option>
                {[0, 1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n === 0 ? 'No Luggage' : `${n} ${n === 1 ? 'Bag' : 'Bags'}`}</option>
                ))}
                <option value="6+">6+ Bags</option>
              </select>
            </div>
          </div>

          {/* Pickup / Dropoff Fields */}
          <div className="bookingform-row">
            <div className="bookingform-field">
              <label className="bookingform-label">
                <MapPin className="bookingform-label-icon" /><span>Pick Up Location *</span>
              </label>
              <Autocomplete
                onLoad={(autoC) => setPickupAutocomplete(autoC)}
                onPlaceChanged={() => {
                  if (!pickupAutocomplete) return;
                  const place = pickupAutocomplete.getPlace();
                  const lat = place?.geometry?.location?.lat();
                  const lng = place?.geometry?.location?.lng();
                  const address = place?.formatted_address || place?.name || '';
                  setFormData((prev) => ({
                    ...prev,
                    pickup: address,
                    pickupLat: lat ?? null,
                    pickupLng: lng ?? null,
                  }));
                  setPickupPlaceSelected(true);
                }}
              >
                <input
                  type="text"
                  value={formData.pickup}
                  onChange={(e) => {
                    handleInputChange('pickup', e.target.value);
                    setPickupPlaceSelected(false);
                  }}
                  className="bookingform-input"
                  placeholder="Pickup Location"
                  required
                />
              </Autocomplete>
            </div>
            <div className="bookingform-swap-btn-wrap">
              <button
                type="button"
                onClick={swapLocations}
                className="bookingform-swap-btn"
                title="Swap locations"
              >
                <ArrowUpDown className="bookingform-swap-icon" />
              </button>
            </div>
            <div className="bookingform-field">
              <label className="bookingform-label">
                <MapPin className="bookingform-label-icon" /><span>Drop Off Location *</span>
              </label>
              <Autocomplete
                onLoad={(autoC) => setDropoffAutocomplete(autoC)}
                onPlaceChanged={() => {
                  if (!dropoffAutocomplete) return;
                  const place = dropoffAutocomplete.getPlace();
                  const lat = place?.geometry?.location?.lat();
                  const lng = place?.geometry?.location?.lng();
                  const address = place?.formatted_address || place?.name || '';
                  setFormData((prev) => ({
                    ...prev,
                    dropoff: address,
                    dropoffLat: lat ?? null,
                    dropoffLng: lng ?? null,
                  }));
                  setDropoffPlaceSelected(true);
                }}
              >
                <input
                  type="text"
                  value={formData.dropoff}
                  onChange={(e) => {
                    handleInputChange('dropoff', e.target.value);
                    setDropoffPlaceSelected(false);
                  }}
                  className="bookingform-input"
                  placeholder="Dropoff Location"
                  required
                />
              </Autocomplete>
            </div>
          </div>

          {/* Time and Hours (conditional) */}
          <div className="bookingform-row">
            <div className="bookingform-field bookingform-field-time">
              <label className="bookingform-label">
                <Clock className="bookingform-label-icon" /><span>Time *</span>
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="bookingform-input"
                required
              />
            </div>
            {serviceType === 'hourly' && (
              <div className="bookingform-field bookingform-field-hours">
                <label className="bookingform-label">
                  <Timer className="bookingform-label-icon" /><span>Hours *</span>
                </label>
                <input
                  type="number"
                  value={formData.hours}
                  onChange={(e) => handleInputChange('hours', e.target.value)}
                  placeholder="e.g., 3"
                  className="bookingform-input"
                  required={serviceType === 'hourly'}
                />
              </div>
            )}
          </div>

          {/* Distance Display */}
          {distanceInfo && pickupPlaceSelected && dropoffPlaceSelected && (
            <div className="bookingform-info">
              📍 Estimated Distance: <strong>{distanceInfo.distance}</strong> — Time: <strong>{distanceInfo.duration}</strong>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="bookingform-submit-btn"
          >
            {isLoading ? 'Processing...' : getButtonText()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingForm
