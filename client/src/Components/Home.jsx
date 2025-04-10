import React from 'react'
import { Link } from 'react-router-dom'
import Category from './Category.jsx'
import FAQ from './FAQ.jsx'
import Contactus from './Contactus.jsx'
import '../css/Home.css'

function Home() {
  return (
    <div className="home-container">
           <div className="hero-section">
                <div className="hero-content">
                  <h1>Discover Your Dream Home</h1>
                  <p>Experience luxury living with our handpicked selection of premium properties. Find the perfect space that matches your lifestyle and aspirations.</p>
                  <Link to="/estate" className="cta-button">View Properties</Link>
                </div>
              </div>
              
              {/* <main className="main-content">
                <section className="content-section">
                  <h2>Featured Properties</h2>
                  <p>Explore our collection of carefully selected properties, each offering unique features and exceptional value. From modern urban apartments to spacious suburban homes, find the perfect property that suits your needs.</p>
                </section>
        
                <section className="content-section">
                  <h2>Why Choose Us</h2>
                  <p>With years of experience in the real estate market, we pride ourselves on offering personalized service and expert guidance throughout your property journey. Our team of professionals is dedicated to helping you make informed decisions and finding the perfect property match.</p>
                </section>
        
                <section className="content-section">
                  <h2>Our Services</h2>
                  <p>We offer comprehensive real estate services including property valuation, market analysis, and personalized property tours. Our expert team ensures a smooth and efficient process from initial consultation to final closing.</p>
                </section>
              </main> */}
              
              <Category />

              <FAQ />
              <Contactus />
    </div>
  )
}

export default Home