CREATE OR REPLACE FUNCTION anticipable_from_payable(
  payable                    "Payables",
  amount_to_anticipate       integer,
  gross_amount_to_anticipate integer,
  new_payment_date           timestamp with time zone
)
RETURNS anticipable_payable
LANGUAGE plpgsql AS $$
DECLARE
  _anticipable_payable anticipable_payable;
BEGIN
  _anticipable_payable.id             = payable.id;
  _anticipable_payable.fee            = payable.fee;
  _anticipable_payable.amount         = payable.amount;
  _anticipable_payable.payment_date   = payable.payment_date;
  _anticipable_payable.transaction_id = payable.transaction_id;

  _anticipable_payable.net_amount        = payable.amount - payable.fee - payable.anticipation_fee;
  _anticipable_payable.anticipation_fee  = payable.anticipation_fee;
  _anticipable_payable.anticipation_days = ((payable.payment_date AT TIME ZONE 'America/Sao_Paulo')::DATE - (new_payment_date AT TIME ZONE 'America/Sao_Paulo')::DATE);

  _anticipable_payable.total_net_amount   = amount_to_anticipate       + _anticipable_payable.net_amount;
  _anticipable_payable.total_gross_amount = gross_amount_to_anticipate + _anticipable_payable.amount;

  RETURN _anticipable_payable;
END
$$;
