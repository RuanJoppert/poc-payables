CREATE TABLE "FundingBalances" (
  id      SERIAL PRIMARY KEY,
  status  "enum_FundingBalanceOperations_status" NOT NULL,
  amount  integer DEFAULT 0 NOT NULL,
  cost    integer DEFAULT 0 NOT NULL,
  last_id integer NOT NULL
);

CREATE INDEX funding_balances_last_id ON "FundingBalances" USING btree (last_id);
CREATE INDEX funding_balances_status  ON "FundingBalances" USING btree (status);
