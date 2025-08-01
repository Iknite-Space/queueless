import "./ComingSoonPage.css";

import React from "react";
import { useNavigate } from "react-router";

import Header from "../../components/header/Header";

export function ComingSoonPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/organizations");
  };

  return (
    <>
      <nav>
        <Header />
      </nav>
      <main>
        <div className="preview-text">
          <p className="head-text">Book Appointment For Your Service Easily</p>
          <p className="description">
            Browse trusted organizations. Pick a service. Reserve your time slot
            instantly. Register your organization
          </p>
          <div className="button-container">
            
            <button className="navigation-button">Register Organization</button>
            <button className="navigation-button" onClick={handleClick}>
              View Organisations
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/assets/images/hero-image.svg" alt="hero caption" />
        </div>
      </main>
      <button className="navigation-button" onClick={handleClick}>
        View Organisations
      </button>
    </>
  );
}
