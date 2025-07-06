import React from 'react'
import Header from './components/jsx/Header'
import Hero from './components/jsx/Hero'
import Services from './components/jsx/Services'
import Features from './components/jsx/Features'
import Fleet from './components/jsx/Fleet'
import About from './components/jsx/About'
import Footer from './components/jsx/Footer'
import BookingFlow from './components/jsx/BookingFlow.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useBooking } from './components/jsx/BookingContext'
import { LoadScript } from '@react-google-maps/api'
import { GOOGLE_API_KEY } from './config'
import './App.css';

function App() {
  const location = useLocation();
  const { resetBooking } = useBooking();
  
  // Reset booking when going back to home
  React.useEffect(() => {
    if (location.pathname === '/') {
      resetBooking();
    }
  }, [location.pathname, resetBooking]);

  return (
    <div className="app-root">
      <Header />
      
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <Hero />
            </>
          } />
          
          {/* Services Page */}
          <Route path="/services" element={
            <div className="page-container">
              <Services />
              <Features />
            </div>
          } />
          
          {/* Features Page */}
          <Route path="/features" element={
            <div className="page-container">
              <Features />
            </div>
          } />
          
          {/* Fleet Page */}
          <Route path="/fleet" element={
            <div className="page-container">
              <Fleet />
            </div>
          } />
          
          {/* About Page */}
          <Route path="/about" element={
            <div className="page-container">
              <About />
            </div>
          } />
          
          {/* Contact Page */}
          <Route path="/contact" element={
            <div className="page-container">
              <div style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <h1>Contact Us</h1>
                <p>Get in touch with our team for any inquiries.</p>
                <div style={{ marginTop: '2rem' }}>
                  <p><strong>Email:</strong> info@mistyride.com</p>
                  <p><strong>Address:</strong> N-19 SINGAPUR GREEN VIEW, TALAWALI CHANDA, Manglia, Indore- 453771, Madhya Pradesh</p>
                </div>
              </div>
            </div>
          } />
          
          {/* Booking Flow */}
          <Route path="/book" element={<BookingFlow />} />
        </Routes>
      </LoadScript>
      
      <Footer />
    </div>
  )
}

export default App