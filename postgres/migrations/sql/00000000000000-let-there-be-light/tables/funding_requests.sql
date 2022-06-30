CREATE TYPE "enum_FundingRequests_status" AS ENUM (
  'pending',
  'partially_available',
  'available'
);

CREATE TABLE "FundingRequests" (
  id                SERIAL PRIMARY KEY,
  status            "enum_FundingRequests_status" DEFAULT 'pending'::"enum_FundingRequests_status",
  availability_date timestamp with time zone,
  created_at        timestamp with time zone NOT NULL,
  updated_at        timestamp with time zone NOT NULL
);

CREATE INDEX funding_requests_status ON "FundingRequests" USING btree (status);
