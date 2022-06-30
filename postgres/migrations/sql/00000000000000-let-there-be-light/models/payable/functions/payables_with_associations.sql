CREATE OR REPLACE FUNCTION payables_with_associations(
  query_id integer
)
RETURNS json
LANGUAGE plpgsql AS $$
DECLARE
  movement_data RECORD;
BEGIN
  SELECT
    id, status, amount, fee, anticipation_fee, installment,
    transaction_id, split_rule_id, bulk_anticipation_id,
    recipient_id, payment_date, original_payment_date, type,
    payment_method, created_at, accrual_date
  INTO movement_data
  FROM "Payables" AS pb
  WHERE
    pb.id = query_id;

  RETURN row_to_json(movement_data);
END
$$;
