
import React, { useEffect, useState } from 'react';

function OrganizationCard (){
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8085/api/v1/organizations")
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => setOrganizations(data.organizations))
            .catch((error) => {
                console.error("Failed to fetch organizations:", error);
            });
    }, []);

    return (
        <div>
            {organizations.length > 0 ? (
                organizations.map((org) => (
                    <div key={org.organization_id}>
                        <h2>{org.name}</h2>
                        <p>{org.location}</p>
                    </div>
                ))
            ) : (
                <p>No organizations found.</p>
            )}
        </div>
    );
};

export default OrganizationCard; // Ensure this is a default export