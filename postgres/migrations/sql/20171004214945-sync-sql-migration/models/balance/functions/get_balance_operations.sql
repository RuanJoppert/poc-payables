CREATE OR REPLACE FUNCTION get_balance_operations(
  query_company_id character varying,
  query_recipient_id character varying,
  query_status character varying,
  query_last_id integer
)
RETURNS RECORD
LANGUAGE plpgsql STABLE AS $$
DECLARE
  result RECORD;
  all_str character varying;
BEGIN
  all_str := '_all';

  EXECUTE 'SELECT
              COALESCE( MAX(bo.id), $4 )   AS max_id,
              COALESCE( SUM(bo.amount), 0) AS amount,
              COALESCE( SUM(bo.fee),    0) AS fee
            FROM "BalanceOperations" AS bo
            WHERE
              ($1 = bo.recipient_id OR $1 = $5)      AND
              $2  = bo.company_id                    AND
              $3  = bo_status_to_varchar(bo.status)  AND
              $4  < bo.id'
    INTO result
    USING query_recipient_id, query_company_id,
          query_status, query_last_id, all_str;

  RETURN result;
END
$$;

