
import React from 'react';
import './OrganizationCard.css';

function OrganizationCard() {
    const organizations = [
        { name: 'MTN-BUEA', location: 'Molyko' },
        { name: 'ECOBANK-BUEA', location: 'Malingo' },
    ];

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