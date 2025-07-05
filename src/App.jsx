import React from 'react'
import Header from './components/jsx/Header'
import Hero from './components/jsx/Hero'
import Services from './components/jsx/Services'
import Features from './components/jsx/Features'
import Fleet from './components/jsx/Fleet'
import About from './components/jsx/About'
import Footer from './components/jsx/Footer'
import BookingForm from './components/jsx/BookingForm'
import VehicleSelection from './components/jsx/VehicleSelection'
import CustomerDetails from './components/jsx/CustomerDetails'
import PaymentPage from './components/jsx/PaymentPage'
import OrderComplete from './components/jsx/OrderComplete'
import Sidebar from './components/jsx/Sidebar'
import StepperProgress from './components/jsx/StepperProgress'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useBooking } from './components/jsx/BookingContext'
import { LoadScript } from '@react-google-maps/api'
import { GOOGLE_API_KEY } from './config'
import './App.css';

function App() {
  const location = useLocation();
  const { currentStep, goToStep } = useBooking();
  
  // Check if we're in the booking flow (steps 2-4)
  const isBookingFlow = currentStep >= 2;
  
  // Show sidebar for steps 2-4
  const showSidebar = currentStep >= 2 && currentStep <= 4;

  const renderBookingStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
            <Hero />
          </LoadScript>
        );
      case 2:
        return <VehicleSelection />;
      case 3:
        return <CustomerDetails />;
      case 4:
        return <PaymentPage />;
      case 5:
        return <OrderComplete />;
      default:
        return (
          <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
            <Hero />
          </LoadScript>
        );
    }
  };

  return (
    <div className="app-root">
      <Header />
      
      <Routes>
        <Route path="/" element={
          <>
            {/* Show stepper progress for booking flow */}
            {isBookingFlow && (
              <StepperProgress 
                currentStep={currentStep} 
                onStepClick={goToStep}
              />
            )}
            
            {/* Main content area */}
            <div className={`app-section ${isBookingFlow ? 'booking-flow' : ''}`}>
              {showSidebar && <Sidebar />}
              <div className="app-section-main">
                {renderBookingStep()}
              </div>
            </div>
            
            {/* Show other sections only on step 1 (home page) */}
            {currentStep === 1 && (
              <>
                <Services />
                <Features />
                <Fleet />
                <About />
              </>
            )}
          </>
        } />
        
        <Route path="/book" element={
          <div className="app-section">
            <div className="app-section-main">
              <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
                <BookingForm />
              </LoadScript>
            </div>
          </div>
        } />
      </Routes>
      
      {/* Show footer only on step 1 or standalone pages */}
      {currentStep === 1 && <Footer />}
    </div>
  )
}

export default App