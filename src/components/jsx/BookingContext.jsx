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

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
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

  return (
    <BookingContext.Provider value={{
      currentStep,
      formData,
      selectedVehicle,
      addOns,
      customerDetails,
      paymentInfo,
      updateFormData,
      updateSelectedVehicle,
      updateAddOns,
      updateCustomerDetails,
      updatePaymentInfo,
      nextStep,
      prevStep,
      goToStep,
      resetBooking,
      isStepValid
    }}>
      {children}
    </BookingContext.Provider>
  );
};