import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ServiceSlots.css";
import { useParams } from "react-router";
import Modal from "./Modal";
export function ServiceSlots() {
  const { serviceId } = useParams();

  const [showModal, setShowModal] = useState(false);

  // fetch slots from the backend
  const [slots, setSlots] = useState([]);

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

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  return (
    <div className="slots-container">
      {slots.map((slot) => (
        <div key={slot.id} className="slot-button">
          <button onClick={handleOpenModal}>
            {formatTime(slot.start_time.Microseconds)}
          </button>
        </div>
      ))}

      <Modal showModal={showModal} handleCloseModal={handleCloseModal}  />
    </div>
  );
}
