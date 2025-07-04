import React from 'react'
import { Shield, Clock, Star, Users, Smartphone, CreditCard, MapPin, Headphones } from 'lucide-react'
import '../css/Features.css'

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All drivers are background checked, licensed, and insured for your safety.',
      color: 'green-to-emerald'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock service with real-time tracking and instant confirmations.',
      color: 'blue-to-cyan'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Luxury vehicles maintained to the highest standards with professional service.',
      color: 'yellow-to-orange'
    },
    {
      icon: Users,
      title: 'Professional Drivers',
      description: 'Experienced, courteous drivers who know the city and prioritize your comfort.',
      color: 'purple-to-pink'
    },
    {
      icon: Smartphone,
      title: 'Easy Booking',
      description: 'Simple online booking system with instant confirmation and flexible scheduling.',
      color: 'indigo-to-blue'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'Multiple payment options including credit cards, digital wallets, and corporate billing.',
      color: 'red-to-pink'
    },
    {
      icon: MapPin,
      title: 'GPS Tracking',
      description: 'Real-time vehicle tracking so you always know when your ride will arrive.',
      color: 'teal-to-green'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer support team available around the clock for assistance.',
      color: 'orange-to-red'
    }
  ]

  return (
    <section id='features' className="features-section">
      <div className="features-container">
        <div className="features-header">
          <div className="features-badge">
            <Shield className="icon-small" />
            Why Choose MistyRide
          </div>
          <h2 className="features-title">
            Premium Features
            <span className="features-gradient-text">That Set Us Apart</span>
          </h2>
          <p className="features-subtitle">
            Experience the difference with our commitment to excellence, safety, and customer satisfaction.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className={`feature-icon ${feature.color}`}>
                <feature.icon className="icon" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="features-stats">
          <div className="stat-item">
            <div className="stat-value">50K+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4.9★</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">100K+</div>
            <div className="stat-label">Rides Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
