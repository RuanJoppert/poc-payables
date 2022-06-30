CREATE TYPE cached_balance_entry AS (
  id           integer,
  last_id      integer,
  previous_id  integer,
  company_id   character varying,
  recipient_id character varying,
  status       character varying,
  amount       bigint,
  fee          bigint
);
