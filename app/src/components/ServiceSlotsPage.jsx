import React from "react";

import { WeekHeader } from "./WeekHeader";
import { DatePicker } from "./DatePicker";
import "./ServiceSlotsPage.css";

import Modal from "./Modal";
// function Modal() {
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const toggleModal = () =>{
//     setModalIsOpen(true)
//   }

//   setModalIsOpen(true);

//   return (
//     <>
//     {modalIsOpen && <CustomerInput setModalIsOpen={setModalIsOpen} />}

//           <button type="button" onClick={toggleModal} className="navigation-button">
//         Open modal
//       </button>
//       </>
//   );
// }

export function ServiceSlotsPage() {
  return (
    <>
      <div className="slot-page-container">
        {/* <div className="title">
        <h1>Select an appointment time</h1>
        <h2>MTN Molyko</h2>
        <h3>Sim card registrations</h3>
      </div>
       */}
        <div className="calendar">
          <DatePicker />
        </div>

        <WeekHeader />
      </div>

      <Modal />

    </>
  );
}
