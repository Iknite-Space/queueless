import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import "./ServicesPage.css";

import { useNavigate, useParams, useLocation } from "react-router";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import SearchBar from "../../components/Search/SearchBar";

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
        <p className="card-duration">{duration} Minutes</p>
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
  const { org, organizations } = location.state;

  // State to store the list of services retrieved from the API
  const [selectedOrg, setselectedOrg] = useState(org);
  const [selectedOrgId, setselectedOrgId] = useState(orgId);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `https://api.queueless.xyz/api/v1/organizations/${selectedOrgId}/services`
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Status: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        setServices(data.services);
      } catch (error) {
        console.error(
          `Failed to fetch services for ${selectedOrg.name}:`,
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [selectedOrgId, selectedOrg.name]);

  const filteredServices = services.filter((service) =>
    service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the service cards inside a responsive container
  return (
    <div className="service-page"> 
      <div className="service-page-info">
        <h1 className="service-page-title">{selectedOrg.name} Services</h1>
        <form action="">
          <select
            className="custom-select"
            name="organizations"
            id="organizations"
            value={selectedOrg.organization_id}
            onChange={(e) => {
              const orgIdValue = e.target.value;
              setselectedOrgId(orgIdValue);
              const foundOrg = organizations.find(
                (organization) =>
                  organization.organization_id.toString() === orgIdValue
              );
              if (foundOrg) {
                setselectedOrg(foundOrg);
              }
            }}
          >
            {organizations.map((organization) => {
              return (
                <option
                  key={organization.organization_id}
                  value={organization.organization_id}
                >
                  {organization.name}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <SearchBar
        placeholder="Search a service..."
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <div className="services-grid">
        {isLoading ? (
          <LoadingAnimation name={`${org.name}'s services`} />
        ) : filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            // Pass each service's data to the ServiceCard component
            <div
              key={service.service_id}
              onClick={() =>
                navigate(`/service/${service.service_id}/slots`, {
                  state: { org: selectedOrg, service },
                })
              }
            >
              <ServiceCard
                name={service.service_name}
                description={service.service_description}
                duration={service.duration}
              />
            </div>
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
}
export default ServicesPage;
