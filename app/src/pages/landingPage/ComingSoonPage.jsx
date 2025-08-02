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
        <div className="preview-box">
          <p className="head-text">Book Appointment For Your Service Easily</p>
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

        <div className="wave">
          {/* <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#02153D" // Matches your dark blue background
              d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,117.3C840,128,960,192,1080,213.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#0099ff"
              fillOpacity="1"
              d="M0,256L34.3,240C68.6,224,137,192,206,197.3C274.3,203,343,245,411,234.7C480,224,549,160,617,112C685.7,64,754,32,823,53.3C891.4,75,960,149,1029,160C1097.1,171,1166,117,1234,133.3C1302.9,149,1371,235,1406,277.3L1440,320L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>
      </main>
      <button className="navigation-button" onClick={handleClick}>
        View Organisations
      </button>
    </>
  );
}
