import React from "react";
import CustomerInput from "./CustomerInput";


function Modal() {
  return (
    <>
      <div className="modal-overlay input-background">
        <div className="modal-content">
          <CustomerInput />
        </div>
      </div>
    </>
  );
}

export default Modal;
