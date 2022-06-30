CREATE OR REPLACE FUNCTION invoices_with_associations(
  query_id character varying
)
RETURNS json
LANGUAGE plpgsql AS $$
DECLARE
  movement_data RECORD;
BEGIN
  SELECT
    id, serial_number, amount, status, payment_method, type,
    period_start_date, period_end_date, metadata
  INTO movement_data
  FROM "Invoices" AS inv
  WHERE
    inv.id = query_id;

  RETURN row_to_json(movement_data);
END
$$;
