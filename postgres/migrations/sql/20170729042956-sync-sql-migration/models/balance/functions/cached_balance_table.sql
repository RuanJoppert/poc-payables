CREATE OR REPLACE FUNCTION cached_balance_table(
  query_company_id character varying,
  query_recipient_id character varying
)
RETURNS SETOF cached_balance_entry
LANGUAGE plpgsql AS $$
DECLARE
  operations       RECORD;
  selected_balance RECORD;
  balance          cached_balance_entry;
BEGIN
  FOR selected_balance IN (
    SELECT *
    FROM "Balances"
    WHERE
      ( company_id   = query_company_id OR query_company_id = '_all' ) AND
      ( recipient_id = query_recipient_id )
  ) LOOP

    SELECT
      COALESCE( MAX(bo.id), selected_balance.last_id ) AS max_id,
      COALESCE( SUM(bo.amount), 0)                     AS amount,
      COALESCE( SUM(bo.fee),    0)                     AS fee
    INTO operations
    FROM "BalanceOperations" AS bo
    WHERE
      (selected_balance.recipient_id = bo.recipient_id OR query_recipient_id = '_all') AND
      selected_balance.company_id    = bo.company_id                                   AND
      selected_balance.status        = bo_status_to_varchar(bo.status)                 AND
      selected_balance.last_id       < bo.id;

    balance.id           = selected_balance.id;
    balance.last_id      = operations.max_id;
    balance.previous_id  = selected_balance.last_id;
    balance.fee          = selected_balance.fee    + operations.fee;
    balance.amount       = selected_balance.amount + operations.amount;
    balance.status       = selected_balance.status;
    balance.company_id   = selected_balance.company_id;
    balance.recipient_id = selected_balance.recipient_id;

    RETURN NEXT balance;
  END LOOP;

  RETURN;
END
$$;
