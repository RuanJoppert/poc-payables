CREATE OR REPLACE FUNCTION transfers_with_associations(query_id integer)
RETURNS json
LANGUAGE plpgsql AS $$
DECLARE
  transfer        RECORD;
  movement_object transfer_with_associations;
BEGIN
  SELECT
    id, amount, type, status, source_type, source_id,
    target_type, target_id, fee, funding_date,
    funding_estimated_date, transaction_id, created_at
  INTO transfer
  FROM "Transfers" AS tr
  WHERE
    tr.id = query_id;

  movement_object.id                     = transfer.id;
  movement_object.amount                 = transfer.amount;
  movement_object.type                   = transfer.type;
  movement_object.status                 = enum_to_text(transfer.status);
  movement_object.source_type            = transfer.source_type;
  movement_object.source_id              = transfer.source_id;
  movement_object.target_type            = transfer.target_type;
  movement_object.target_id              = transfer.target_id;
  movement_object.fee                    = transfer.fee;
  movement_object.funding_date           = transfer.funding_date;
  movement_object.funding_estimated_date = transfer.funding_estimated_date;
  movement_object.transaction_id         = transfer.transaction_id;
  movement_object.created_at             = transfer.created_at;

  CASE movement_object.target_type
  WHEN 'bank_account' THEN
    movement_object.target_data = bank_accounts_with_associations( varchar_to_int(movement_object.target_id) );
  WHEN 'recipient' THEN
    movement_object.target_data = recipients_with_associations( movement_object.target_id );
  ELSE
    movement_object.target_data = NULL;
  END CASE;

  RETURN row_to_json(movement_object);
END
$$;
