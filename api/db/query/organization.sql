
-- name: GetOrganizations :many
SELECT * FROM organizations;

-- name: GetServicesByOrganization :many
SELECT * FROM services
WHERE organization_id = $1;