import React, { useRef, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import '../css/About.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Executive',
      company: 'Tech Corp',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'MistyRide has been our go-to transportation service for all corporate events. Their professionalism and reliability are unmatched. The drivers are always punctual and the vehicles are immaculate.',
      service: 'Corporate Travel'
    },
    {
      name: 'Michael Chen',
      role: 'Frequent Traveler',
      company: 'Global Solutions',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'I travel frequently for business and MistyRide makes airport transfers stress-free. The flight tracking feature is amazing - they always know when my flight is delayed and adjust accordingly.',
      service: 'Airport Transfer'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Event Planner',
      company: 'Elegant Events',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'For our high-profile events, we need transportation that matches our standards. MistyRide delivers every time with luxury vehicles and exceptional service that impresses our clients.',
      service: 'Luxury Service'
    },
    {
      name: 'David Thompson',
      role: 'Family Traveler',
      company: 'Thompson Family',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Traveling with kids can be challenging, but MistyRide makes it easy. The spacious vehicles, child seats, and patient drivers make family trips enjoyable. Highly recommended!',
      service: 'Family Travel'
    },
    {
      name: 'Lisa Wang',
      role: 'Wedding Coordinator',
      company: 'Dream Weddings',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'MistyRide helped make our wedding day perfect. The limousine was stunning and the driver was so professional. They even provided champagne service. Absolutely magical experience!',
      service: 'Special Events'
    },
    {
      name: 'Robert Kim',
      role: 'Hotel Manager',
      company: 'Grand Hotel',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'We partner with MistyRide for our hotel guests and the feedback is consistently excellent. Their service quality aligns perfectly with our luxury standards.',
      service: 'Hotel Partnership'
    }
  ];

  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);

  const CARD_WIDTH = 300; // px
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
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        wrapper.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
      }
    }

    autoScrollInterval.current = setInterval(autoScroll, 3000);

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
    <section id='about' className="testimonials-root">
      <div className="testimonials-container">
        {/* Section Header */}
        <div className="testimonials-header">
          <div className="testimonials-header-badge">
            <Star className="testimonials-header-badge-icon" />
            Customer Reviews
          </div>
          <h2 className="testimonials-title">
            What Our Customers
            <span className="testimonials-title-gradient">Say About Us</span>
          </h2>
          <p className="testimonials-desc">
            Don't just take our word for it. Here's what our satisfied customers have to say about their MistyRide experience.
          </p>
        </div>
        {/* Testimonials Grid with Arrows */}
        <div className="testimonials-scroll-wrapper">
          <button className="testimonials-scroll-arrow left" onClick={handleScrollLeft} aria-label="Scroll left">
            &#10094;
          </button>
          <div
            className="testimonials-grid-horizontal no-scrollbar"
            ref={scrollRef}
            style={{
              minWidth: 0,
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'auto',
              width: '100%',
              maxWidth: '100%',
              gap: `${CARD_GAP}px`,
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              alignItems: 'stretch',
              minHeight: '80%',
              paddingBottom: '2rem',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonials-card" style={{ minWidth: `${CARD_WIDTH}px`, maxWidth: `${CARD_WIDTH}px`, flex: '0 0 auto' }}>
                <div className="testimonials-quote-iconbox">
                  <div className="testimonials-quote-bg">
                    <Quote className="testimonials-quote-icon" />
                  </div>
                </div>
                <div className="testimonials-service-badge">{testimonial.service}</div>
                <div className="testimonials-rating-row">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="testimonials-rating-star" />
                  ))}
                </div>
                <p className="testimonials-card-text">"{testimonial.text}"</p>
                <div className="testimonials-customer-row">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonials-customer-img"
                  />
                  <div>
                    <div className="testimonials-customer-name">{testimonial.name}</div>
                    <div className="testimonials-customer-role">{testimonial.role}</div>
                    <div className="testimonials-customer-company">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="testimonials-scroll-arrow right" onClick={handleScrollRight} aria-label="Scroll right">
            &#10095;
          </button>
        </div>
        {/* Overall Stats */}
        <div className="testimonials-stats-box">
          <div className="testimonials-stats-grid">
            <div className="testimonials-stats-item">
              <div className="testimonials-stats-value">4.9/5</div>
              <div className="testimonials-stats-label">Average Rating</div>
              <div className="testimonials-stats-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="testimonials-stats-star" />
                ))}
              </div>
            </div>
            <div className="testimonials-stats-item">
              <div className="testimonials-stats-value">2,500+</div>
              <div className="testimonials-stats-label">5-Star Reviews</div>
            </div>
            <div className="testimonials-stats-item">
              <div className="testimonials-stats-value">98%</div>
              <div className="testimonials-stats-label">Customer Satisfaction</div>
            </div>
            <div className="testimonials-stats-item">
              <div className="testimonials-stats-value">85%</div>
              <div className="testimonials-stats-label">Repeat Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
