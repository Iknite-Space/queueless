import React from "react";


import { WeekHeader } from "../../components/weekHeaders/WeekHeader";
// import {DatePicker} from './DatePicker'
import Header from '../../components/header/Header'
import "./ServiceSlotsPage.css";

import Modal from "../../components/customerInputModal/Modal";
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
    <Header />
      <div className="slot-page-container">
        {/* <div className="calendar">
          <DatePicker />
        </div> */}

        <WeekHeader />
      </div>

      <Modal />
    </>
  );
}
