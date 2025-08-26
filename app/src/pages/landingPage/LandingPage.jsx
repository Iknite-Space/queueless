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
          src="/assets/images/waiting.jpg"
          alt="main-background"
          className="main-bg-image"
        />
        <Carousel navigate={navigate} />
        {/* <div className="main-container">
          <div className="preview-box">
            <p className="head-text">Book your spot in seconds.</p>
            <p className="head-text">Skip the queue</p>
            <div className="description">
              <p>
                Find the services you want and reserve your a spot for a
                hassle-free visit.
              </p>
            </div>

            <div className="button-container">
              <button
                className="navigation-button"
                onClick={handleClickBookSlot}
              >
                View Organization
              </button>
            </div>
          </div>
        </div> */}
      </main>

      <About onClickBookService={handleClickBookSlot} />
    </div>
  );
}

// import React from "react";
// import "./LandingPage.css";
// import { useNavigate } from "react-router";
// import About from "../../components/aboutUs/About";
// import Carousel from "../../components/carousel/Carousel";

// export function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="landing-page-body">
//       <Carousel navigate={navigate} />
//       <About onClickBookService={() => navigate("/organizations")} />
//  </div>
//   );
// }