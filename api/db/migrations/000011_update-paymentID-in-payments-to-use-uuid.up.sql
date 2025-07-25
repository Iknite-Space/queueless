-- 4. Add new column
ALTER TABLE payments 
ALTER COLUMN payment_id SET DEFAULT gen_random_uuid()::varchar(36);
