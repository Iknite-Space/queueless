
ALTER TABLE bookings
ALTER COLUMN booking_id SET DEFAULT gen_random_uuid()::varchar(36);
