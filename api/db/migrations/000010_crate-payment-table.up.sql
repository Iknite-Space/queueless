
-- Payments table (tracks payment attempts)
CREATE TABLE payments (
    payment_id TEXT PRIMARY KEY,
    cus_name TEXT NOT NULL,
    cus_email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    date DATE NOT NULL,
    service_id TEXT NOT NULL,
    slot_id TEXT NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    status TEXT NOT NULL, -- 'pending', 'completed', 'failed'
    transaction_ref TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1. Drop foreign keys and constraints that will be removed or changed
ALTER TABLE bookings DROP CONSTRAINT bookings_service_id_fkey;
ALTER TABLE bookings DROP CONSTRAINT bookings_slot_id_fkey;
ALTER TABLE bookings DROP CONSTRAINT bookings_payment_id_key;
ALTER TABLE bookings DROP CONSTRAINT bookings_slot_id_booking_date_key;

-- 2. Drop unnecessary columns
ALTER TABLE bookings DROP COLUMN customer_name;
ALTER TABLE bookings DROP COLUMN service_id;
ALTER TABLE bookings DROP COLUMN slot_id;

-- 3. Modify column types and defaults
ALTER TABLE bookings ALTER COLUMN booking_id TYPE TEXT;
ALTER TABLE bookings ALTER COLUMN booking_id DROP DEFAULT;

ALTER TABLE bookings ALTER COLUMN payment_id TYPE TEXT;
-- Add foreign key constraint to payments
ALTER TABLE bookings ADD CONSTRAINT bookings_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES payments(payment_id);

-- 4. Add new column
ALTER TABLE bookings ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
