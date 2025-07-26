import React from "react";
import "./PollingSpinner.css"; // optional for styling

const PollingSpinner = () => {
  return (
    <div className="polling-spinner">
      <div className="spinner-circle"></div>
      <p>Checking payment status...</p>
    </div>
  );
};

export default PollingSpinner;
