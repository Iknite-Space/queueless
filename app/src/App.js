import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';


import { ComingSoonPage } from './components/ComingSoonPage';
import ServicesPage from './components/ServicesPage'; 
import OrganizationCard from './components/OrganizationCard';


import ServicesPage from './components/ServicesPage';

function App() {

  return (
 
    <Router>
      <Routes>
        {/*  Default landing or placeholder */}
        <Route path="/" element={<ComingSoonPage />} />

        {/*  service  Screen */}
        <Route path="/services" element={<ServicesPage />} />

                {/* organizations screen */}
        <Route path="/organizations" element={<OrganizationCard />} />

      </Routes>
    </Router>

    );
 }

export default App;