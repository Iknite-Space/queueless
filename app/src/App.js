

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import './App.css';

import { ComingSoonPage } from './components/ComingSoonPage';

import ServicePage from './components/ServicesPage';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ComingSoonPage />} />
                    <Route path="/cards" element={<OrganizationCard />} />
                     
        <Route path="/services" element={<ServicePage />} />

                </Routes>
            </div>
        </Router>
    );
  }


export default App;