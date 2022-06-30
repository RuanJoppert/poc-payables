CREATE OR REPLACE FUNCTION cached_balance_table_by_status(
  query_company_id character varying,
  query_recipient_id character varying,
  query_status character varying
)
RETURNS SETOF cached_balance_entry
LANGUAGE plpgsql STABLE AS $$
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
      ( recipient_id = query_recipient_id )                            AND
      ( status = query_status )
  ) LOOP

    operations := get_balance_operations(selected_balance.company_id,
                                          selected_balance.recipient_id,
                                          selected_balance.status,
                                          selected_balance.last_id);

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
