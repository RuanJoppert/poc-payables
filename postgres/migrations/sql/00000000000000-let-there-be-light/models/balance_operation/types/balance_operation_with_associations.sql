CREATE TYPE balance_operation_with_associations AS (
  id                 integer,
  status             character varying,
  balance_amount     integer,
  balance_old_amount integer,
  type               character varying,
  amount             integer,
  fee                integer,
  created_at         timestamp with time zone,
  object_type        character varying,
  object_id          character varying,
  movement_data      json
);
