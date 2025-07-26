
import React, { useState } from "react";
import axios from 'axios'
import "./CustomerInput.css";
import PropTypes from "prop-types";
import {v4 as uuidv4} from 'uuid';
import PollingStatus from "../pollingStatus/StatusSocket";

CustomerInput.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  org: PropTypes.func.isRequired,
  service: PropTypes.func.isRequired,
  slot: PropTypes.func.isRequired,
  date: PropTypes.func.isRequired,
};

function CustomerInput({ handleCloseModal, org, service, slot, date }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    serviceFee: "",
  });

  //state to hold payment id 
  const [paymentId, setPaymentId] = useState(null);

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

  //handler for the confirm button that submits form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const appPayload = {
      cus_name: formData.username,
      cus_email: formData.email,
      phone_number: "+237"+formData.phone ,
      amount: formData.serviceFee.trim(),
      currency: "XAF",
      description: "Service Payment",
      reference: uuidv4(),
      service_id: service.service_id,
      slot_id: slot.id,
      date: date
    }
    console.log(appPayload)
    // handle final form submission here (e.g. POST request)
    try{
      const response = await axios.post(
        "https://api.queueless.xyz/api/v1/payment/initiate",
        appPayload,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("Submitted:", response);
      const paymentId = response.data.payment.payment_id;
      localStorage.setItem("paymentId", paymentId);
      console.log("created payment id", paymentId);

      // extracted payment id is is saved to the browser to use
      // const savedPaymentId = localStorage.setItem("paymentId");
      localStorage.setItem("paymentId", paymentId); // saves it
      setPaymentId(paymentId); // allows UI to use it

      // console.log("saved payment is:", savedPaymentId);
    } catch(err){
      console.log("submission failed", err)
    }
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
                <option value=" 2 "> 2 XAF </option>
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

            {paymentId && <PollingStatus paymentId={paymentId} />}

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
