CREATE OR REPLACE FUNCTION get_anticipatable_payables(
  payable_ids                integer[],
  anticipatable_recipient_id character varying,
  new_payment_date           timestamp with time zone,
  max_created_at             timestamp with time zone,
  anticipation_fee_rate      double precision,
  order_by                   character varying
)
RETURNS SETOF anticipatable_payable
LANGUAGE plpgsql STABLE AS $$
BEGIN
  RETURN QUERY
  EXECUTE 'SELECT
    id,
    fee,
    fraud_coverage_fee,
    amount,
    payment_date,
    transaction_id,
    (round((amount - fee) * $6 * ((payment_date AT TIME ZONE ''BRT'')::date - ($3 AT TIME ZONE ''BRT'')::date) / (30 * 100)))::integer AS anticipation_fee
  FROM "Payables" AS payable
  WHERE
        ( payable.id = ANY($1) OR $1 = ''{}''::int[] )    AND
        payable.is_anticipatable IS TRUE                  AND
        payable.bulk_anticipation_id  IS NULL             AND
        payable.original_payment_date IS NULL             AND
        payable.type                  = ''credit''        AND
        payable.status                = ''waiting_funds'' AND
        payable.recipient_id          = $2                AND
        payable.payment_method        = ''credit_card''   AND
        payable.amount > (COALESCE(payable.fee, 0) + COALESCE(payable.fraud_coverage_fee, 0)) AND
        payable.payment_date AT TIME ZONE ''BRT'' > $3 AND
        ( $4 IS NULL OR payable.created_at AT TIME ZONE ''BRT'' <= $4 )
    ORDER BY
      CASE WHEN $5 = ''ASC'' THEN extract(epoch FROM payable.payment_date) ELSE -(extract(epoch FROM payable.payment_date)) END ASC, payable.amount DESC'
  USING payable_ids, anticipatable_recipient_id, new_payment_date, max_created_at, order_by, anticipation_fee_rate;
END
$$;
