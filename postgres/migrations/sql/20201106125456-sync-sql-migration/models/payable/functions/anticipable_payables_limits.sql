CREATE OR REPLACE FUNCTION anticipable_payables_limits(
  anticipable_company_id         character varying,
  company_max_antecipable_rate   double precision,
  anticipable_recipient_id       character varying,
  recipient_max_antecipable_rate double precision,
  new_payment_date               timestamp with time zone,
  max_created_at                 timestamp with time zone,
  anticipation_fee_rate          double precision,
  order_by                       character varying,
  max_gross_amount               bigint
)
RETURNS anticipable_limit
LANGUAGE plpgsql STABLE AS $$
DECLARE
  _anticipable_limit   anticipable_limit;
  _anticipable_payable anticipable_payable;
BEGIN
  _anticipable_limit.maximum_amount             = 0;
  _anticipable_limit.maximum_anticipation_fee   = 0;
  _anticipable_limit.maximum_fee                = 0;
  _anticipable_limit.maximum_fraud_coverage_fee = 0;
  _anticipable_limit.minimum_amount             = NULL;
  _anticipable_limit.minimum_anticipation_fee   = NULL;
  _anticipable_limit.minimum_fee                = NULL;
  _anticipable_limit.minimum_fraud_coverage_fee = NULL;

  FOR _anticipable_payable IN (
    SELECT * FROM anticipable_payables_filtered('{}'::int[], 0, 100, anticipable_company_id, company_max_antecipable_rate, anticipable_recipient_id, recipient_max_antecipable_rate, new_payment_date, max_created_at, anticipation_fee_rate, order_by, max_gross_amount)
  ) LOOP

    _anticipable_limit.maximum_amount             = _anticipable_payable.total_gross_amount;
    _anticipable_limit.maximum_anticipation_fee   = _anticipable_limit.maximum_anticipation_fee   + _anticipable_payable.anticipation_fee;
    _anticipable_limit.maximum_fee                = _anticipable_limit.maximum_fee                + _anticipable_payable.fee;
    _anticipable_limit.maximum_fraud_coverage_fee = _anticipable_limit.maximum_fraud_coverage_fee + COALESCE(_anticipable_payable.fraud_coverage_fee, 0);

    IF _anticipable_limit.minimum_amount IS NULL OR _anticipable_payable.net_amount < _anticipable_limit.minimum_amount THEN
      _anticipable_limit.minimum_amount             = _anticipable_payable.amount;
      _anticipable_limit.minimum_anticipation_fee   = _anticipable_payable.anticipation_fee;
      _anticipable_limit.minimum_fee                = _anticipable_payable.fee;
      _anticipable_limit.minimum_fraud_coverage_fee = COALESCE(_anticipable_payable.fraud_coverage_fee, 0);
    END IF;

  END LOOP;

  _anticipable_limit.minimum_amount             = COALESCE(_anticipable_limit.minimum_amount,             0);
  _anticipable_limit.minimum_anticipation_fee   = COALESCE(_anticipable_limit.minimum_anticipation_fee,   0);
  _anticipable_limit.minimum_fee                = COALESCE(_anticipable_limit.minimum_fee,                0);
  _anticipable_limit.minimum_fraud_coverage_fee = COALESCE(_anticipable_limit.minimum_fraud_coverage_fee, 0);

  RETURN _anticipable_limit;
END
$$;
