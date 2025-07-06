import React from 'react';
import { Plane, Building2, MapPin, Clock, Star } from 'lucide-react';
import '../css/Services.css';

const Services = () => {
  const services = [
    {
      icon: Plane,
      title: 'Airport Transfers',
      description: 'Reliable airport pickup and drop-off services with flight tracking and meet & greet options.',
      features: ['Flight Tracking', 'Meet & Greet', 'Luggage Assistance', '24/7 Available'],
      price: 'From $45',
      popular: true
    },
    {
      icon: Building2,
      title: 'Corporate Travel',
      description: 'Professional transportation for business meetings, conferences, and corporate events.',
      features: ['Executive Vehicles', 'Professional Drivers', 'Flexible Scheduling', 'Invoice Billing'],
      price: 'From $60',
      popular: false
    },
    {
      icon: MapPin,
      title: 'City Tours',
      description: 'Explore the city in comfort with our guided tours and sightseeing packages.',
      features: ['Local Guides', 'Flexible Routes', 'Photo Stops', 'Group Discounts'],
      price: 'From $80',
      popular: false
    },
    {
      icon: Clock,
      title: 'Hourly Service',
      description: 'Book our vehicles by the hour for multiple stops, shopping, or business meetings.',
      features: ['Flexible Duration', 'Multiple Stops', 'Wait Time Included', 'Premium Vehicles'],
      price: 'From $35/hr',
      popular: false
    }
  ];

  return (
    <section id='services' className="services-root">
      <div className="services-container">
        <div className="services-header">
          <div className="services-header-badge">
            <Star className="services-header-badge-icon" />
            Our Premium Services
          </div>
          <h2 className="services-title">
            Transportation Solutions
            <span className="services-title-gradient">For Every Need</span>
          </h2>
          <p className="services-desc">
            From airport transfers to corporate travel, we provide premium transportation services tailored to your specific requirements.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`services-card${service.popular ? ' popular' : ''}`}
            >
              {service.popular && (
                <div className="services-card-popular">
                  <span>Most Popular</span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="services-card-iconbox">
                  <service.icon className="services-card-icon" />
                </div>
                <h3 className="services-card-title">{service.title}</h3>
                <p className="services-card-desc">{service.description}</p>
              </div>

              <div className="services-card-features">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="services-card-feature">
                    <span className="services-card-feature-dot"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="services-card-bottom">
                <div className="services-card-price">{service.price}</div>
                <div className="services-card-rating">
                  <Star className="services-card-rating-star" />
                  <span>4.9</span>
                </div>
              </div>

              <button className={`services-card-btn${service.popular ? ' popular' : ''}`}>
                Book Now
              </button>
            </div>
          ))}
        </div>

        <div className="services-cta-box">
          <div className="services-cta-inner">
            <h3 className="services-cta-title">Need a Custom Solution?</h3>
            <p className="services-cta-desc">
              Contact our team for personalized transportation packages and corporate rates.
            </p>
            <div className="services-cta-btns">
              <button className="services-cta-btn-main">Get Custom Quote</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
