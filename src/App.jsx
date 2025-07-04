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
import PaymentPage from './components/jsx/PaymentPage'
import OrderComplete from './components/jsx/OrderComplete'
import Sidebar from './components/jsx/Sidebar'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';

function App() {
  const location = useLocation();
  const showSidebar = ['/select-vehicle', '/payment', '/complete'].includes(location.pathname);
  let currentStep = 0;
  if (location.pathname === '/select-vehicle') currentStep = 1;
  if (location.pathname === '/payment') currentStep = 2;
  if (location.pathname === '/complete') currentStep = 3;

  return (
    <div className="app-root">
      {/* <BackgroundElements /> */}
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <Services />
            <Features />
            <Fleet />
            <About />
          </>
        } />
        <Route path="/book" element={
          <div className="app-section">
            <div className="app-section-main">
              <BookingForm />
            </div>
          </div>
        } />
        <Route path="/select-vehicle" element={
          <div className="app-section">
            {showSidebar && <Sidebar currentStep={currentStep} />}
            <div className="app-section-main">
              <VehicleSelection />
            </div>
          </div>
        } />
        <Route path="/payment" element={
          <div className="app-section">
            {showSidebar && <Sidebar currentStep={currentStep} />}
            <div className="app-section-main">
              <PaymentPage />
            </div>
          </div>
        } />
        <Route path="/complete" element={
          <div className="app-section">
            {showSidebar && <Sidebar currentStep={currentStep} />}
            <div className="app-section-main">
              <OrderComplete />
            </div>
          </div>
        } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App