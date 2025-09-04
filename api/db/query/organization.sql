
-- name: CreateOrganization :one
INSERT INTO organizations (
     name, location, start_time, end_time, email, image_url
) VALUES (
    $1, $2, $3, $4, $5, $6
)
RETURNING *;

-- name: UpdateOrganizationData :one
UPDATE organizations
SET name = $1, location = $2, start_time = $3, end_time = $4, image_url = $5
WHERE email = $6
RETURNING *;

-- name: CreateService :one
INSERT INTO services (
    organization_id, service_name, service_description, duration
) VALUES (
    $1, $2, $3, $4
)
RETURNING service_id;

-- name: GetOrganizations :many
SELECT organization_id, name, location, COALESCE(image_url, '') AS image_url, start_time, end_time FROM organizations
WHERE name <> '';

-- name: GetOrganizationData :one
SELECT organization_id, name, location, COALESCE(image_url, '') AS image_url, start_time, end_time, email FROM organizations
WHERE email = $1;

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

-- name: GetSearchResults :many
SELECT * FROM services WHERE service_name ILIKE '%' || $1 || '%';

-- -- Search services.name
-- SELECT 'services' AS source, service_id, service_name AS value
-- FROM services
-- WHERE to_tsvector(service_name) @@ websearch_to_tsquery($1)

-- UNION ALL

-- -- Search organisations.email
-- SELECT 'organizations' AS source, organization_id, name AS value
-- FROM organizations
-- WHERE to_tsvector(name) @@ websearch_to_tsquery($1);

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

-- name: GetBookingsInDateRange :many
SELECT slot_id, booking_date
FROM bookings
WHERE service_id = $1
  AND booking_date BETWEEN $2 AND $3;

-- name: CreateBooking :one
INSERT INTO bookings (payment_id, service_id, slot_id, booking_date, status) VALUES ($1,$2,$3,$4,$5)
RETURNING *;

-- name: GetOrganizationBookings :many
SELECT 
  o.organization_id,
  b.booking_id, 
  b.booking_date, 
  p.cus_name, 
  p.cus_email, 
  p.phone_number,
  s.service_name, 
  st.start_time
FROM bookings b 
LEFT JOIN payments p 
  ON b.payment_id = p.payment_id 
LEFT JOIN services s 
  ON s.service_id = p.service_id
LEFT JOIN service_slot_templates st 
  ON st.id = p.slot_id
LEFT JOIN organizations o
  ON o.organization_id = s.organization_id
WHERE o.organization_id = $1;
