// import "../styles/ServicePage.css";

// function ServiceInfo(){
//   return <>

//   </>
// }

// function ServicePage() {


//   return <div className="service-list-container">
//     <div className="list-of-services">
//       <h3>Service 01</h3>
//       <p> This is the description for the service 1 for this organization</p>
//     </div>
//   </div>;
// }

// export default ServicePage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ServicesPage.css'; // Your custom style sheet



const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setServices([]);
      });
  }, []);

  const handleSelect = (service) => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    navigate("/slots");
  };

  return (
    <section className="servicesContainer">
      <h1 className="servicesTitle">Available Services</h1>
      <div className="servicesGrid">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              className="serviceCard"
              onClick={() => handleSelect(service)}
            >
              <h2 className="serviceName">{service.name}</h2>
              <p className="serviceDescription">{service.description}</p>
            </div>
          ))
        ) : (
          <p className="emptyMessage">
            No services found. Please try again later.
          </p>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
