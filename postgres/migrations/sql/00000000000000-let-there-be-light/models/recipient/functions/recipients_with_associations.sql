CREATE OR REPLACE FUNCTION recipients_with_associations(
  query_id character varying
)
RETURNS json
LANGUAGE plpgsql AS $$
DECLARE
  recipient     RECORD;
  movement_data recipient_with_associations;
BEGIN
  SELECT
    id, bank_account_id, transfer_enabled, last_transfer,
    transfer_interval, transfer_day, automatic_anticipation_enabled,
    anticipatable_volume_percentage, created_at, updated_at
  INTO recipient
  FROM "Recipients" AS rc
  WHERE
    rc.id = query_id;

  movement_data.id                              = recipient.id;
  movement_data.bank_account_id                 = recipient.bank_account_id;
  movement_data.transfer_enabled                = recipient.transfer_enabled;
  movement_data.last_transfer                   = recipient.last_transfer;
  movement_data.transfer_interval               = enum_to_text(recipient.transfer_interval);
  movement_data.transfer_day                    = recipient.transfer_day;
  movement_data.automatic_anticipation_enabled  = recipient.automatic_anticipation_enabled;
  movement_data.anticipatable_volume_percentage = recipient.anticipatable_volume_percentage;
  movement_data.created_at                      = recipient.created_at;
  movement_data.updated_at                      = recipient.updated_at;

  IF movement_data.bank_account_id IS NOT NULL THEN
    movement_data.bank_account = bank_accounts_with_associations( movement_data.bank_account_id );
  END IF;

  RETURN row_to_json(movement_data);
END
$$;
