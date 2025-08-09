import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { LandingPage } from "./pages/landingPage/LandingPage";
import ServicesPage from "./pages/servicePage/ServicesPage";

import { ServiceSlotsPage } from "./pages/slotsPage/ServiceSlotsPage";
import OrganizationCard from "./pages/organizationPage/OrganizationCard";
import { ContactUs } from "./pages/ContactUsPage/ContactUs";

import { Authentication } from "./components/Authentication/Authentication";
import OrganizationDashboard from "./pages/OrganizationHomePage/Dashboard";
import { CreateServiceComponent } from "./components/CreateServiceComponent/CreateServiceComponent";
import Footer from "./components/footer/Footer";
import About from "./components/aboutUs/About";

function App() {
  return (
    <div className="app-layout">
      <Router>
        <div className="page-content">
        <Routes>
          {/*  Default landing or placeholder */}
          <Route path="/" element={<LandingPage />} />

          {/* organizations screen */}
          <Route path="/organizations" element={<OrganizationCard />} />

          {/*  service  Screen */}
          <Route path="/:orgId/services" element={<ServicesPage />} />

          <Route
            path="/service/:serviceId/slots"
            element={<ServiceSlotsPage />}
          />
          {/*  input  Screen */}
          {/* <Route path="/input" element={<CustomerInput />} /> */}

          <Route path="/contact" element={<ContactUs />} />

          <Route path="/login" element={<Authentication />} />
          <Route path="/organization//*" element={<OrganizationDashboard />} />
          <Route path="/create-service" element={<CreateServiceComponent />} />
        </Routes>
        </div>
        <Footer />
      </Router>

    </div>

  );
}

export default App;
