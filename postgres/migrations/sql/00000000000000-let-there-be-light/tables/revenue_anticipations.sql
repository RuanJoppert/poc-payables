CREATE TYPE "enum_RevenueAnticipations_target" AS ENUM (
  'fee',
  'anticipation_fee'
);

CREATE TABLE "RevenueAnticipations" (
  id           SERIAL PRIMARY KEY,
  created_at   timestamp with time zone,
  updated_at   timestamp with time zone,
  payment_date timestamp with time zone NOT NULL,
  target       "enum_RevenueAnticipations_target" NOT NULL
);
