CREATE OR REPLACE FUNCTION anticipation_company_performance(
  anticipable_company_id character varying,
  new_payment_date       timestamp with time zone
)
RETURNS anticipable_performances
LANGUAGE plpgsql AS $$
DECLARE
  _performance anticipable_performances;
  _perf        RECORD;
BEGIN
  SELECT
    COALESCE(SUM(amount), 0) AS total_volume,
    COALESCE(SUM(CASE WHEN bulk_anticipation_id IS NOT NULL THEN amount ELSE 0 END), 0) AS non_performed_volume
  INTO _perf
  FROM "Payables"
  WHERE
    company_id = anticipable_company_id AND
    payment_method = 'credit_card'          AND
    (
      payment_date > new_payment_date OR
      (original_payment_date > new_payment_date and bulk_anticipation_id is not null)
    );

  IF NOT FOUND THEN
    _perf.total_volume         = 0;
    _perf.non_performed_volume = 0;
  END IF;

  _performance.total_volume         = _perf.total_volume;
  _performance.non_performed_volume = _perf.non_performed_volume;
  _performance.performed_volume     = _perf.total_volume - _perf.non_performed_volume;

  RETURN _performance;
END
$$;
