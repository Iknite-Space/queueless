import React from "react";


import CustomerInput from "../customerInput/CustomerInput";
import './Modal.css'

import PropTypes from 'prop-types';

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired, 
  showModal: PropTypes.func.isRequired, 
  org: PropTypes.func.isRequired, 
  service: PropTypes.func.isRequired, 
  slot: PropTypes.func.isRequired,
  date: PropTypes.func.isRequired, 
};

function Modal({showModal, handleCloseModal, org, service, slot, date}) {
  return (
    <>
      <div 
        className={`modal-overlay nput-background ${showModal ? 'modal-show' : ''}`}
        onClick={handleCloseModal}   
      >
        <div className="modal-content"
         onClick={(e) => e.stopPropagation()}
        >
          <CustomerInput handleCloseModal={handleCloseModal} org={org} service={service} slot={slot} date={date}/>
        </div>
      </div>
    </>
  );
}

export default Modal;
