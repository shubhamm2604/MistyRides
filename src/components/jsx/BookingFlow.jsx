
import React, { useEffect } from 'react';
import BookingForm from './BookingForm';
import VehicleSelection from './VehicleSelection';
import CustomerDetails from './CustomerDetails';
import PaymentPage from './PaymentPage';
import OrderComplete from './OrderComplete';
import Sidebar from './Sidebar';
import StepperProgress from './StepperProgress';
import { useBooking } from './BookingContext';

const BookingFlow = () => {

  const { currentStep, goToStep,canAccessStep  } = useBooking();
  useEffect(() => {
  const step = window.localStorage.getItem('bookingStep');
  if (step === '2') {
    goToStep(2);
    window.localStorage.removeItem('bookingStep'); // clean up
  }
}, [goToStep]);

if (!canAccessStep(currentStep)) {
  goToStep(1);
}

  // Show sidebar for steps 2-4
  const showSidebar = currentStep >= 2 && currentStep <= 4;
  
  const renderBookingStep = () => {
    switch (currentStep) {
      case 1:
        return <BookingForm />;
      case 2:
        return <VehicleSelection />;
      case 3:
        return <CustomerDetails />;
      case 4:
        return <PaymentPage />;
      case 5:
        return <OrderComplete />;
      default:
        return <BookingForm />;
    }
  };

  return (
    <div className="booking-flow-container">
      {/* Show stepper progress for steps 2-5 */}
      {currentStep >= 2 && (
        <StepperProgress 
          currentStep={currentStep} 
          onStepClick={goToStep}
        />
      )}
      
      {/* Main content area */}
      <div className={`booking-flow-content ${showSidebar ? 'with-sidebar' : 'full-width'}`}>
        {showSidebar && <Sidebar />}
        <div className="booking-flow-main">
          {renderBookingStep()}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;