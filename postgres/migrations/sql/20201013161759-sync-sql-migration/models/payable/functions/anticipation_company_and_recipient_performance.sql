CREATE OR REPLACE FUNCTION anticipation_company_and_recipient_performance(
  anticipable_company_id   CHARACTER VARYING,
  anticipable_recipient_id CHARACTER VARYING,
  new_payment_date         TIMESTAMP WITH TIME ZONE
)
RETURNS anticipable_company_and_recipient_performance
LANGUAGE plpgsql AS $$
DECLARE
  _performance    anticipable_company_and_recipient_performance;
  _perf           RECORD;
  _filter_snippet CHARACTER VARYING;
  _filter_param   CHARACTER VARYING;
  _query          CHARACTER VARYING;
  _row_count      BIGINT;
BEGIN
  IF anticipable_company_id = '575ec63283fc919901430332' OR anticipable_company_id = '56562736d9391fa065b9ac3d' OR anticipable_company_id = '57769acb9b6595b904a4d75e' OR anticipable_company_id = '5988dd7b51634f1320d65ca6' OR anticipable_company_id = '53bbf47db797215c2300006f' OR anticipable_company_id = '55f0847724d6c49d5c1e8b9e' OR anticipable_company_id = '57360ffac6d606ce0414c159' OR anticipable_company_id = '5af5cb95a2b4fd2337e723b6' THEN
    _filter_snippet = 'recipient_id = $1 AND';
    _filter_param = anticipable_recipient_id;
  ELSE
    _filter_snippet = 'company_id = $1 AND';
    _filter_param = anticipable_company_id;
  END IF;

  _query = '
    SELECT
      COALESCE(SUM(amount), 0) AS company_total_volume,
      COALESCE(
        SUM(
          CASE WHEN bulk_anticipation_id IS NOT NULL THEN
            amount
          ELSE
            0
          END
        ), 0) AS company_non_performed_volume,
      COALESCE(
        SUM(
          CASE WHEN recipient_id = $2 THEN
            amount
          ELSE
            0
          END
        ), 0) AS recipient_total_volume,
      COALESCE(
        SUM(
          CASE WHEN bulk_anticipation_id IS NOT NULL AND recipient_id = $2 THEN
            amount
          ELSE
            0
          END
        ), 0) AS recipient_non_performed_volume
    FROM "Payables"
    WHERE
      ' || _filter_snippet || '
      payment_method = ''credit_card'' AND
      (
        payment_date > $3 OR
        (original_payment_date > $3 AND bulk_anticipation_id IS NOT NULL)
      );
  ';

  EXECUTE _query
  INTO _perf
  USING _filter_param, anticipable_recipient_id, new_payment_date;

  GET DIAGNOSTICS _row_count = ROW_COUNT;

  IF _row_count = 0 THEN
    _perf.company_total_volume = 0;
    _perf.company_non_performed_volume = 0;
    _perf.recipient_total_volume = 0;
    _perf.recipient_non_performed_volume = 0;
  END IF;

  IF anticipable_company_id = '575ec63283fc919901430332' OR anticipable_company_id = '56562736d9391fa065b9ac3d' OR anticipable_company_id = '57769acb9b6595b904a4d75e' OR anticipable_company_id = '5988dd7b51634f1320d65ca6' OR anticipable_company_id = '53bbf47db797215c2300006f' OR anticipable_company_id = '55f0847724d6c49d5c1e8b9e' OR anticipable_company_id = '57360ffac6d606ce0414c159'OR anticipable_company_id = '5af5cb95a2b4fd2337e723b6' THEN
    _perf.company_total_volume = 2147483647;
    _perf.company_non_performed_volume = 0;
  END IF;

  _performance.company_performed_volume = _perf.company_total_volume - _perf.company_non_performed_volume;
  _performance.company_non_performed_volume = _perf.company_non_performed_volume;
  _performance.company_total_volume = _perf.company_total_volume;

  _performance.recipient_performed_volume = _perf.recipient_total_volume - _perf.recipient_non_performed_volume;
  _performance.recipient_non_performed_volume = _perf.recipient_non_performed_volume;
  _performance.recipient_total_volume = _perf.recipient_total_volume;

  RETURN _performance;

END
$$;
