import React, { useState } from "react";
import axios from "axios";
import "./CustomerInput.css";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import DownloadTicket from "../DownloadTicket/DownloadTicket";
import StatusSocket from "../pollingStatus/StatusSocket";

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

  const [paymentId, setPaymentId] = useState(null);

  const resetFormData = () => {
    setFormData({
      username: "",
      email: "",
      phone: "",
      serviceFee: "",
    });
  };
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

  const handleStatusChange = (newStatus) => {
    if (newStatus === "PENDING") setStep(3);
    else if (newStatus === "SUCCESSFUL") {
      // save to localstorage
      localStorage.setItem("paymentStatus", "SUCCESSFUL")
      setStep(4);}
    else if (newStatus === "FAILED") setStep(5);
  };

  //handler for the confirm button that submits form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const appPayload = {
      cus_name: formData.username,
      cus_email: formData.email,
      phone_number: "+237" + formData.phone,
      amount: formData.serviceFee.trim(),
      currency: "XAF",
      description: "Service Payment",
      reference: uuidv4(),
      service_id: service.service_id,
      slot_id: slot.id,
      date: date,
    };

    console.log(appPayload);
    // handle final form submission here (e.g. POST request)
    try {
      const response = await axios.post(
        "https://api.queueless.xyz/api/v1/payment/initiate",
        appPayload,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      setStep(3); // Show "Processing Payment"
      console.log("Submitted:", response);
      const paymentId = response.data.payment.payment_id;
      // extracted payment id is is saved to the browser to use
      localStorage.setItem("paymentId", paymentId); // saves it

      console.log("created payment id", paymentId);

      setPaymentId(paymentId); // allows UI to use it
      

      // console.log("saved payment is:", savedPaymentId);
    } catch (err) {
      alert("sorry, payment request could not be made. make sure your mobile number is 9 digits")
      console.log("submission failed", err);
    }
  };

  return (
    <div className="form-input-background">
      <h2 className="form-header">
        {step === 1
          ? "Fill in your details to confirm your slot"
          : step === 2
          ? "Confirm Appointment Details"
          : step === 3
          ? "Processing Payment"
          : step === 4
          ? "Payment Successful"
          : step === 5
          ? "Payment Failed"
          : "Download Ticket"}
      </h2>

      <div
        className={
          step === 1 ? "input-form-container" : "confirm-details-container"
        }
      >

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
                placeholder="Momo Number 6xx xxx xxx"
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
                onClick={() => {
                  handleCloseModal();
                  resetFormData();
                }}
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

        {step === 3 && (
          <div className="customer-details">
            <div className="confirmation-page">
              {/* <h3>Processing your payment...</h3> */}
              <LoadingAnimation name="...confirm your payment" />
              {/* {paymentId && <PollingStatus paymentId={paymentId} />} */}
            {paymentId && (
              <StatusSocket
                paymentId={paymentId}
                onStatusUpdate={handleStatusChange}
              />
            )}

            </div>
          </div>
        )}

        {step === 4 && (
          <div className="customer-details">
            <div className="confirmation-page">
              {/* <h3>Payment Successful!</h3> */}
              <p>Your Appointment has been confirmed.</p>
              <div className="input-form-actions">
                <button className="submit-button" onClick={() => setStep(6)}>
                  View ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="customer-details">
            <div className="confirmation-page">
              {/* <h3>Payment Failed</h3> */}
              <p>There was an issue with your payment. Please try again.</p>
              <div className="input-form-actions">
                <button className="cancel-button" onClick={() => setStep(2)}>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="customer-details">
            <div className="confirmation-page">
              {/* Downlaod ticket */}
              <DownloadTicket
                handleCloseModal={handleCloseModal}
                org={org}
                service={service}
                slot={slot}
                date={date}
                formData={formData}
                setStep={setStep}
                resetFormData={resetFormData}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerInput;
