CREATE OR REPLACE FUNCTION bank_accounts_with_associations(
  query_id integer
)
RETURNS json
LANGUAGE plpgsql AS $$
DECLARE
  movement_data RECORD;
BEGIN
  SELECT
    id, bank_code, agencia, agencia_dv, conta, conta_dv, type, document_type,
    document_number, legal_name, charge_transfer_fees, created_at
  INTO movement_data
  FROM "BankAccounts" AS bk
  WHERE
    bk.id = query_id;

  RETURN row_to_json(movement_data);
END
$$;
