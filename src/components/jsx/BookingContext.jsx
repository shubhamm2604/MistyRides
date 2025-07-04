import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [addOns, setAddOns] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({});

  const updateFormData = (data) => setFormData(data);
  const updateSelectedVehicle = (vehicle) => setSelectedVehicle(vehicle);
  const updateAddOns = (addons) => setAddOns(addons);
  const updatePaymentInfo = (info) => setPaymentInfo(info);
  const resetBooking = () => {
    setFormData({});
    setSelectedVehicle(null);
    setAddOns([]);
    setPaymentInfo({});
  };

  return (
    <BookingContext.Provider value={{
      formData,
      selectedVehicle,
      addOns,
      paymentInfo,
      updateFormData,
      updateSelectedVehicle,
      updateAddOns,
      updatePaymentInfo,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
}; 