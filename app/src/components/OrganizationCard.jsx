import React, { useEffect, useState } from 'react';
import './OrganizationCard.css';

function OrganizationCard() {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await fetch('localhost:8085/api/v1/organizations');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrganizations(data); // Set the fetched data
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations(); // Call the fetch function
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="organization-cards">
            {organizations.map((org, index) => (
                <div key={index} className="organization-card">
                    <h2 className="organization-name">{org.name}</h2>
                    <p className="organization-location">{org.location}</p>
                </div>
            ))}
        </div>
    );
}

export default OrganizationCard;