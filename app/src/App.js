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
import HeaderLayout from "./components/layouts/HeaderLayout";
import PlainLayout from "./components/layouts/PlainLayout";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="app-layout">
      <Router>
        <div className="page-content">
          <Routes>
            {/* Routes that contain the main header */}
            <Route element={<HeaderLayout />}>
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
            </Route>

            <Route element={<PlainLayout/>}>
              <Route path="/contact" element={<ContactUs />} />

              <Route
                path="/organization//*"
                element={<OrganizationDashboard />}
              />
              <Route
                path="/create-service"
                element={<CreateServiceComponent />}
              />
            </Route>
              <Route path="/login" element={<Authentication />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
