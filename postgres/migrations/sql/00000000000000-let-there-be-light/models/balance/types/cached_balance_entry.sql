CREATE TYPE cached_balance_entry AS (
  company_id   character varying,
  recipient_id character varying,
  status       character varying,
  amount       bigint,
  fee          bigint
);
