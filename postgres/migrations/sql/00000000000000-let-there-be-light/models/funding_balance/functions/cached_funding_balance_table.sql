CREATE OR REPLACE FUNCTION cached_funding_balance_table()
RETURNS SETOF cached_funding_balance_entries
LANGUAGE plpgsql AS $$
DECLARE
  operations      RECORD;
  funding_balance RECORD;
  balance         cached_funding_balance_entries;
BEGIN
  FOR funding_balance IN (SELECT * FROM "FundingBalances") LOOP
    balance.status = funding_balance.status;

    SELECT
      max(id)     AS max_id,
      sum(amount) AS amount,
      sum(cost)   AS cost
    INTO operations
    FROM "FundingBalanceOperations"
    WHERE status = funding_balance.status AND id > funding_balance.last_id
    GROUP BY status;

    IF NOT FOUND THEN
      balance.amount = funding_balance.amount;
      balance.cost   = funding_balance.cost;
    ELSE
      balance.amount = funding_balance.amount + operations.amount;
      balance.cost   = funding_balance.cost   + operations.cost;
      UPDATE "FundingBalances" SET (last_id, amount, cost) = (operations.max_id, balance.amount, balance.cost) WHERE id = funding_balance.id;
    END IF;

    RETURN NEXT balance;

  END LOOP;

  FOR operations IN (
    SELECT
      max(id)     AS max_id,
      status      AS status,
      sum(amount) AS amount,
      sum(cost)   AS cost
    FROM "FundingBalanceOperations" AS fbo
    WHERE status NOT IN (SELECT DISTINCT status FROM "FundingBalances") 
    GROUP BY status
  ) LOOP
    INSERT INTO "FundingBalances" (status, amount, cost, last_id) VALUES (operations.status, operations.amount, operations.cost, operations.max_id);

    balance.status = operations.status;
    balance.amount = operations.amount;
    balance.cost   = operations.cost;
    RETURN NEXT balance;
  END LOOP;

  RETURN;
END
$$;
