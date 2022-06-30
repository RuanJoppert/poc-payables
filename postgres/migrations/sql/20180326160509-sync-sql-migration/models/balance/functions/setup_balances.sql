CREATE OR REPLACE FUNCTION setup_balances()
RETURNS void
LANGUAGE plpgsql AS $$
DECLARE
  missing_balance RECORD;
BEGIN
  FOR missing_balance IN (
    SELECT
      rec.company_id   AS company_id,
      rec.id           AS recipient_id,
      status_candidate AS status
    FROM       (SELECT id, company_id
                FROM "Recipients"
                UNION
                SELECT fake_recipient_id, company_id
                FROM "Recipients"
                CROSS JOIN unnest(array['_all']) AS fake_recipient_id
                ORDER BY company_id) AS rec
    CROSS JOIN unnest('{waiting_funds,available,transferred,waiting_block,blocked}'::varchar[]) AS status_candidate
    LEFT JOIN  "Balances" AS ba
      ON
        ba.recipient_id = rec.id         AND
        ba.company_id   = rec.company_id AND
        ba.status       = status_candidate
    WHERE
      ba.id IS NULL
  ) LOOP

    INSERT INTO "Balances" ( company_id, recipient_id, status, amount, fee, last_id )
    VALUES ( missing_balance.company_id, missing_balance.recipient_id, missing_balance.status, 0, 0, 0 );

  END LOOP;
END
$$;
