
import React, { useState } from "react";

import "./CustomerInput.css";
import PropTypes from "prop-types";

CustomerInput.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  org: PropTypes.func.isRequired,
  service: PropTypes.func.isRequired,
  slot: PropTypes.func.isRequired,
};

function CustomerInput({ handleCloseModal, org, service, slot }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    serviceFee: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    // You can add validation here before going to next step
    setStep(2);
  };

  const handleSubmit = () => {
    // handle final form submission here (e.g. POST request)
    console.log("Submitted:", formData);
    handleCloseModal(); // close the modal after submit
  };

  return (
    <div className="input-background">
      <h2 className="form-header">
        {step === 1
          ? "Fill in your details to confirm your slot"
          : "Confirm Appointment Details"}
      </h2>

      <div
        className={
          step === 1 ? "input-form-container" : "confirm-details-container"
        }
      >
        {/* <div className="input-image">
          <img
            src="/assets/images/input-form-img.png"
            alt="customer input form"
            width={400}
          />
        </div> */}

        {step === 1 && (
          <form className="customer-details" onSubmit={handleNext}>
            <div className="customer-input">
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Example@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Momo Number (+237) 6xx xxx xxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <select
                name="serviceFee"
                id="service-fee"
                value={formData.serviceFee}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
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
        )}

        {step === 2 && (
          <div className="customer-details">
            <div className="confirmation-page">
              <div className="confirm-row">
                <p className="confirm-label">Organization:</p>
                <p className="confirm-value">{org.name}</p>
              </div>

              <div className="confirm-row">
                <p className="confirm-label">Service:</p>
                <p className="confirm-value">{service.service_name}</p>
              </div>
              
              <hr />
              <br />
              <div className="confirm-row">
                <p className="confirm-label">Appointment date:</p>
                <p className="confirm-value">{slot.formattedDate}</p>
              </div>
              <div className="confirm-row">
                <p className="confirm-label">Username:</p>
                <p className="confirm-value">{formData.username}</p>
              </div>
              <div className="confirm-row">
                <p className="confirm-label">Email:</p>
                <p className="confirm-value">{formData.email}</p>
              </div>
              <div className="confirm-row">
                <p className="confirm-label">Phone Number:</p>
                <p className="confirm-value">{formData.phone}</p>
              </div>
              <div className="confirm-row">
                <p className="confirm-label">Amount to pay:</p>
                <p className="confirm-value">{formData.serviceFee}</p>
              </div>
            </div>

            <div className="input-form-actions">
              <button
                className="cancel-button"
                type="button"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="submit-button"
                type="button"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerInput;
