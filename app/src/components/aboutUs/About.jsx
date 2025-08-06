import React from "react";
import "./About.css";
import { FaRegUser } from "react-icons/fa6";
import { GiAvoidance } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import { PiBuildingOffice } from "react-icons/pi";
import { LuClock2 } from "react-icons/lu";
import { GrStatusGood } from "react-icons/gr";
import { SlLock } from "react-icons/sl";
import { GiProgression } from "react-icons/gi";

function About() {
  return (
    <div className="about-container">
      {/* header Section */}
      <section className="about-header-section">
        <p className="about-header-text">Book Services Without the Wait</p>
        {/* <p>Skip the queue. Book your slot. Save time.</p> */}
        <p className="about-description">
          <span className="brand-name">QLess</span> enables customers book slots for services at their
          convenience, while organizations{" "}
          <span className="third-line">manage time effortlessly.</span>{" "}
        </p>
      </section>

      {/* Audience Section */}
      <section className="user-section">
        <div className="user-card customer-card">
          <h2>For Customers</h2>
          <ul>
            <li>
              <FaRegUser className="user-card-icon"/>
              Browse services
            </li>
            <li>
              <IoAddCircleOutline className="user-card-icon"/>
              Pick a time
            </li>
            <li>
              <GiAvoidance className="user-card-icon"/>
              Avoid waiting
            </li>
          </ul>
        </div>
        <div className="user-card admin-card">
          <h2>
            <PiBuildingOffice className="user-card-icon"/>
            For Organizations
          </h2>
          <ul>
            <li>
              <span className="check-icon">&#10004;</span>Register
            </li>
            <li>
              <span className="check-icon">&#10004;</span>Define services
            </li>
            <li>
              <span className="check-icon">&#10004;</span>Manage bookings
            </li>
          </ul>
        </div>
      </section>

      {/* Flow Section */}
      <section className="flow-section">
        <h2>Flow Visualization</h2>
        <div className="flow-diagram">
          <div className="flow-step">Organization Registers</div>
          <span>→</span>
          <div className="flow-step">Add Services</div>
          <span>→</span>
          <div className="flow-step">Set Time Spans</div>
          <span>→</span>
          <div className="flow-step">System Generated Slots</div>
          <span>→</span>
          <div className="flow-step">Customer Books service</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <LuClock2 className="feature-icons" /> Time-efficient
          </div>
          <div className="feature-card">
            <GrStatusGood className="feature-icons" /> Easy to use
          </div>
          <div className="feature-card">
            <SlLock className="feature-icons" />
            Secure
          </div>
          <div className="feature-card">
            <GiProgression
              className="feature-icons"
              // size={60}
              // fontWeight={400}
            />
            Scalable
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to streamline your service experience?</h2>
        <div className="cta-buttons">
          <button className="cta-org">Register Organization</button>
          <button className="cta-user">Book a Service</button>
        </div>
      </section>
    </div>
  );
}

export default About;
