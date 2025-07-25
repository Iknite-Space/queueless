import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";


import "./ServicesPage.css";

import { useNavigate, useParams, useLocation } from "react-router";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";

ServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  duration: PropTypes.node.isRequired,
};

// src/components/ServiceCard.jsx
function ServiceCard({ name, description, duration }) {
  
  return (
    <>
      <div className="card">
        <h3 className="card-name">{name}</h3>
        <p className="card-description">{description}</p>
        <p className="card-duration">{duration} Mins</p>
      </div>
    </>
  );
}

// Component to display a list of services fetched from the backend
function ServicesPage() {
  // useParams to read the org id
  const { orgId } = useParams();
  const navigate = useNavigate(); 

  const location = useLocation();
  const  org  = location.state;

  // State to store the list of services retrieved from the API
  const [services, setServices] = useState([]);

  // useEffect runs once when the component mounts
  useEffect(() => {
            // Fetch service data from the backend
    fetch(`https://api.queueless.xyz/api/v1/organizations/${orgId}/services`)
      .then((response) => {
            // If the response is not OK, throw an error to catch it later
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the response body as JSON
        return response.json();
      })
      .then((data) => {
        // Set the fetched data into the services state
            setServices(data.services);
      })
      .catch((err) => {
        // Log any error that occurs during the fetch process
        console.error("Error fetching services:", err);
      });
  }, [orgId]); // Empty dependency array means this runs only once when the component loads

  // Render the service cards inside a responsive container
  return (
    <div className="services-grid">

    {services.length > 0 ? (
      services.map((service) => (
        // Pass each service's data to the ServiceCard component
        <div
          key={service.service_id}
          onClick={() => navigate(`/service/${service.service_id}/slots`, { state: {org, service}})}
        >
          <ServiceCard
            name={service.service_name}
            description={service.service_description}
            duration={service.duration}
          />
        </div>
      ))
    ):(<>
      <LoadingAnimation name={services}/>
   </> )}
    </div>
  );
}

export default ServicesPage;
