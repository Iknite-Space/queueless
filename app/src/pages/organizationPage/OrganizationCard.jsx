import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./OrganizationCard.css";
import { useNavigate } from "react-router";

Cards.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

function Cards({ name, location }) {
  return (
    <div className="org-card">
      <h2 className="organization-name">{name}</h2>
      <p className="organization-location">{location}</p>
    </div>
  );
}

function OrganizationCard() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
      const fetchOrganizations = async () => {
        try {
          const res = await fetch(
            "https://api.queueless.xyz/api/v1/organizations"
          );

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await res.json();
          setOrganizations(data.organizations);
        } catch (error) {
          console.error("Failed to fetch organizations:", error);
        }
      };

      fetchOrganizations();
    }, []);


  return (
    <div className="organization-grid">
      {organizations.length > 0 ? (
        organizations.map((org) => (
          //  <div key={org.organization_id}>
          //     <h2>{org.name}</h2>
          //     <p>{org.location}</p>
          //   </div>
          <div
            key={org.organization_id}
            onClick={() =>
              navigate(`/${org.organization_id}/services`, { state : org})
            }
          >
            <Cards name={org.name} location={org.location} />
          </div>
        ))
      ) : (
        <p>No organizations found.</p>
      )}
    </div>
  );
}

export default OrganizationCard; // Ensure this is a default export
