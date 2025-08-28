import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router";
import About from "../../components/aboutUs/About";
import Carousel from "../../components/carousel/Carousel";



export function LandingPage() {
  const navigate = useNavigate();

  const handleClickBookSlot = () => {
    navigate("/organizations");
  };


  return (
    <div className="landing-page-body">
      <main>
        <img
          src="/assets/images/queue.jpg"
          alt="main-background"
          className="main-bg-image"
        />
        <Carousel navigate={navigate} />
      </main>

      <About onClickBookService={handleClickBookSlot} />
    </div>
  );
}

