CREATE OR REPLACE FUNCTION anticipable_payables_filtered(
  payable_ids                    integer[],
  max_amount_to_anticipate       bigint,
  max_volume_percentage          double precision,
  anticipable_company_id         character varying,
  company_max_antecipable_rate   double precision,
  anticipable_recipient_id       character varying,
  recipient_max_antecipable_rate double precision,
  new_payment_date               timestamp with time zone,
  max_created_at                 timestamp with time zone,
  anticipation_fee_rate          double precision,
  order_by                       character varying
)
RETURNS SETOF anticipable_payable
LANGUAGE plpgsql AS $$
DECLARE
  _max_gross_amount_to_anticipate bigint;
  _amount_to_anticipate           int;
  _gross_amount_to_anticipate     int;
  _payable                        "Payables"%ROWTYPE;
  _anticipable_payable            anticipable_payable;
BEGIN
  _amount_to_anticipate       = 0;
  _gross_amount_to_anticipate = 0;

  _max_gross_amount_to_anticipate = max_gross_amount_to_anticipate(max_volume_percentage, anticipable_company_id, company_max_antecipable_rate, anticipable_recipient_id, recipient_max_antecipable_rate);

  IF max_amount_to_anticipate <= 0 THEN
    max_amount_to_anticipate = _max_gross_amount_to_anticipate;
  END IF;

  FOR _payable IN (
    SELECT * FROM anticipable_payables(payable_ids, anticipable_recipient_id, new_payment_date, max_created_at, anticipation_fee_rate, order_by)
  ) LOOP
    _anticipable_payable = anticipable_from_payable(_payable, _amount_to_anticipate, _gross_amount_to_anticipate, new_payment_date);

    IF _anticipable_payable.total_net_amount <= max_amount_to_anticipate AND _anticipable_payable.total_gross_amount <= _max_gross_amount_to_anticipate THEN
      _amount_to_anticipate       = _anticipable_payable.total_net_amount;
      _gross_amount_to_anticipate = _anticipable_payable.total_gross_amount;
      RETURN NEXT _anticipable_payable;

      IF _anticipable_payable.total_net_amount = max_amount_to_anticipate OR _anticipable_payable.total_gross_amount = _max_gross_amount_to_anticipate THEN
        RETURN;
      END IF;
    END IF;

  END LOOP;

  RETURN;
END
$$;
