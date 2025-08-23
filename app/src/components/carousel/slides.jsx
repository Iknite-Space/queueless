// src/components/Carousel/Slide.jsx
import React from "react";
import PropTypes from "prop-types";


Slide.propTypes = {
  slide: PropTypes.shape({
    image: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    button1: PropTypes.shape({
      text: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
    }).isRequired,
    button2: PropTypes.shape({
      text: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};


export default function Slide({ slide, navigate }) {
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <main className="slide">
      <img src={slide.image} alt="slide background" className="main-bg-image" />
      <div className="main-container">
        <div className="preview-box">
          <div className="hero-text">
            <p className="head-text">{slide.headline}</p>
            <p className="head-text">{slide.sub}</p>
            <div className="description">
              <p>{slide.description}</p>
            </div>
          </div>
          <div className="button-container">
            <button
              className="navigation-button"
              onClick={() => handleClick(slide.button1.action)}
            >
              {slide.button1.text}
            </button>
            {/* <button
              className="navigation-button"
              onClick={() => handleClick(slide.button2.action)}
            >
              {slide.button2.text}
            </button> */}
          </div>
        </div>
      </div>
    </main>
  );
}
