
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { ComingSoonPage } from "./components/ComingSoonPage";
import ServicesPage from "./components/ServicesPage";
import CustomerInput from "./components/CustomerInput";

import {ServiceSlotsPage} from "./components/ServiceSlotsPage";
import Modal from "./components/Modal";
import OrganizationCard from './components/OrganizationCard';



function App() {

  return (
    <>
      <Router>
        <Routes>
          {/*  Default landing or placeholder */}
          <Route path="/" element={<ComingSoonPage />} />

      {/* organizations screen */}
<Route path="/organizations" element={<OrganizationCard />} />

          {/*  service  Screen */}
          <Route path="/services" element={<ServicesPage />} />


        <Route path="/service/slots" element={<ServiceSlotsPage />} />
          {/*  input  Screen */}
          <Route path="/input" element={<CustomerInput />} />

          <Route path="/modal" element={<Modal />} />
        </Routes>
      </Router>
    </>
  );

 }

export default App;
