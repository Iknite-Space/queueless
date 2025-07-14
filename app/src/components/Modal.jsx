import React, { useState } from "react";
import CustomerInput from "./CustomerInput";

function Modal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <button type="button" onClick={toggleModal}>
        Open modal
      </button>

      {modalIsOpen && <CustomerInput setModalIsOpen={setModalIsOpen} />}
    </>
  );
}

export default Modal;
