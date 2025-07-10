-- service_slot_template Table
CREATE TABLE service_slot_templates (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    service_id VARCHAR(36) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    UNIQUE (service_id, start_time)
);
