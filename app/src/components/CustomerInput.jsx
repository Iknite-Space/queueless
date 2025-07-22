import React from "react";
import "../styles/CustomerInput.css";
import PropTypes from "prop-types";

CustomerInput.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};

function CustomerInput({ handleCloseModal }) {


  return (
    <div className="input-background">
      <h2 className="form-header">Fill in your details to confirm your slot</h2>
      <div className="input-form-container">
        <div className="input-image">
          <img
            src="/assets/images/input-form-img.png"
            alt="customer input form "
            width={400}
          />
        </div>
        <form
          className="customer-details"
          onSubmit={(e) => {
            e.preventDefault();
            // handle form submission
          }}
        >
          <div className="customer-input">
            <input type="text" placeholder="Enter Username" id="username" />
            <input type="email" placeholder="Example@example.com" id="email" />
            <input
              type="tel"
              placeholder="Momo Number (+237) 6xx xxx xxx"
              id="phone"
            />
            <select name="service-fee" id="service-fee" required>
              <option value="" disabled selected>
                Platform charges
              </option>
              <option value="1-frs">1 frs</option>
            </select>
          </div>

          <div className="input-form-actions">
            <button
              className="cancel-button"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button className="submit-button" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerInput;
