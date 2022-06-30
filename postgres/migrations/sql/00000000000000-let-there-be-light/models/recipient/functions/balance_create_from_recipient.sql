CREATE OR REPLACE FUNCTION balance_create_from_recipient()
RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO "Balances" ( company_id,     recipient_id, status,          amount, fee, last_id )
  VALUES                 ( NEW.company_id, NEW.id,       'waiting_funds', 0,      0,   0       );

  INSERT INTO "Balances" ( company_id,     recipient_id, status,          amount, fee, last_id )
  VALUES                 ( NEW.company_id, NEW.id,       'available',     0,      0,   0       );

  INSERT INTO "Balances" ( company_id,     recipient_id, status,          amount, fee, last_id )
  VALUES                 ( NEW.company_id, NEW.id,       'transferred',   0,      0,   0       );

  RETURN NULL;
END;
$$;
