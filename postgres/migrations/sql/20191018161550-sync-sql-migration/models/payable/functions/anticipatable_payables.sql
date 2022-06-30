CREATE OR REPLACE FUNCTION anticipatable_payables(
  payable_ids                integer[],
  anticipatable_recipient_id character varying,
  new_payment_date           timestamp with time zone,
  max_created_at             timestamp with time zone,
  anticipation_fee_rate      double precision,
  order_by                   character varying
)
RETURNS SETOF "Payables"
LANGUAGE plpgsql AS $$
DECLARE
  _payable "Payables"%ROWTYPE;
BEGIN
  FOR _payable IN (
    SELECT * FROM "Payables" AS payable
      WHERE
        ( payable.id = ANY(payable_ids) OR payable_ids = '{}'::int[] )           AND
        payable.is_anticipatable IS TRUE                                         AND
        payable.bulk_anticipation_id  IS NULL                                    AND
        payable.original_payment_date IS NULL                                    AND
        payable.type                  = 'credit'                                 AND
        payable.status                = 'waiting_funds'                          AND
        payable.recipient_id          = anticipatable_recipient_id                             AND
        payable.payment_method        = 'credit_card'                            AND
        payable.amount > (COALESCE(payable.fee, 0) + COALESCE(payable.fraud_coverage_fee, 0)) AND
        payable.payment_date AT TIME ZONE 'BRT' > new_payment_date AND
        ( max_created_at IS NULL OR payable.created_at AT TIME ZONE 'BRT' <= max_created_at )
    ORDER BY
      CASE WHEN order_by = 'ASC' THEN extract(epoch FROM payable.payment_date) ELSE -(extract(epoch FROM payable.payment_date)) END ASC, payable.amount DESC
  ) LOOP
    _payable.anticipation_fee = round((_payable.amount - _payable.fee) * anticipation_fee_rate * ((_payable.payment_date AT TIME ZONE 'BRT')::date - (new_payment_date AT TIME ZONE 'BRT')::date) / (30 * 100));
    RETURN NEXT _payable;
  END LOOP;

  RETURN;
END
$$;
