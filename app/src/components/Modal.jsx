import React from "react";
import CustomerInput from "./CustomerInput";
import './Modal.css'

import PropTypes from 'prop-types';

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired, 
  showModal: PropTypes.func.isRequired, 
};

function Modal({showModal, handleCloseModal}) {
  return (
    <>
      <div 
        className={`modal-overlay nput-background ${showModal ? 'modal-show' : ''}`}
        onClick={handleCloseModal}   
      >
        <div className="modal-content"
         onClick={(e) => e.stopPropagation()}
        >
          <CustomerInput handleCloseModal={handleCloseModal} />
        </div>
      </div>
    </>
  );
}

export default Modal;
