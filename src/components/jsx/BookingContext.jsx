import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: 'oneway',
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
    distance: '',
    duration: ''
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [addOns, setAddOns] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updateSelectedVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const updateAddOns = (addons) => {
    setAddOns(addons);
  };

  const updateCustomerDetails = (details) => {
    setCustomerDetails(prev => ({ ...prev, ...details }));
  };

  const updatePaymentInfo = (info) => {
    setPaymentInfo(prev => ({ ...prev, ...info }));
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.date && formData.time && formData.passengers && 
               formData.luggage && formData.pickup && formData.dropoff &&
               (formData.serviceType !== 'hourly' || formData.hours);
      case 2:
        return selectedVehicle !== null;
      case 3:
        return customerDetails.firstName && customerDetails.lastName && 
               customerDetails.email && customerDetails.phone;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const canAccessStep = (step) => {
    // Can always access step 1
    if (step === 1) return true;
    
    // For other steps, check if all previous steps are completed
    for (let i = 1; i < step; i++) {
      if (!isStepValid(i)) {
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (isStepValid(currentStep)) {
      // Mark current step as completed
      setCompletedSteps(prev => [...prev.filter(s => s !== currentStep), currentStep]);
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    // Only allow navigation to accessible steps
    if (canAccessStep(step)) {
      setCurrentStep(step);
    }
  };

  const resetBooking = () => {
    setCurrentStep(1);
    setFormData({
      serviceType: 'oneway',
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
      distance: '',
      duration: ''
    });
    setSelectedVehicle(null);
    setAddOns([]);
    setCustomerDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setPaymentInfo({});
    setCompletedSteps([]);
  };

  return (
    <BookingContext.Provider value={{
      currentStep,
      formData,
      selectedVehicle,
      addOns,
      customerDetails,
      paymentInfo,
      completedSteps,
      updateFormData,
      updateSelectedVehicle,
      updateAddOns,
      updateCustomerDetails,
      updatePaymentInfo,
      nextStep,
      prevStep,
      goToStep,
      resetBooking,
      isStepValid,
      canAccessStep
    }}>
      {children}
    </BookingContext.Provider>
  );
};