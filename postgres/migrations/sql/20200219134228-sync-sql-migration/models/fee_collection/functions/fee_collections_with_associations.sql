CREATE OR REPLACE FUNCTION fee_collections_with_associations(
  query_id character varying
)
RETURNS json
LANGUAGE plpgsql AS $$
DECLARE
  fee_collection  RECORD;
  movement_object fee_collection_with_associations;
BEGIN
  SELECT
    id, status, type, description, payment_date, amount,
    recipient_id, object_type, object_id, reason, created_at
  INTO fee_collection
  FROM "FeeCollections" AS fc
  WHERE
    fc.id = query_id;

  movement_object.id           = fee_collection.id;
  movement_object.status       = enum_to_text(fee_collection.status);
  movement_object.type         = enum_to_text(fee_collection.type);
  movement_object.description  = fee_collection.description;
  movement_object.payment_date = fee_collection.payment_date;
  movement_object.amount       = fee_collection.amount;
  movement_object.recipient_id = fee_collection.recipient_id;
  movement_object.object_type  = fee_collection.object_type;
  movement_object.object_id    = fee_collection.object_id;
  movement_object.reason       = fee_collection.reason;
  movement_object.created_at   = fee_collection.created_at;

  CASE movement_object.object_type
  WHEN 'payable' THEN
    movement_object.movement_data = payables_with_associations( varchar_to_int(movement_object.object_id) );
  WHEN 'invoice' THEN
    movement_object.movement_data = invoices_with_associations( movement_object.object_id );
  WHEN 'transfer' THEN
    movement_object.movement_data = transfers_with_associations( varchar_to_int(movement_object.object_id) );
  ELSE
    movement_object.movement_data = NULL;
  END CASE;

  RETURN row_to_json(movement_object);
END
$$;
