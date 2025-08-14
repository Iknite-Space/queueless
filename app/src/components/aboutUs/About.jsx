import React from "react";
import "./About.css";
import { useNavigate } from "react-router";
import { FaRegUser } from "react-icons/fa6";
import { GiAvoidance } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import { PiBuildingOffice } from "react-icons/pi";
import { LuClock2 } from "react-icons/lu";
import { GrStatusGood } from "react-icons/gr";
import { SlLock } from "react-icons/sl";
import { GiProgression } from "react-icons/gi";
import { FaGears } from "react-icons/fa6";
import PropTypes from "prop-types";

About.propTypes = {
  onClickBookService: PropTypes.func.isRequired,
};

function About({ onClickBookService }) {
  const navigate = useNavigate();
  const onClickRegister = () => {
    navigate("/contact");
  };

  return (
    <div id="about" className="about-container">
      {/* header Section */}
      <section className="about-header-section ">
        <p className="gradient-text">Get Served Without the Wait</p>
        <p className="gradient-text">
          Register Organization & manage queues seamlessly
        </p>
      </section>

      <div className="team-qless">
        <div className="team-qless-img-container">
          <img src="/assets/images/qless-team.jpeg" alt="about team" />
        </div>
        <section className="about-section">
          <h2 className="about-title">Who We Are</h2>
          <p className="about-description">
            We are a passionate team dedicated to making service booking fast,
            easy, and stress-free. Whether you are want a service as a customer
            or provide a service as an organization, we are here to simplify the
            process.
          </p>

          <div className="about-highlights">
            <div className="highlight-box">
              <h3>⏱️ Fast Booking</h3>
              <p>Reserve your spot in seconds.</p>
            </div>
            <div className="highlight-box">
              <h3>🤝 Trusted Partners</h3>
              <p>Working with verified organizations.</p>
            </div>
            <div className="highlight-box">
              <h3>📍 Local Impact</h3>
              <p>Serving communities across Cameroon.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="how-to-use">
        <h1 className="usage-title">How To Use</h1>
        <div className="customer-procedure-container">
          <div className="man-using-phone-image">
            <img
              src="/assets/images/main-img.jpg"
              alt="gentleman booking a service with phone"
            />
          </div>
          <div className="user-card customer-card">
            <h2>For Customers</h2>
            <ul>
              <li>
                <FaRegUser className="user-card-icon" />
                Search and Select the organization you want their services
              </li>
              <li>
                <FaRegUser className="user-card-icon" />
                Choose the service you want, and book a slot
              </li>
              <li>
                <IoAddCircleOutline className="user-card-icon" />
                Pick a date and time convenient for you to complete your booking
              </li>
              <li>
                <GiAvoidance className="user-card-icon" />
                Avoid waiting and come at your desired time.
              </li>
            </ul>
          </div>
        </div>
        <div className="organization-procedure-container">
          <div className="user-card admin-card">
            <h2>
              <PiBuildingOffice className="user-card-icon" />
              For Organizations
            </h2>
            <ul>
              <li>
                <span className="check-icon">&#10004;</span>Organization admins
                register their organization name
              </li>
              <li>
                <span className="check-icon">&#10004;</span>Set their various
                services they offer as an organization
              </li>
              <li>
                <span className="check-icon">&#10004;</span>Set the duration
                needed to complete each service
              </li>
              <li>
                <span className="check-icon">&#10004;</span>Also state their
                working hour Start and End time on working days
              </li>
              <li>
                <FaGears className="user-card-icon" />
                The System generates the slots available for booking
              </li>
            </ul>
          </div>

          <div className="man-using-phone-image">
            <img
              src="/assets/images/confirm-booking.jpg"
              alt="gentleman booking a service with phone"
            />
          </div>
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
        <h2 className="why-it-works-title">Why It Works</h2>
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
          <button className="cta-org" onClick={onClickRegister}>
            Register Organization
          </button>
          <button className="cta-user" onClick={onClickBookService}>
            Book a Service
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;
