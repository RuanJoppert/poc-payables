CREATE OR REPLACE FUNCTION max_gross_amount_to_anticipate(
  max_volume_percentage          double precision,
  anticipable_company_id         character varying,
  company_max_antecipable_rate   double precision,
  anticipable_recipient_id       character varying,
  recipient_max_antecipable_rate double precision,
  new_payment_date               timestamp with time zone
)
RETURNS bigint
LANGUAGE plpgsql AS $$
DECLARE
  _max_amount bigint;
BEGIN
  SELECT
    GREATEST(
      LEAST(
        round((performance.company_total_volume*company_max_antecipable_rate / 100)     - performance.company_non_performed_volume),
        round((performance.recipient_total_volume*recipient_max_antecipable_rate / 100) - performance.recipient_non_performed_volume),
        round(performance.recipient_total_volume*max_volume_percentage / 100)
      ),
      0
    )
  INTO _max_amount
  FROM
    anticipation_company_and_recipient_performance(
      anticipable_company_id,
      anticipable_recipient_id,
      new_payment_date
    ) AS performance;

  IF NOT FOUND THEN
    _max_amount = 0;
  END IF;

  RETURN _max_amount;
END
$$;
