import React from 'react';
import { Check } from 'lucide-react';
import '../css/StepperProgress.css';

const StepperProgress = ({ currentStep, onStepClick }) => {
  const steps = [
    { id: 1, title: 'Ride Details', description: 'Enter your trip information' },
    { id: 2, title: 'Select Vehicle', description: 'Choose your preferred vehicle' },
    { id: 3, title: 'Customer Details', description: 'Provide your information' },
    { id: 4, title: 'Payment', description: 'Complete your booking' }
  ];

  return (
    <div className="stepper-progress">
      <div className="stepper-container">
        {steps.map((step, index) => (
          <div key={step.id} className="stepper-step-wrapper">
            <div 
              className={`stepper-step ${currentStep === step.id ? 'active' : currentStep > step.id ? 'completed' : 'pending'}`}
              onClick={() => onStepClick && onStepClick(step.id)}
            >
              <div className="stepper-circle">
                {currentStep > step.id ? (
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
              <div className={`stepper-line ${currentStep > step.id ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepperProgress;