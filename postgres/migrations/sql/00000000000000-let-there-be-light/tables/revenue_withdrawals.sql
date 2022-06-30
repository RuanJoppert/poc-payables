CREATE TABLE "RevenueWithdrawals" (
  id         SERIAL PRIMARY KEY,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  amount     integer NOT NULL
);
