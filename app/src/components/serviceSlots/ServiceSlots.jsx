import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./ServiceSlots.css";
import { useParams } from "react-router";

import Modal from "../customerInputModal/Modal";

ServiceSlots.propTypes = {
  org: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  bookedSlotIds: PropTypes.arrayOf(PropTypes.number),
  paymentStatus: PropTypes.string.isRequired,
  setPaymentStatus: PropTypes.func.isRequired,
};

export function ServiceSlots({ org, service, date, bookedSlotIds = [], paymentStatus, setPaymentStatus }) {
  const { serviceId } = useParams();

  const [showModal, setShowModal] = useState(false);

  // fetch slots from the backend
  const [slots, setSlots] = useState([]);

  // state to hold selected slots
  const [selectedSlot, setSelectedSlot] = useState(null);

  console.log(paymentStatus)

  useEffect(() => {
    axios
      .get(`https://api.queueless.xyz/api/v1/service/${serviceId}/slots`)
      .then((response) => {
        setSlots(response.data.slots);

        //Reset paymentStaus after successful refresh
      if (paymentStatus === "SUCCESSFUL") {
        localStorage.removeItem("paymentStatus")
        setPaymentStatus(null)
      }
      });
    // eslint-disable-next-line
  }, [serviceId, paymentStatus]);

  // helper function to convert microseconds to readable time
  const formatTime = (microseconds) => {
    const ms = microseconds / 1000;
    const date = new Date(ms);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };


  const handleOpenModal = (slot) => {
    const ms = slot.start_time.Microseconds / 1000;
    const timeOnly = new Date(ms).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format the full date this slot belongs to (from props.date)
    const dateObj = new Date(date); // `date` is already a prop
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const slotWithFormattedDate = {
      ...slot,
      formattedDate: `${formattedDate} at ${timeOnly}`,
    };

    setSelectedSlot(slotWithFormattedDate);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  function extractPgDate(dateObj) {
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      throw new Error("Invalid Date object");
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="slots-container">
      {slots.map((slot) => {
        const [time, description] = formatTime(
          slot.start_time.Microseconds
        ).split(" ");
        let [hour, minute] = time.split(":").map(Number);

        if (description === "PM" && hour < 12) hour += 12;

        //create full datetime for the slot
        const slotDateTime = new Date(date);
        slotDateTime.setHours(hour, minute, 0, 0);

        // save the pgDate and send as prop
        const pgDate = extractPgDate(slotDateTime);

        const isPast = slotDateTime < new Date();
        const isBooked = bookedSlotIds.includes(slot.id);

        return (
          <div key={slot.id} className={`${isPast ? "past-day" : ""} ${isBooked ? "past-day" : ""}`}>
            <div className="slot-button">
              <button onClick={() => handleOpenModal({...slot, pgDate})}>
                {formatTime(slot.start_time.Microseconds)}

              </button>
            </div>
          </div>
        );
      })}

      <Modal
        showModal={showModal} 
        handleCloseModal={handleCloseModal}
        org={org}
        service={service}
        slot={selectedSlot}
        date={selectedSlot?.pgDate}
      />
    </div>
  );
}
