import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./ServiceSlots.css";
import { useParams } from "react-router";

import Modal from "./Modal";

ServiceSlots.propTypes = {
  org: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  
};

export function ServiceSlots({ org, service, date}) {

  const { serviceId } = useParams();

  const [showModal, setShowModal] = useState(false);

  // fetch slots from the backend
  const [slots, setSlots] = useState([]);

  // state to hold selected slots
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.queueless.xyz/api/v1/service/${serviceId}/slots`)
      .then((response) => {
        setSlots(response.data.slots);
      });
  }, [serviceId]);

  // helper function to convert microseconds to readable time
  const formatTime = (microseconds) => {
    const ms = microseconds / 1000;
    const date = new Date(ms);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  // const navigate = useNavigate();


  // const handleClickSlot = () => {
  //   navigate("/input");
  //   setShowModal(true);

  // };

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


  return (
    <div className="slots-container">
      {slots.map((slot) => (
        <div key={slot.id} className="slot-button">
          <button onClick={() => handleOpenModal(slot)}>
            {formatTime(slot.start_time.Microseconds)}
          </button>
        </div>
      ))}


      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        org={org}
        service={service}
        slot={selectedSlot}
      />

    </div>
  );
}
