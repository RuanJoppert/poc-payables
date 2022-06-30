CREATE OR REPLACE FUNCTION balance_operation_valid()
RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE
  _balance_entry balance_entry;
BEGIN
  -- IF NEW.object_type != 'transfer' OR NEW.amount - NEW.fee >= 0 THEN
  --   RETURN NULL;
  -- END IF;
  --
  -- SELECT *
  -- INTO _balance_entry
  -- FROM balance_calculate(NEW.recipient_id, NEW.company_id, ARRAY[enum_to_text(NEW.status)])
  -- WHERE amount >= 0;
  --
  -- IF NOT FOUND THEN
  --   RAISE EXCEPTION '[TriggerException] Final balance amount after transfer % to recipient % is below the maximum negative', NEW.amount, NEW.recipient_id;
  -- END IF;

  RETURN NULL;
END;
$$;
