CREATE OR REPLACE FUNCTION balance_operations_with_associations(
  query_company_id   character varying,
  query_recipient_id character varying,
  query_status       "enum_BalanceOperations_status",
  query_start_date   timestamp with time zone,
  query_end_date     timestamp with time zone,
  _last_id           bigint,
  _limit             bigint,
  _offset            bigint
)
RETURNS SETOF balance_operation_with_associations
LANGUAGE plpgsql AS $_$
DECLARE
  limit_snippet        varchar;
  offset_snippet       varchar;
  recipient_id_snippet varchar;
  last_id_snippet      varchar;
  _bo                  "BalanceOperations"%ROWTYPE;
  balance_operation    balance_operation_with_associations;
BEGIN
  IF query_status IS NULL THEN
    query_status := 'available';
  END IF;

  IF query_start_date IS NULL THEN
    query_start_date := '2010-10-10'; -- long long time ago
  END IF;

  IF query_end_date IS NULL THEN
    query_end_date := NOW();
  END IF;

  IF query_recipient_id IS NULL OR query_recipient_id = '' THEN
    recipient_id_snippet := '';
  ELSE
    recipient_id_snippet := 'AND recipient_id = $5';
  END IF;

  IF _last_id IS NULL THEN
    last_id_snippet := '';
  ELSE
    last_id_snippet := 'AND id < $6';
  END IF;

  IF _limit IS NOT NULL THEN
    limit_snippet := 'LIMIT ' || _limit;
  ELSE
    limit_snippet := '';
  END IF;

  IF _offset IS NOT NULL THEN
    offset_snippet := 'OFFSET ' || _offset;
  ELSE
    offset_snippet := '';
  END IF;

  FOR _bo IN EXECUTE
    format('
      SELECT * FROM "BalanceOperations"
      WHERE
            company_id   = $1
        AND status       = $2
        AND created_at  >= $3
        AND created_at  <= $4
        %s
        %s
      ORDER BY id DESC
      %s %s',
      recipient_id_snippet, last_id_snippet, limit_snippet, offset_snippet
    )
    USING
      query_company_id,
      query_status,
      query_start_date,
      query_end_date,
      query_recipient_id,
      _last_id
  LOOP
    RETURN NEXT associate_balance_operation(_bo);
  END LOOP;

  RETURN;
END
$_$;
