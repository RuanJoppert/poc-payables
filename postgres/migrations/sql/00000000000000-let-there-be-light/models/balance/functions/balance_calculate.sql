CREATE OR REPLACE FUNCTION balance_calculate(
  query_recipient_id character varying,
  query_company_id   character varying,
  statuses           character varying[]
)
RETURNS SETOF balance_entry
LANGUAGE plpgsql AS $$
DECLARE
  cached_balance     RECORD;
  aggregated_balance balance_entry;
BEGIN
  FOR cached_balance IN (

    SELECT
      COALESCE(sum(balance.amount) - sum(balance.fee), 0) AS amount,
      status_candidate                                    AS status
    FROM      unnest(statuses)                                           AS status_candidate
    LEFT JOIN cached_balance_table(query_company_id, query_recipient_id) AS balance
      ON status_candidate = balance.status
    GROUP BY
      status_candidate

  ) LOOP

    aggregated_balance.amount = cached_balance.amount;
    aggregated_balance.status = cached_balance.status;
    RETURN NEXT aggregated_balance;
  END LOOP;

  RETURN;
END
$$;
