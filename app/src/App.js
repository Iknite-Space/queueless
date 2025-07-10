
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import './App.css';
import { ComingSoonPage } from './components/ComingSoonPage';
<<<<<<< HEAD
import ServicePage from './components/ServicesPage';

=======
import React from 'react';
>>>>>>> 0c206ee5006780bd088da03925c3af0073e0e652



function App() {
  return (
 <>
    <Router>
      <Routes>
        {/* 👤 Default landing or placeholder */}
        <Route path="/" element={<ComingSoonPage />} />

        {/* 🎨 Design Reference Screen */}
        <Route path="/services" element={<ServicePage />} />

        {/* 🔒 Add admin/guest routes below as needed */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/organizations" element={<ServicesPage />} /> */}
      </Routes>
    </Router>

    </>
  );
}

export default App;
