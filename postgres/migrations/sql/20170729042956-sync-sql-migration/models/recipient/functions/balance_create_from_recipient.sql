CREATE OR REPLACE FUNCTION balance_create_from_recipient()
RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE
  missing_balance RECORD;
BEGIN
  FOR missing_balance IN (
    SELECT
      rec.company_id   AS company_id,
      status_candidate AS status
    FROM (SELECT company_id
          FROM "Recipients"
          WHERE company_id = NEW.company_id
          LIMIT 1) AS rec
    CROSS JOIN unnest('{waiting_funds,available,transferred}'::varchar[]) AS status_candidate
    LEFT JOIN "Balances" AS ba
      ON
        ba.recipient_id = '_all'           AND
        ba.company_id   = rec.company_id   AND
        ba.status       = status_candidate
    WHERE
      ba.id IS NULL
  ) LOOP
    INSERT INTO "Balances" ( company_id, recipient_id, status, amount, fee, last_id )
    VALUES ( missing_balance.company_id, '_all', missing_balance.status, 0, 0, 0 );
  END LOOP;

  INSERT INTO "Balances" ( company_id,     recipient_id, status,          amount, fee, last_id )
  VALUES                 ( NEW.company_id, NEW.id,       'waiting_funds', 0,      0,   0       );

  INSERT INTO "Balances" ( company_id,     recipient_id, status,          amount, fee, last_id )
  VALUES                 ( NEW.company_id, NEW.id,       'available',     0,      0,   0       );

  INSERT INTO "Balances" ( company_id,     recipient_id, status,          amount, fee, last_id )
  VALUES                 ( NEW.company_id, NEW.id,       'transferred',   0,      0,   0       );

  RETURN NULL;
END;
$$;
