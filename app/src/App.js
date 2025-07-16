import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { ComingSoonPage } from "./components/ComingSoonPage";
import ServicesPage from "./components/ServicesPage";
import CustomerInput from "./components/CustomerInput";

import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*  Default landing or placeholder */}
          <Route path="/" element={<ComingSoonPage />} />

          {/*  service  Screen */}
          <Route path="/services" element={<ServicesPage />} />

          {/*  input  Screen */}
          <Route path="/input" element={<CustomerInput />} />

          <Route path="/modal" element={<Modal />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
