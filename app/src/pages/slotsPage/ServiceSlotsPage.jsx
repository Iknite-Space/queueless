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

      <section className="about-section">
        <h2 className="about-title">Who We Are</h2>
        <p className="about-description">
          We’re a passionate team dedicated to making service booking fast,
          easy, and stress-free. Whether you are scheduling a visit or managing
          appointments, we’re here to simplify the process.
        </p>

        <div className="about-highlights">
          <div className="highlight-box">
            <h3>⏱️ Fast Booking</h3>
            <p>Reserve your spot in seconds.</p>
          </div>
          <div className="highlight-box">
            <h3>🤝 Trusted Partners</h3>
            <p>Working with verified organizations.</p>
          </div>
          <div className="highlight-box">
            <h3>📍 Local Impact</h3>
            <p>Serving communities across Cameroon.</p>
          </div>
        </div>
      </section>
    </>
  );
}
