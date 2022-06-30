CREATE OR REPLACE FUNCTION fundingbalances_refresh_funding_balance()
RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE "FundingBalances" SET (amount, cost, last_id) = (0, 0, 0);
  RETURN NULL;
END;
$$;
