import React from 'react'
import BookingForm from './BookingForm'
import { Star, Shield, Clock, Users } from 'lucide-react'
import { LoadScript } from '@react-google-maps/api'
import { GOOGLE_API_KEY } from '../../config';
import '../css/Hero.css' 

const Hero = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Shield, value: '100%', label: 'Safe & Secure' },
    { icon: Clock, value: '24/7', label: 'Available' }
  ]
  

  return (
    <section id="home" className="hero-section-bg">
      {/* Hero Content */}
      <div className="hero-section-wide hero-content-wrapper">
        <div className="hero-grid">
          {/* Left Content */}
          <div className="hero-left animate-slide-up z-10">
            <div className="hero-left-inner">
              <div className="hero-badge">
                <Star className="hero-badge-icon" />
                Premium Transportation Service
              </div>

              <h1 className="hero-title">
                Your Journey,
                <span className="hero-title-gradient">
                  {" "}Our Priority
                </span>
              </h1>

              <p className="hero-subtitle">
                Experience premium airport transfers, city rides, and luxury transportation
                with MistyRide. Professional drivers, luxury vehicles, and unmatched service quality.
              </p>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="hero-stat-box">
                  <div className="hero-stat-icon">
                    <stat.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Booking Form */}
          <div className="hero-right">
            <div className="booking-form-outer">
              <LoadScript
                googleMapsApiKey={GOOGLE_API_KEY}
                libraries={['places']}
              >
                <div className="booking-form-wrapper">
                  <BookingForm />
                </div>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero