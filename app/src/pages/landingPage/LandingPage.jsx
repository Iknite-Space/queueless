import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router";
import Header from "../../components/header/Header";
import About from "../../components/aboutUs/About";


export function LandingPage() {
  const navigate = useNavigate();

  const handleClickBookSlot = () => {
    navigate("/organizations");
  };


  return (
    <div className="landing-page-body">
      <Header />
      <main>
        <img
          src="/assets/images/main-img.jpg"
          alt="main-background"
          className="main-bg-image"
        />
        <div className="main-container">
          <div className="preview-box">
            <p className="head-text">Book your spot in seconds.</p>
            <p className="head-text">Skip the queue</p>
            <div className="description">
              <p>
                Find the services you need and reserve your a spot for a
                hassle-free visit.
              </p>
            </div>

            <div className="button-container">
              <button
                className="navigation-button"
                onClick={handleClickBookSlot}
              >
                Book A Service
              </button>
            </div>
          </div>
        </div>
      </main>

      <About onClickBookService={handleClickBookSlot} />


    </div>
  );
}
