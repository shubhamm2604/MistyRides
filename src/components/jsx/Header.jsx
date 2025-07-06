import React, { useState, useEffect } from 'react'
import { Menu, X, Car, Phone, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import '../css/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Features', href: '/features' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  const handleBookRide = () => {
    navigate('/book');
  };

  return (
    <header className={`header-root ${isScrolled ? 'header-scrolled' : 'header-top'}`}>
      <div className="header-container">
        <div className="header-row">
          {/* Logo */}
          <Link to="/" className="header-logo-row">
            <div className="header-logo-bg">
              <Car className="header-logo-icon" />
            </div>
            <div>
              <h1 className="header-title">MistyRide</h1>
              <p className="header-subtitle">Premium Transportation</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="header-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="header-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
                <span className="header-nav-underline"></span>
              </Link>
            ))}
          </nav>
          
          {/* Contact Info & CTA */}
          <button
            className="header-book-btn"
            onClick={handleBookRide}
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
                <Link
                  key={item.name}
                  to={item.href}
                  className="header-mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="header-mobile-contact-box">
                <div className="header-mobile-contact-row">
                  <Mail className="header-mobile-contact-icon" />
                  <span>info@mistyride.com</span>
                </div>
                <button 
                  className="header-mobile-cta-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleBookRide();
                  }}
                >
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