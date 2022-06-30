CREATE TYPE anticipatable_payable AS (
	id                 integer,
	fee                integer,
	fraud_coverage_fee integer,
	amount             integer,
	payment_date       timestamp with time zone,
	transaction_id     integer,
	anticipation_fee   integer
);