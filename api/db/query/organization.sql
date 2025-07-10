
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
