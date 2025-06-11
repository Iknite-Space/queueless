CREATE TABLE "customers" (
  "customer_id" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
  "name" VARCHAR NOT NULL,
  "phone_number" VARCHAR NOT NULL,
  "email" VARCHAR
);


CREATE TABLE "organizations" (
  "organization_id" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
  "name" VARCHAR NOT NULL,
  "location" VARCHAR NOT NULL,
  "start_time" TIME NOT NULL,
  "end_time" TIME NOT NULL
);


CREATE TABLE "officers" (
  "officer_id" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
  "title" VARCHAR NOT NULL,
  "organization_id" VARCHAR(36) NOT NULL REFERENCES "organizations"("organization_id")
);


CREATE TABLE "services" (
  "service_id" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
  "officer_id" VARCHAR(36) NOT NULL REFERENCES "officers"("officer_id"),
  "service_name" VARCHAR NOT NULL,
  "time_to_serve" TIME NOT NULL,
  "service_description" TEXT
);


CREATE TABLE "queues" (
  "queue_id" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
  "officer_id" VARCHAR(36) NOT NULL REFERENCES "officers"("officer_id")
);


CREATE TABLE "tokens" (
  "token_id" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
  "queue_id" VARCHAR(36) NOT NULL REFERENCES "queues"("queue_id"),
  "service_time" TIME NOT NULL
);
