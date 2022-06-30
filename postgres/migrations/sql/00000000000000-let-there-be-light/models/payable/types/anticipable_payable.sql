CREATE TYPE anticipable_payable AS (
  id                 integer,
  payment_date       timestamp with time zone,
  amount             integer,
  net_amount         integer,
  fee                integer,
  transaction_id     integer,
  anticipation_days  integer,
  anticipation_fee   integer,
  total_net_amount   integer,
  total_gross_amount integer
);
