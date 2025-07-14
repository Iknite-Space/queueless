import React from "react";
import '../styles/CustomerInput.css' 

function CustomerInput() {
  return (
    <div className="input-form-container">
      <div className="input-image">
        <img
          src="/assets/images/input-form-img.png"
          alt="customer input form "
          width={400}
        />
      </div>
      <div className="customer-details">

        <div className="customer-input">

        <input type="text" placeholder="Enter Username" id="" />
        <input type="email" placeholder="Example@example.com" id="" />
        <input type="tel" placeholder="Momo Number (+237)" id="" />
        </div>

        <div className="input-form-actions">
          <button className="cancel-button">Cancel</button>
          <button className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default CustomerInput;
