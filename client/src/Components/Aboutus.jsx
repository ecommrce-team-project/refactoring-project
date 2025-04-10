import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AboutUs.css';

const AboutUs = () => {
 

  return (
    <div className="about-us-container">
      <header className="about-header">
        <h1>About Our Real Estate Platform</h1>
        <p className="subtitle">Your trusted partner in online real estate</p>
      </header>

      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            We're transforming the property buying and selling experience by providing a transparent,
            efficient, and secure platform. Our goal is to simplify real estate transactions while
            ensuring the best opportunities for our clients.
          </p>
        </div>
        <div className="mission-image"></div>
      </section>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🏠</div>
            <h3>Transparency</h3>
            <p>Clear information and no hidden fees or surprises.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Trust</h3>
            <p>Client relationships built on honesty and integrity.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">⚡</div>
            <h3>Innovation</h3>
            <p>Cutting-edge technology for an optimal user experience.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3>Commitment</h3>
            <p>Dedicated to helping you find your perfect property.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-photo photo1"></div>
            <h3>John Smith</h3>
            <p className="position">Founder & CEO</p>
            <p className="bio">20 years of experience in luxury real estate.</p>
          </div>
          <div className="team-member">
            <div className="member-photo photo2"></div>
            <h3>Sarah Johnson</h3>
            <p className="position">Sales Director</p>
            <p className="bio">Specialist in international markets.</p>
          </div>
          <div className="team-member">
            <div className="member-photo photo3"></div>
            <h3>Michael Brown</h3>
            <p className="position">Technology Lead</p>
            <p className="bio">Expert in digital real estate solutions.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2>By The Numbers</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Properties Sold</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$10M</div>
            <div className="stat-label">Transaction Volume</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24h</div>
            <div className="stat-label">Average Response Time</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
  <h2>Ready to Find Your Dream Property?</h2>
  <Link to="/estate">
    <button className="cta-button">Browse Our Listings</button>
  </Link>
</section>
    </div>
  );
};

export default AboutUs;