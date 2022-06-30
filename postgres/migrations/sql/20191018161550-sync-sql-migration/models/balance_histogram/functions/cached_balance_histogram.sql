CREATE OR REPLACE FUNCTION cached_balance_histogram(
  query_company_id   character varying,
  query_recipient_id character varying,
  query_status       character varying,
  query_start_date   date,
  query_end_date     date,
  query_date_type    character varying
)
RETURNS SETOF "BalanceHistograms"
LANGUAGE plpgsql AS $$
DECLARE
  last_histogram      "BalanceHistograms"%ROWTYPE;
  histogram           "BalanceHistograms"%ROWTYPE;
  recipient           RECORD;
  need_cache_update   boolean;
  unnested_status     RECORD;
  aggregated          RECORD;
  selected_status     varchar;
  total_amount        bigint;
  total_fee           bigint;
  step                interval;
  min_date            date;
BEGIN
  CASE query_date_type
  WHEN 'day' THEN
    step = '1 day';
  WHEN 'week' THEN
    step = '1 week';
  WHEN 'month' THEN
    step = '1 month';
  END CASE;

  IF DATE_TRUNC(query_date_type, NOW() AT TIME ZONE 'BRT') < query_end_date THEN
    query_end_date = DATE_TRUNC(query_date_type, NOW() AT TIME ZONE 'BRT');
  END IF;

  FOR recipient IN (
    SELECT *
    FROM "Recipients"
    WHERE
      ( company_id = query_company_id   OR query_company_id   IS NULL ) AND
      ( id         = query_recipient_id OR query_recipient_id IS NULL )
  ) LOOP

    FOR unnested_status IN (
      SELECT stts AS status
      FROM unnest('{available,waiting_funds}'::varchar[]) AS stts
      WHERE
        stts = query_status OR query_status IS NULL
    ) LOOP
      selected_status = unnested_status.status;

      SELECT *
      INTO histogram
      FROM "BalanceHistograms" AS bh
      WHERE
        bh.recipient_id    = recipient.id    AND
        bh.status          = selected_status AND
        bh.date_type       = query_date_type AND
        bh.histogram_date <= DATE_TRUNC(query_date_type, query_end_date AT TIME ZONE 'BRT')
      ORDER BY
        bh.histogram_date DESC
      LIMIT 1;

      IF NOT FOUND THEN
        total_amount      = 0;
        total_fee         = 0;
        min_date          = DATE_TRUNC(query_date_type, recipient.created_at AT TIME ZONE 'BRT');
        need_cache_update = TRUE;
      ELSE
        IF histogram.histogram_date = DATE_TRUNC(query_date_type, query_end_date AT TIME ZONE 'BRT') OR
           DATE_TRUNC(query_date_type, histogram.histogram_date      AT TIME ZONE 'BRT') =
           DATE_TRUNC(query_date_type, ( NOW() - '1 day'::interval ) AT TIME ZONE 'BRT') THEN
          need_cache_update = FALSE;
        ELSE
          need_cache_update = TRUE;
          total_amount = histogram.total_amount;
          total_fee    = histogram.total_fee;
          min_date     = histogram.histogram_date;
        END IF;
      END IF;

      IF need_cache_update THEN
        FOR aggregated IN (
          SELECT
            DATE_TRUNC(query_date_type, created_at AT TIME ZONE 'BRT') AS histogram_date,
            COALESCE( SUM( CASE WHEN amount >= 0 THEN amount ELSE 0 END ), 0 )       AS amount_in,
            COALESCE( SUM( CASE WHEN amount <  0 THEN amount ELSE 0 END ), 0 )       AS amount_out,
            COALESCE( SUM( CASE WHEN amount >= 0 THEN fee    ELSE 0 END ), 0 )       AS fee_in,
            COALESCE( SUM( CASE WHEN amount <  0 THEN fee    ELSE 0 END ), 0 )       AS fee_out
          FROM "BalanceOperations" AS bo
          WHERE
            bo.company_id                   = recipient.company_id AND
            bo.recipient_id                 = recipient.id         AND
            bo_status_to_varchar(bo.status) = selected_status      AND
            DATE_TRUNC(query_date_type, created_at AT TIME ZONE 'BRT') > min_date
          GROUP BY
            DATE_TRUNC(query_date_type, created_at AT TIME ZONE 'BRT')
          ORDER BY
            DATE_TRUNC(query_date_type, created_at AT TIME ZONE 'BRT')
        ) LOOP

          total_amount = total_amount + aggregated.amount_in + aggregated.amount_out;
          total_fee    = total_fee    + aggregated.fee_in    + aggregated.fee_out;

          IF DATE_TRUNC(query_date_type, aggregated.histogram_date AT TIME ZONE 'BRT') < DATE_TRUNC(query_date_type, NOW() AT TIME ZONE 'BRT') THEN
            histogram.histogram_date = aggregated.histogram_date;
            histogram.company_id     = recipient.company_id;
            histogram.recipient_id   = recipient.id;
            histogram.status         = selected_status;
            histogram.date_type      = query_date_type;
            histogram.total_amount   = total_amount;
            histogram.amount_in      = aggregated.amount_in;
            histogram.amount_out     = aggregated.amount_out;
            histogram.total_fee      = total_fee;
            histogram.fee_in         = aggregated.fee_in;
            histogram.fee_out        = aggregated.fee_out;

            INSERT INTO "BalanceHistograms" (
              histogram_date,
              company_id,
              recipient_id,
              status,
              date_type,
              total_amount,
              amount_in,
              amount_out,
              total_fee,
              fee_in,
              fee_out
            ) VALUES (
              histogram.histogram_date,
              histogram.company_id,
              histogram.recipient_id,
              histogram.status,
              histogram.date_type,
              histogram.total_amount,
              histogram.amount_in,
              histogram.amount_out,
              histogram.total_fee,
              histogram.fee_in,
              histogram.fee_out
            );
          END IF;

        END LOOP;
      END IF;

      last_histogram.id = NULL;
      FOR histogram IN (
        SELECT *
        FROM "BalanceHistograms" AS bh
        WHERE
          bh.recipient_id    = recipient.id     AND
          bh.status          = selected_status  AND
          bh.date_type       = query_date_type  AND
          bh.histogram_date >= query_start_date AND
          bh.histogram_date <= query_end_date
        ORDER BY
          bh.histogram_date
      ) LOOP
        last_histogram = histogram;
        RETURN NEXT histogram;
      END LOOP;

      IF query_end_date >= DATE_TRUNC(query_date_type, NOW() AT TIME ZONE 'BRT') THEN

        IF last_histogram.id IS NULL THEN
          SELECT
            bh.total_amount,
            bh.total_fee
          INTO total_amount, total_fee
          FROM "BalanceHistograms" AS bh
          WHERE
            bh.recipient_id    = recipient.id    AND
            bh.status          = selected_status AND
            bh.date_type       = query_date_type AND
            bh.histogram_date <= DATE_TRUNC(query_date_type, query_start_date AT TIME ZONE 'BRT')
          ORDER BY
            bh.histogram_date DESC
          LIMIT 1;

          IF NOT FOUND THEN
            total_amount = 0;
            total_fee    = 0;
          END IF;
        ELSE
          total_amount = last_histogram.total_amount;
          total_fee    = last_histogram.total_fee;
        END IF;

        SELECT
          DATE_TRUNC(query_date_type, created_at AT TIME ZONE 'BRT') AS histogram_date,
          COALESCE( SUM( CASE WHEN amount >= 0 THEN amount ELSE 0 END ), 0 )       AS amount_in,
          COALESCE( SUM( CASE WHEN amount <  0 THEN amount ELSE 0 END ), 0 )       AS amount_out,
          COALESCE( SUM( CASE WHEN amount >= 0 THEN fee    ELSE 0 END ), 0 )       AS fee_in,
          COALESCE( SUM( CASE WHEN amount <  0 THEN fee    ELSE 0 END ), 0 )       AS fee_out
        INTO aggregated
        FROM "BalanceOperations" AS bo
        WHERE
          bo.company_id                   = recipient.company_id AND
          bo.recipient_id                 = recipient.id         AND
          bo_status_to_varchar(bo.status) = selected_status      AND
          DATE_TRUNC(query_date_type, created_at AT TIME ZONE 'BRT') = query_end_date
        GROUP BY
          DATE_TRUNC(query_date_type, created_at AT TIME ZONE 'BRT');

        histogram.id             = NULL;
        histogram.histogram_date = aggregated.histogram_date;
        histogram.company_id     = recipient.company_id;
        histogram.recipient_id   = recipient.id;
        histogram.status         = selected_status;
        histogram.date_type      = query_date_type;
        histogram.total_amount   = total_amount + aggregated.amount_in + aggregated.amount_out;
        histogram.amount_in      = aggregated.amount_in;
        histogram.amount_out     = aggregated.amount_out;
        histogram.total_fee      = total_fee + aggregated.fee_in + aggregated.fee_out;
        histogram.fee_in         = aggregated.fee_in;
        histogram.fee_out        = aggregated.fee_out;

        IF aggregated.amount_in IS NOT NULL THEN
          RETURN NEXT histogram;
        END IF;
      END IF;
    END LOOP;
  END LOOP;

  RETURN;
END
$$;
