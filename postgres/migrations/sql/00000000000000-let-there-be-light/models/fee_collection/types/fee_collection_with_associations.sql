CREATE TYPE fee_collection_with_associations AS (
  id            character varying,
  status        character varying,
  type          character varying,
  description   character varying,
  payment_date  timestamp with time zone,
  amount        integer,
  recipient_id  character varying,
  object_type   character varying,
  object_id     character varying,
  created_at    timestamp with time zone,
  movement_data json
);
