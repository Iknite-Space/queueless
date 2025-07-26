import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PollingSpinner from "./PollingSpinner";

StatusSocket.propTypes = {
  paymentId: PropTypes.string.isRequired,
};
function StatusSocket({ paymentId }) {
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    
    if (!paymentId) return; // exits of no payment is provided



    // let attempts = 0;
    // const maxAttempts = 10; // 5 seconds × 10 = almost 1 minutes

    // const interval = setInterval(async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:8085/api/v1/payment/${paymentId}/status`
    //     );

    //     const currentStatus = response.data.payment_status;
    //     setStatus(currentStatus);
    //     attempts++;

    //     if (currentStatus !== "PENDING" || attempts >= maxAttempts) {
    //       clearInterval(interval);
    //     }
    //   } catch (error) {
    //     console.error("Polling failed:", error);
    //     clearInterval(interval); // Stop if request errors out
    //   }
    // }, 5000); // every 5 seconds

    // return () => clearInterval(interval); // cleanup if user leaves

    const socket = new WebSocket(
      `wss://api.queueless.xyz/api/v1/payment/${paymentId}/statusSocket`
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket received:", data);
      setStatus(data.status);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setStatus("FAILED"); // optional fallback
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => socket.close(); // cleanup on unmount
  }, [paymentId]);



  // return status;
  return (
    <>
      <div className="polling-status">
        {status === "PENDING" && (
          <div className="status-loading">
            <PollingSpinner />
            <p>Waiting for payment confirmation...</p>
          </div>
        )}

        {status === "SUCCESSFUL" && (
          <p className="status-success">✅ Payment confirmed!</p>
        )}

        {status === "FAILED" && (
          <p className="status-failed">❌ Payment failed. Please try again.</p>
        )}
      </div>
    </>
  );
}

export default StatusSocket;
