CREATE TYPE balance_entry AS (
  status        character varying,
  amount        bigint,
  cache_changes json
);