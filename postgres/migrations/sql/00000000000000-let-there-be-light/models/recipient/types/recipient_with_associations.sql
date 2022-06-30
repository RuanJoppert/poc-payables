CREATE TYPE recipient_with_associations AS (
  id                              character varying,
  bank_account_id                 integer,
  transfer_enabled                boolean,
  last_transfer                   timestamp with time zone,
  transfer_interval               character varying,
  transfer_day                    integer,
  automatic_anticipation_enabled  boolean,
  anticipatable_volume_percentage double precision,
  created_at                      timestamp with time zone,
  updated_at                      timestamp with time zone,
  bank_account                    json
);
