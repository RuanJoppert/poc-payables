-- TODO: Think about it, maybe it's not desired and broken
CREATE OR REPLACE FUNCTION balances_refresh_balance()
RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM "Balances";
  RETURN NULL;
END;
$$;
