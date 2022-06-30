CREATE OR REPLACE FUNCTION balance_calculate_by_statuses(
  query_recipient_id character varying,
  query_company_id   character varying,
  statuses           character varying[]
)
RETURNS SETOF balance_entry
LANGUAGE plpgsql STABLE AS $$
DECLARE
  cached_balance     RECORD;
  aggregated_balance balance_entry;
  results            balance_entry[];
  query_status       character varying;
BEGIN
  FOREACH query_status IN ARRAY statuses
  LOOP
    SELECT
      query_status                        AS status,
      COALESCE(SUM(amount) - SUM(fee), 0) AS amount,
      JSON_AGG(
        CASE WHEN last_id != previous_id THEN
          JSON_BUILD_OBJECT(
            'id',          id,
            'last_id',     last_id,
            'previous_id', previous_id,
            'fee',         fee,
            'amount',      amount
          )
        ELSE
          NULL
        END
      ) AS cache_changes
    INTO cached_balance
    FROM cached_balance_table_by_status(query_company_id,
                                        query_recipient_id,
                                        query_status);

    aggregated_balance.amount        = cached_balance.amount;
    aggregated_balance.status        = cached_balance.status;
    aggregated_balance.cache_changes = cached_balance.cache_changes;

    RETURN NEXT aggregated_balance;
  END LOOP;

  RETURN;
END
$$;
