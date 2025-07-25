
-- name: CreateService :one
INSERT INTO services (
    organization_id, service_name, service_description, duration
) VALUES (
    $1, $2, $3, $4
)
RETURNING service_id;

-- name: GetOrganizations :many
SELECT * FROM organizations;

-- name: GetServicesByOrganization :many
SELECT * FROM services
WHERE organization_id = $1;

-- name: GetServiceWithOrgTimes :one
SELECT s.service_id, s.duration, o.start_time, o.end_time
FROM services s
JOIN organizations o ON s.organization_id = o.organization_id
WHERE s.service_id = $1;

-- name: InsertSlotTemplate :exec
INSERT INTO service_slot_templates (
    service_id, start_time, end_time
) VALUES ($1, $2, $3)
ON CONFLICT (service_id, start_time) DO NOTHING;

-- name: GetServiceSlots :many
SELECT 
    id,
    service_id,
    start_time,
    end_time
FROM service_slot_templates
WHERE service_id = $1
ORDER BY start_time;

-- name: GetPaymentByID :one
SELECT * 
FROM payments 
WHERE payment_id = $1;

-- -- name: UpdatePaymentStatus :exec
-- UPDATE payments 
-- SET 
--     status = $2,
--     transaction_ref = $3
-- WHERE payment_id = $1;

-- name: CreateBooking :exec
INSERT INTO bookings (
    booking_id, payment_id, booking_date, status
) VALUES ($1, $2, $3, $4);

-- name: GetSearchResults :many
-- SELECT * FROM services WHERE service_name ILIKE '%' || $1 || '%';

-- Search services.name
SELECT 'services' AS source, service_id, service_name AS value
FROM services
WHERE to_tsvector(service_name) @@ websearch_to_tsquery($1)

UNION ALL

-- Search organisations.email
SELECT 'organizations' AS source, organization_id, name AS value
FROM organizations
WHERE to_tsvector(name) @@ websearch_to_tsquery($1);

-- name: CreatePayment :one
INSERT INTO payments (
    cus_name,
    cus_email,
    phone_number,
    date,
    service_id,
    slot_id,
    amount,
    status,
    transaction_ref
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
)
RETURNING *;


-- name: UpdatePaymentStatus :exec
UPDATE payments
SET status = $1
WHERE transaction_ref = $2;

-- -- name: GetPaymentStatusByID :one
-- SELECT status
-- FROM payments
-- WHERE payment_id = $1;



