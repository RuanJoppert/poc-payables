CREATE TABLE "BalanceHistograms" (
  id             SERIAL PRIMARY KEY,
  histogram_date date,
  company_id     character varying,
  recipient_id   character varying,
  status         character varying,
  date_type      character varying,
  total_amount   bigint,
  amount_in      bigint,
  amount_out     bigint,
  total_fee      bigint,
  fee_in         bigint,
  fee_out        bigint
);

CREATE UNIQUE INDEX balance_histogram_recipient_status_date_type_date ON "BalanceHistograms" USING btree (recipient_id, status, date_type, histogram_date);
