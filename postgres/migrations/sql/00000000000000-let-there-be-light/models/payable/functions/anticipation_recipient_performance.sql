CREATE OR REPLACE FUNCTION anticipation_recipient_performance(
  anticipable_recipient_id character varying
)
RETURNS anticipable_performances
LANGUAGE plpgsql AS $$
DECLARE
  _performance anticipable_performances;
  _perf        RECORD;
BEGIN
  SELECT
    COALESCE( SUM(amount), 0 )                                           AS total_volume,
    SUM( CASE WHEN bulk_anticipation_id IS NULL THEN 0 ELSE amount END ) AS non_performed_volume
  INTO _perf
  FROM "Payables"
  WHERE
    recipient_id = anticipable_recipient_id AND
    payment_method = 'credit_card'          AND
    (
      (original_payment_date IS NULL AND payment_date > now() ) OR
      original_payment_date > now()
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
