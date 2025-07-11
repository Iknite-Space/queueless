

-- Insert into organizations
INSERT INTO organizations (name, location, start_time, end_time)
VALUES
    ('MTN UB Junction', 'UB Junction, Buea', '08:00:00', '17:00:00'),
    ('Ecobank UB Junction', 'UB Junction, Buea', '08:30:00', '16:00:00'),
    ('DO''s Office Buea Town', 'Buea Town', '09:00:00', '15:00:00');

-- Insert into services (assumes the above organization IDs are known or retrieved)
-- If you're using manual UUIDs, you can provide them here directly.

-- We'll fetch organization_id dynamically using subqueries based on unique org names.

-- Services for MTN UB Junction
INSERT INTO services (organization_id, service_name, service_description, duration)
VALUES
    (
        (SELECT organization_id FROM organizations WHERE name = 'MTN UB Junction'),
        'SIM Registration',
        'Register or update SIM card information',
        15
    ),
    (
        (SELECT organization_id FROM organizations WHERE name = 'MTN UB Junction'),
        'Mobile Money Services',
        'Send, receive, or withdraw MTN Mobile Money',
        10
    );

-- Services for Ecobank UB Junction
INSERT INTO services (organization_id, service_name, service_description, duration)
VALUES
    (
        (SELECT organization_id FROM organizations WHERE name = 'Ecobank UB Junction'),
        'Open Bank Account',
        'Create a savings or current account',
        20
    ),
    (
        (SELECT organization_id FROM organizations WHERE name = 'Ecobank UB Junction'),
        'ATM Card Replacement',
        'Request a replacement for your lost or expired ATM card',
        15
    );

-- Services for DO's Office Buea Town
INSERT INTO services (organization_id, service_name, service_description, duration)
VALUES
    (
        (SELECT organization_id FROM organizations WHERE name = 'DO''s Office Buea Town'),
        'Certificate of Residence',
        'Obtain a residence certificate',
        25
    ),
    (
        (SELECT organization_id FROM organizations WHERE name = 'DO''s Office Buea Town'),
        'Document Attestation',
        'Get official documents attested',
        20
    );
