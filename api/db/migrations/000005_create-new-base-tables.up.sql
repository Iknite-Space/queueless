

-- 1. Organizations Table
CREATE TABLE organizations (
    organization_id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    name VARCHAR NOT NULL UNIQUE,
    location VARCHAR,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- 2. Services Table
CREATE TABLE services (
    service_id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    organization_id VARCHAR(36) NOT NULL,
    service_name VARCHAR NOT NULL,
    service_description TEXT,
    duration INT NOT NULL, -- Duration in minutes

    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);
