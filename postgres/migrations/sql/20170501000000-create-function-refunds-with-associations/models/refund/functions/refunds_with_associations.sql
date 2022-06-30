CREATE OR REPLACE FUNCTION refunds_with_associations(refund_id varchar)
RETURNS json
LANGUAGE plpgsql AS $$
DECLARE
  movement_object RECORD;
BEGIN
  SELECT
    id, amount, type, enum_to_text(status) AS status,
    charge_fee_recipient_id, fee, processing_fee,
    bank_account_id, transaction_id, created_at
  INTO movement_object
  FROM "Refunds" AS rf
  WHERE
    rf.id = refund_id;

  RETURN row_to_json(movement_object);
END
$$;
