

import React from "react";
import "./About.css";

 function About() {
  return (
    <div className="about-container">
      {/* header Section */}
      <section className="about-header-section">
        <p className="about-header-text">Book Services Without the Wait</p>
        {/* <p>Skip the queue. Book your slot. Save time.</p> */}
        <p className="about-description">Our platform lets customers book slots for services at their convenience, while organizations <span className="third-line">manage time effortlessly.</span> </p>
      </section>


      {/* Audience Section */}
      <section className="audience-section">
        <div className="audience-card">
          <h2>For Customers</h2>
          <p>Browse services, pick a time, and avoid waiting.</p>
        </div>
        <div className="audience-card">
          <h2>For Organizations</h2>
          <p>Register, define services, and manage bookings.</p>
        </div>
      </section>

      {/* Flow Section */}
      <section className="flow-section">
        <h2>How It Works</h2>
        <div className="flow-diagram">
          <div className="flow-step">Register</div>
          <span>→</span>
          <div className="flow-step">Add Services</div>
          <span>→</span>
          <div className="flow-step">Set Time Spans</div>
          <span>→</span>
          <div className="flow-step">Slots Generated</div>
          <span>→</span>
          <div className="flow-step">Customer Books</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why It Works</h2>
        <div className="features-grid">
          <div className="feature-card">⏱️ Time-efficient</div>
          <div className="feature-card">📱 Easy to use</div>
          <div className="feature-card">🔒 Secure</div>
          <div className="feature-card">📊 Scalable</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to streamline your service experience?</h2>
        <div className="cta-buttons">
          <button className="cta-org">Register Organization</button>
          <button className="cta-user">Book a Slot</button>
        </div>
      </section>
    </div>
  );
}


export default About;