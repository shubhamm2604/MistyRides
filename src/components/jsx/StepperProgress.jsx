import React from 'react';
import { Check } from 'lucide-react';
import { useBooking } from './BookingContext';
import '../css/StepperProgress.css';

const StepperProgress = ({ currentStep, onStepClick }) => {
  const { canAccessStep, isStepValid } = useBooking();
  
  const steps = [
    { id: 1, title: 'Ride Details', description: 'Enter your trip information' },
    { id: 2, title: 'Select Vehicle', description: 'Choose your preferred vehicle' },
    { id: 3, title: 'Customer Details', description: 'Provide your information' },
    { id: 4, title: 'Payment', description: 'Complete your booking' }
  ];

  const getStepStatus = (step) => {
    if (currentStep > step.id) return 'completed';
    if (currentStep === step.id) return 'active';
    return 'pending';
  };

  const handleStepClick = (step) => {
    // Only allow clicking on accessible steps
    if (canAccessStep(step.id) && onStepClick) {
      onStepClick(step.id);
    }
  };

  return (
    <div className="stepper-progress">
      <div className="stepper-container">
        {steps.map((step, index) => {
          const status = getStepStatus(step);
          const isAccessible = canAccessStep(step.id);
          
          return (
            <div key={step.id} className="stepper-step-wrapper">
              <div 
                className={`stepper-step ${status} ${!isAccessible ? 'disabled' : ''}`}
                onClick={() => handleStepClick(step)}
                style={{ 
                  cursor: isAccessible ? 'pointer' : 'not-allowed',
                  opacity: isAccessible ? 1 : 0.5 
                }}
              >
                <div className="stepper-circle">
                  {status === 'completed' ? (
                    <Check className="stepper-check-icon" />
                  ) : (
                    <span className="stepper-number">{step.id}</span>
                  )}
                </div>
                <div className="stepper-content">
                  <div className="stepper-title">{step.title}</div>
                  <div className="stepper-description">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`stepper-line ${status === 'completed' ? 'completed' : ''}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperProgress;