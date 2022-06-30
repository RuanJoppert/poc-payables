CREATE OR REPLACE FUNCTION max_gross_amount_to_anticipate(
  max_volume_percentage          double precision,
  anticipable_company_id         character varying,
  company_max_antecipable_rate   double precision,
  anticipable_recipient_id       character varying,
  recipient_max_antecipable_rate double precision
)
RETURNS bigint
LANGUAGE plpgsql AS $$
DECLARE
  _max_amount bigint;
BEGIN
  SELECT
    GREATEST(
      LEAST(
        round((company_performance.total_volume*company_max_antecipable_rate / 100)     - company_performance.non_performed_volume),
        round((recipient_performance.total_volume*recipient_max_antecipable_rate / 100) - recipient_performance.non_performed_volume),
        round(recipient_performance.total_volume*max_volume_percentage / 100)
      ),
      0
    )
  INTO _max_amount
  FROM
    anticipation_company_performance(anticipable_company_id)     AS company_performance,
    anticipation_recipient_performance(anticipable_recipient_id) AS recipient_performance;

  IF NOT FOUND THEN
    _max_amount = 0;
  END IF;

  RETURN _max_amount;
END
$$;
