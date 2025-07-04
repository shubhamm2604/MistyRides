import React, { useState, useEffect } from 'react'
import { Menu, X, Car, Phone, Mail } from 'lucide-react'

import '../css/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Features', href: '#features' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <header className={`header-root ${isScrolled ? 'header-scrolled' : 'header-top'}`}>
      <div className="header-container">
        <div className="header-row">
          {/* Logo */}
          <div className="header-logo-row">
            <div className="header-logo-bg">
              <Car className="header-logo-icon" />
            </div>
            <div>
              <h1 className="header-title">MistyRide</h1>
              <p className="header-subtitle">Premium Transportation</p>
            </div>
          </div>
          {/* Desktop Navigation */}
          <nav className="header-nav">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="header-nav-link"
              >
                {item.name}
                <span className="header-nav-underline"></span>
              </a>
            ))}
          </nav>
          {/* Contact Info & CTA */}
          <button
            className="header-book-btn"
            onClick={() => {
              const form = document.querySelector('.booking-form-wrapper');
              if (form) {
                form.classList.add('zoom-pulse');
                setTimeout(() => {
                  form.classList.remove('zoom-pulse');
                }, 600); // match animation duration
              }
            }}
          >
            Book Your Ride
          </button>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="header-mobile-menu-btn"
          >
            {isMenuOpen ? <X className="header-mobile-menu-icon" /> : <Menu className="header-mobile-menu-icon" />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="header-mobile-menu">
            <div className="header-mobile-menu-inner">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="header-mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="header-mobile-contact-box">
                <div className="header-mobile-contact-row">
                  <Mail className="header-mobile-contact-icon" />
                  <span>info@mistyride.com</span>
                </div>
                <button className="header-mobile-cta-btn">
                  Book Your Ride
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
