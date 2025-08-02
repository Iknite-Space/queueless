import "./ComingSoonPage.css";

import React from "react";
import { useNavigate } from "react-router";

import Footer from "../../components/footer/Footer";

import Header from "../../components/header/Header";

export function ComingSoonPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/organizations");
  };

  return (
    <>
      <Header />
      <main>
        <div className="main-container">
          <div className="preview-box">
            <p className="head-text">
              Book Appointment For Your Service Easily
            </p>
            <div className="description">
              <p>
                Browse trusted organizations. Pick a service. Reserve your time
                slot instantly.
              </p>
              <br />
              <p>Register your organization. Display your various services</p>
            </div>

            <div className="button-container">
              <button className="navigation-button" onClick={handleClick}>
                Book A Service
              </button>
            </div>
            
          </div>
          <div className="hero-image">
            <img src="/assets/images/hero-image.svg" alt="hero caption" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
