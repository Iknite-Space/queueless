import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router";
import Header from "../../components/header/Header";
import About from "../../components/aboutUs/About";
import Footer from "../../components/footer/Footer";

export function LandingPage() {
  const navigate = useNavigate();

  const handleClickBookSlot = () => {
    navigate("/organizations");
  };

    // const handleClickRegisterService = () => {
    //   navigate("/contact");
    // };

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
              <button className="navigation-button" onClick={handleClickBookSlot}>
                Book A Service
              </button>
            </div>
            
          </div>
          <div className="hero-image">
            <img src="/assets/images/hero-image.svg" alt="hero caption" />
          </div>
        </div>
      </main>

      <About />

      <Footer />
    </>
  );
}
