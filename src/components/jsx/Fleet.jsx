import React, { useRef, useEffect } from 'react';
import { Users, Luggage, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import '../css/Fleet.css';
import executiveSedanImg from '../../assets/images/executive_sedan.jpg';
import luxurySuvImg from '../../assets/images/luxury_suv.jpg';
import premiumVanImg from '../../assets/images/premium_van.jpg';
import luxuryLimousineImg from '../../assets/images/luxury_limousine.jpg';

const Fleet = () => {
  const vehicles = [
    {
      name: 'Executive Sedan',
      image: executiveSedanImg,
      passengers: '1-3',
      luggage: '2-3',
      features: ['Leather Seats', 'Climate Control', 'WiFi', 'Phone Charger'],
      price: 'From $45',
      description: 'Perfect for business trips and airport transfers with premium comfort.'
    },
    {
      name: 'Luxury SUV',
      image: luxurySuvImg,
      passengers: '1-6',
      luggage: '4-6',
      features: ['Premium Interior', 'Extra Space', 'Entertainment', 'Refreshments'],
      price: 'From $65',
      description: 'Spacious and luxurious, ideal for families and group travel.'
    },
    {
      name: 'Premium Van',
      image: premiumVanImg,
      passengers: '6-14',
      luggage: '8-12',
      features: ['Group Seating', 'Large Capacity', 'Entertainment', 'Climate Zones'],
      price: 'From $85',
      description: 'Perfect for large groups, corporate events, and family gatherings.'
    },
    {
      name: 'Luxury Limousine',
      image: luxuryLimousineImg,
      passengers: '6-10',
      luggage: '4-6',
      features: ['Bar Service', 'Premium Sound', 'Mood Lighting', 'Privacy Partition'],
      price: 'From $120',
      description: 'Ultimate luxury experience for special occasions and VIP transport.'
    }
  ];

  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);

  const CARD_WIDTH = 350; // px
  const CARD_GAP = 24; // px (1.5rem)
  const CARDS_IN_VIEW = 3;
  const scrollByAmount = (CARD_WIDTH + CARD_GAP) * CARDS_IN_VIEW;

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
    }
  };
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const wrapper = scrollRef.current;
    if (!wrapper) return;

    function autoScroll() {
      if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 5) {
        // At end, scroll to start
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        wrapper.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
      }
    }

    autoScrollInterval.current = setInterval(autoScroll, 3000);

    // Pause on mouse enter, resume on leave
    const pause = () => clearInterval(autoScrollInterval.current);
    const resume = () => {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = setInterval(autoScroll, 3000);
    };
    wrapper.addEventListener('mouseenter', pause);
    wrapper.addEventListener('mouseleave', resume);

    return () => {
      clearInterval(autoScrollInterval.current);
      wrapper.removeEventListener('mouseenter', pause);
      wrapper.removeEventListener('mouseleave', resume);
    };
  }, [scrollByAmount]);

  return (
    <section id='fleet' className="fleet-root">
      <div className="fleet-container">
        {/* Section Header */}
        <div className="fleet-header">
          <div className="fleet-header-badge">
            <Star className="fleet-header-badge-icon" />
            Our Premium Fleet
          </div>
          <h2 className="fleet-title">
            Choose Your
            <span className="fleet-title-gradient">Perfect Ride</span>
          </h2>
          <p className="fleet-desc">
            From executive sedans to luxury limousines, our diverse fleet ensures the perfect vehicle for every occasion and group size.
          </p>
        </div>
        {/* Fleet Grid with Arrows */}
        <div className="fleet-scroll-wrapper">
          <button className="fleet-scroll-arrow left" onClick={handleScrollLeft} aria-label="Scroll left">
            <ChevronLeft size={32} />
          </button>
          <div
            className="fleet-grid fleet-grid-horizontal no-scrollbar"
            ref={scrollRef}
          >
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className="fleet-card"
                style={{ minWidth: `${CARD_WIDTH}px`, maxWidth: `${CARD_WIDTH}px`, flex: '0 0 auto', marginRight: index !== vehicles.length - 1 ? `${CARD_GAP}px` : 0 }}
              >
                {/* Vehicle Image */}
                <div className="fleet-card-imgbox">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="fleet-card-img"
                  />
                  <div className="fleet-card-img-gradient"></div>
                </div>
                {/* Vehicle Info */}
                <div className="fleet-card-info">
                  <div className="fleet-card-info-row">
                    <h3 className="fleet-card-title">{vehicle.name}</h3>
                    <div className="fleet-card-price">{vehicle.price}</div>
                  </div>
                  <p className="fleet-card-desc">{vehicle.description}</p>
                  {/* Capacity Info */}
                  <div className="fleet-card-capacity-row">
                    <div className="fleet-card-capacity">
                      <Users className="fleet-card-capacity-icon" />
                      <span>{vehicle.passengers} Passengers</span>
                    </div>
                    <div className="fleet-card-capacity">
                      <Luggage className="fleet-card-capacity-icon" />
                      <span>{vehicle.luggage} Bags</span>
                    </div>
                  </div>
                  {/* Features */}
                  <div className="fleet-card-features">
                    {vehicle.features.map((feature, idx) => (
                      <div key={idx} className="fleet-card-feature">
                        <span className="fleet-card-feature-dot"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  {/* CTA Button */}
                  <button className={`fleet-card-btn${vehicle.popular ? ' popular' : ''}`}>
                    <span>Book This Vehicle</span>
                    <ArrowRight className="fleet-card-btn-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="fleet-scroll-arrow right" onClick={handleScrollRight} aria-label="Scroll right">
            <ChevronRight size={32} />
          </button>
        </div>
        {/* Fleet Features */}
        <div className="fleet-features-box">
          <div className="fleet-features-header">
            <h3 className="fleet-features-title">All Vehicles Include</h3>
            <p className="fleet-features-desc">Premium features standard across our entire fleet</p>
          </div>
          <div className="fleet-features-list">
            {[
              'Professional Drivers',
              'GPS Tracking',
              'Climate Control',
              'Phone Chargers',
              'Complimentary WiFi',
              'Refreshments'
            ].map((feature, index) => (
              <div key={index} className="fleet-feature-item">
                <div className="fleet-feature-iconbox">
                  <Star className="fleet-feature-icon" />
                </div>
                <div className="fleet-feature-label">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
