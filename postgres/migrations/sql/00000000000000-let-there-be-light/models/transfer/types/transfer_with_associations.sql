CREATE TYPE transfer_with_associations AS (
  id                      integer,
  amount                  integer,
  type                    character varying,
  status                  character varying,
  source_type             character varying,
  source_id               character varying,
  target_type             character varying,
  target_id               character varying,
  fee                     integer,
  funding_date            timestamp with time zone,
  funding_estimated_date  timestamp with time zone,
  transaction_id          integer,
  created_at              timestamp with time zone,
  target_data             json
);
