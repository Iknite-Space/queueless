import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';


import { ComingSoonPage } from './components/ComingSoonPage';
import ServicesPage from './components/ServicesPage'; 
import OrganizationCard from './components/OrganizationCard';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ComingSoonPage />} />
                    <Route path="/organizations" element={<OrganizationCard />} />
                    <Route path="/services" element={<ServicesPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;