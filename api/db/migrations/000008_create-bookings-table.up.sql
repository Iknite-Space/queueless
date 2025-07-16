-- CREATE TABLE payments (
--     payment_id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
--     customer_name VARCHAR NOT NULL,
--     email VARCHAR,
--     phone_number TEXT NOT NULL,
--     service_id VARCHAR(36) NOT NULL,
--     slot_id VARCHAR(36) NOT NULL,
--     date DATE NOT NULL,
--     amount NUMERIC(10,2) NOT NULL,
--     status TEXT NOT NULL DEFAULT 'pending',
--     transaction_ref TEXT NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT now(),

    
--     -- FOREIGN KEY (service_id) REFERENCES services(service_id),
--     -- FOREIGN KEY (slot_id) REFERENCES service_slot_templates(id)
-- );


CREATE TABLE bookings (
    booking_id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    payment_id VARCHAR(36) NOT NULL UNIQUE, -- every booking must be tied to a successful payment
    customer_name VARCHAR NOT NULL,
    service_id VARCHAR(36) NOT NULL,
    slot_id VARCHAR(36) NOT NULL,
    booking_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'booked',

    UNIQUE (slot_id, booking_date),
    -- FOREIGN KEY (payment_id) REFERENCES payments(payment_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id),
    FOREIGN KEY (slot_id) REFERENCES service_slot_templates(id)
);
