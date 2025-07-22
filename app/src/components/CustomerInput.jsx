import React from "react";
import "../styles/CustomerInput.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";


CustomerInput.propTypes = {
  onClose: PropTypes.func.isRequired,
};


function CustomerInput({ onClose }) {
  const navigate = useNavigate()
  
  return (
    <div className="input-background">
      <div className="input-form-container">
        <div className="input-image">
          <img
            src="/assets/images/input-form-img.png"
            alt="customer input form "
            width={400}
          />
        </div>
        <form className="customer-details">
          <div className="customer-input">
            <input type="text" placeholder="Enter Username" id="" />
            <input type="email" placeholder="Example@example.com" id="" />
            <input
              type="tel"
              placeholder="Momo Number (+237) 6xx xxx xxx"
              id=""
            />
          </div>

          <div className="input-form-actsions">
            <button className="cancel-button" onClick={()=>{
              // onClose
               navigate(-1);
              }}>
              Cancel
            </button>
            <button className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerInput;
