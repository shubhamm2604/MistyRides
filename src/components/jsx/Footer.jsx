// Footer.jsx
import React from 'react';
import '../css/Footer.css';
import { Car, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Features', href: '/features' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    'Airport Transfers',
    'Corporate Travel',
    'City Tours',
    'Hourly Service',
    'Wedding Transportation',
    'Event Transportation'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          {/* Company Info */}
          <div className="footer-col">
            <Link to="/" className="footer-brand">
              <div className="footer-icon-bg">
                <Car className="footer-icon" />
              </div>
              <div>
                <h1 className="footer-title">MistyRide</h1>
                <p className="footer-subtitle">Premium Transportation</p>
              </div>
            </Link>

            <p className="footer-description">
              Your trusted partner for premium transportation services.
              Experience comfort, reliability, and luxury with every ride.
            </p>

            <div className="footer-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="footer-star" />
              ))}
              <span className="footer-review-text">4.9/5 from 2,500+ reviews</span>
            </div>

            <div className="footer-socials">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className="footer-social-link" aria-label={social.name}>
                  <social.icon className="footer-social-icon" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="footer-heading">Our Services</h3>
            <ul className="footer-list">
              {services.map((service, index) => (
                <li key={index}>
                  <Link to="/services" className="footer-link">{service}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <Mail className="footer-contact-icon" />
                <div>
                  <p className="footer-contact-text">info@mistyride.com</p>
                  <p className="footer-contact-sub">General Inquiries</p>
                </div>
              </div>

              <div className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <div>
                  <p className="footer-contact-text">N- 19 SINGAPUR GREEN VIEW, TALAWALI CHANDA, Manglia</p>
                  <p className="footer-contact-text">Indore- 453771, Madhya Pradesh</p>
                </div>
              </div>

              <div className="footer-contact-item">
                <Clock className="footer-contact-icon" />
                <div>
                  <p className="footer-contact-text">24/7 Service</p>
                  <p className="footer-contact-sub">Always Available</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-bottom-left">
            © 2025 MistyRide. All rights reserved.
          </div>
          <div className="footer-bottom-right">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <a href="#" className="footer-bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;