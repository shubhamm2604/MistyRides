import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { useBooking } from './BookingContext';
import '../css/CustomerDetails.css';

const CustomerDetails = () => {
  const { customerDetails, updateCustomerDetails, nextStep, prevStep } = useBooking();
  const [formData, setFormData] = useState({
    firstName: customerDetails.firstName || '',
    lastName: customerDetails.lastName || '',
    email: customerDetails.email || '',
    phone: customerDetails.phone || '',
    specialRequests: customerDetails.specialRequests || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill all required fields.');
      return;
    }

    setIsLoading(true);
    updateCustomerDetails(formData);
    
    setTimeout(() => {
      setIsLoading(false);
      nextStep();
    }, 1000);
  };

  return (
    <div className="customer-details-root">
      <div className="customer-details-header">
        <h2 className="customer-details-title">Customer Details</h2>
        <p className="customer-details-desc">Please provide your contact information to complete the booking</p>
      </div>

      <form onSubmit={handleSubmit} className="customer-details-form">
        <div className="customer-details-row">
          <div className="customer-details-field">
            <label className="customer-details-label">
              <User className="customer-details-label-icon" />
              <span>First Name *</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="customer-details-input"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="customer-details-field">
            <label className="customer-details-label">
              <User className="customer-details-label-icon" />
              <span>Last Name *</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="customer-details-input"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="customer-details-row">
          <div className="customer-details-field">
            <label className="customer-details-label">
              <Mail className="customer-details-label-icon" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="customer-details-input"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="customer-details-field">
            <label className="customer-details-label">
              <Phone className="customer-details-label-icon" />
              <span>Phone Number *</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="customer-details-input"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div className="customer-details-field">
          <label className="customer-details-label">
            <MessageSquare className="customer-details-label-icon" />
            <span>Special Requests (Optional)</span>
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            className="customer-details-textarea"
            placeholder="Any special requests or requirements..."
            rows="4"
          />
        </div>

        <div className="customer-details-actions">
          <button
            type="button"
            onClick={prevStep}
            className="customer-details-btn customer-details-btn-back"
          >
            <ArrowLeft className="customer-details-btn-icon" />
            Back to Vehicle Selection
          </button>

          <button
            type="submit"
            disabled={isLoading || !validateForm()}
            className="customer-details-btn customer-details-btn-next"
          >
            {isLoading ? 'Processing...' : (
              <>
                Continue to Payment
                <ArrowRight className="customer-details-btn-icon" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerDetails;