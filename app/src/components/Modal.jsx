import React, { useState } from "react";
import CustomerInput from "./CustomerInput";


function Modal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      {modalIsOpen && <CustomerInput setModalIsOpen={setModalIsOpen} />}


      <button type="button" onClick={toggleModal} className="navigation-button">

        Open modal
      </button>

    </>
  );
}

export default Modal;
