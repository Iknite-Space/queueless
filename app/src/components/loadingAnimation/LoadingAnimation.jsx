import React from "react";
import "./LoadingAnimation.css"
import PropTypes from 'prop-types'

LoadingAnimation.propTypes = { name: PropTypes.string.isRequired}
function LoadingAnimation({name}) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading {name}...</p>
    </div>
  );
}

export default LoadingAnimation;