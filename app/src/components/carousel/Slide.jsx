// // src/components/Carousel/Slide.jsx
// import React from "react";
// import "./carousel.css";
// import PropTypes from "prop-types";


// Slide.propTypes = {
//   slide: PropTypes.shape({
//     image: PropTypes.string.isRequired,
//     headline: PropTypes.string.isRequired,
//     sub: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     button1: PropTypes.shape({
//       text: PropTypes.string.isRequired,
//       action: PropTypes.string.isRequired,
//     }).isRequired,
//     button2: PropTypes.shape({
//       text: PropTypes.string.isRequired,
//       action: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
//   navigate: PropTypes.func.isRequired,
// };


// export default function Slide({ slide, navigate }) {
//   const handleClick = (path) => {
//     navigate(path);
//   };

//   return (
//     <main className="slide">
//       <div
//         className="slide-background"
//         style={{ backgroundImage: `url(${slide.image})` }}
//       />
//       <div className="main-container">
//         <div className="preview-box">
//           <div className="hero-text">
//             <p className="head-text">{slide.headline}</p>
//             <p className="head-text">{slide.sub}</p>
//             <div className="description">
//               <p>{slide.description}</p>
//             </div>
//           </div>
//           <div className="button-container">
//             <button
//               className="navigation-button"
//               onClick={() => handleClick(slide.button1.action)}
//             >
//               {slide.button1.text}
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


import React from "react";
import "./carousel.css";
import PropTypes from "prop-types";

export default function Slide({ slide, navigate, isActive }) {
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <main className={`slide ${isActive ? "active" : ""}`}>
      <div
        className="slide-background"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
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
          </div>
        </div>
      </div>
    </main>
  );
}

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
  }).isRequired,
  navigate: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
