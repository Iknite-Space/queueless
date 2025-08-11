import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./OrganizationCard.css";
import { useNavigate } from "react-router";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import SearchBar from "../../components/Search/SearchBar";

// Extended PropTypes to support imageUrl and serviceDuration
Cards.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

function Cards({ imageUrl, name, location }) {
  return (
    <div className="org-card">
    <div className="org-image-wrapper">
      <img src={imageUrl !== "" ? imageUrl : null} alt={`${name}-logo`} />
      </div>
 <div className="org-details">
      <h2 className="organization-name">{name}</h2>
      <p className="organization-location">{location}</p>
 </div>

    </div>
  );
}

function OrganizationCard() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch("https://api.queueless.xyz/api/v1/organizations");
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Status: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        setOrganizations(data.organizations);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchOrganizations();
  }, []);

  const filteredOrgs = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="organization-page">
      <h1 className="page-title">Featured Organizations</h1>

      {/* Search bar with icon */}
       <div className="search-container">
         <SearchBar/>
        <input
          type="text"
          placeholder="Search organization..."
value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="org-search-bar"
        />
      </div>
      <div className="organization-grid">
        {isLoading ? (
          <LoadingAnimation name="organizations" />
        ) : filteredOrgs.length > 0 ? (
          filteredOrgs.map((org) => (
            <div
              key={org.organization_id}
              onClick={() =>
                navigate(`/${org.organization_id}/services`, { state: org })
              }
            >
              <Cards
              imageUrl={org.image_url}
              name={org.name}
              location={org.location}
            />
            </div>
          ))
        ) : (
          <p>No organizations found.</p>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="pagination-buttons">
        <button className="nav-button">Previous</button>
        <button className="nav-button">Next</button>
      </div>
    </div>
  );
}

export default OrganizationCard;
