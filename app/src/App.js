import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { ComingSoonPage } from "./pages/landingPage/ComingSoonPage";
import ServicesPage from "./pages/servicePage/ServicesPage";

import { ServiceSlotsPage } from "./pages/slotsPage/ServiceSlotsPage";
import OrganizationCard from "./pages/organizationPage/OrganizationCard";
import { ContactUs } from "./pages/ContactUsPage/ContactUs";
// import { OrganizationHomePage } from "./pages/OrganizationHomePage/OrganizationHomePage";
import { Authentication } from "./components/Authentication/Authentication";
import OrganizationDashboard from "./pages/OrganizationHomePage/Dashboard";
import { CreateServiceComponent } from "./components/CreateServiceComponent/CreateServiceComponent";

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
          <Route path="/:orgId/services" element={<ServicesPage />} />

          <Route
            path="/service/:serviceId/slots"
            element={<ServiceSlotsPage />}
          />
          {/*  input  Screen */}
          {/* <Route path="/input" element={<CustomerInput />} /> */}

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Authentication />} />
          {/* <Route path="/home" element={<OrganizationHomePage />} /> */}
          <Route path="/organization//*" element={<OrganizationDashboard />} />
          <Route path="/create-service" element={<CreateServiceComponent />} />
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
