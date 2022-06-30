CREATE OR REPLACE FUNCTION problematic_anticipable_payables(
  payable_ids              integer[],
  anticipable_recipient_id character varying,
  new_payment_date         timestamp with time zone
)
RETURNS SETOF problematic_anticipable
LANGUAGE plpgsql AS $$
DECLARE
  _anticipable problematic_anticipable;
BEGIN
  FOR _anticipable IN (
    (
      SELECT
        payable.id AS id,
        CASE
        WHEN same_trx_payable.type = 'chargeback'
          THEN 'invalid_payable_chargebacked'
        WHEN same_trx_payable.type = 'refund'
          THEN 'invalid_payable_refunded'
        WHEN same_trx_payable.status = 'suspended'
          THEN 'invalid_payable_suspended'
        ELSE
          'not_anticipable'
        END                 AS reason,
        same_trx_payable.id AS problematic_id,
        'payable'           AS problematic_model
      FROM "Payables" AS payable
      LEFT JOIN "Payables" AS same_trx_payable
        ON payable.transaction_id = same_trx_payable.transaction_id
        WHERE
          payable.id = ANY(payable_ids)                     AND
          payable.recipient_id   = anticipable_recipient_id AND
          payable.payment_method = 'credit_card'            AND
          (
            same_trx_payable.status = 'suspended'  OR
            same_trx_payable.type   = 'chargeback' OR
            same_trx_payable.type   = 'refund'
          )
      ) UNION (
        SELECT
          missing_id  AS id,
          'not_found' AS reason,
          missing_id  AS problematic_id,
          'payable'   AS problematic_model
        FROM unnest(payable_ids) AS missing_id
        LEFT JOIN "Payables" AS payable
        ON
          payable.id           = missing_id AND
          payable.recipient_id = anticipable_recipient_id
        WHERE
          payable.id IS NULL
      ) UNION (
        SELECT
          missing_id AS id,
          CASE
          WHEN payable.type = 'chargeback'
            THEN 'invalid_payable_chargebacked'
          WHEN payable.type = 'refund'
            THEN 'invalid_payable_refunded'
          WHEN payable.status = 'suspended'
            THEN 'invalid_payable_suspended'
          ELSE
            'not_anticipable'
          END         AS reason,
          missing_id  AS problematic_id,
          'payable'   AS problematic_model
        FROM unnest(payable_ids) AS missing_id
        LEFT JOIN "Payables" AS payable
        ON
          payable.id           = missing_id AND
          payable.recipient_id = anticipable_recipient_id
        WHERE
          payable.id = ANY(payable_ids) AND (
            payable.bulk_anticipation_id  IS NOT NULL         OR
            payable.original_payment_date IS NOT NULL         OR
            payable.type                  != 'credit'         OR
            payable.status                != 'waiting_funds'  OR
            payable.payment_method        != 'credit_card'
          )
      ) UNION (
        SELECT
          missing_id        AS id,
          'too_old_payable' AS reason,
          missing_id        AS problematic_id,
          'payable'         AS problematic_model
        FROM unnest(payable_ids) AS missing_id
        LEFT JOIN "Payables" AS payable
        ON
          payable.id           = missing_id AND
          payable.recipient_id = anticipable_recipient_id
        WHERE
          payable.id IS NOT NULL AND
          payable.payment_date AT TIME ZONE 'America/Sao_Paulo' <= new_payment_date
      )
  ) LOOP
    RETURN NEXT _anticipable;
  END LOOP;

  RETURN;
END
$$;
