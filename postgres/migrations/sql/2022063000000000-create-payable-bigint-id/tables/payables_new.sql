
CREATE TABLE IF NOT EXISTS "PayablesNew" (
	id                                       bigint NOT NULL PRIMARY KEY,
	status                                   "enum_Payables_status" NULL,
	fee_status                               "enum_Payables_fee_status" NULL,
	anticipation_fee_status                  "enum_Payables_anticipation_fee_status" NULL,
	amount                                   int4 NULL,
	fee                                      int4 NULL,
	anticipation_fee                         int4 NULL,
	installment                              int4 NULL,
	company_id                               varchar(255) NULL,
	payment_date                             timestamptz NULL,
	fee_payment_date                         timestamptz NULL,
	anticipation_fee_payment_date            timestamptz NULL,
	original_payment_date                    timestamptz NULL,
	fee_original_payment_date                timestamptz NULL,
	anticipation_fee_original_payment_date   timestamptz NULL,
	type                                     "enum_Payables_type" NULL,
	payment_method                           "enum_Payables_payment_method" NULL,
	recipient_id                             varchar(255) NOT NULL,
	split_rule_id                            varchar(255) NULL,
	created_at                               timestamptz NOT NULL,
	updated_at                               timestamptz NOT NULL,
	transaction_id                           int4 NULL,
	bulk_anticipation_id                     varchar(255) NULL,
	funding_request_id                       int4 NULL,
	fee_funding_request_id                   int4 NULL,
	anticipation_fee_funding_request_id      int4 NULL,
	receivable_id                            int4 NULL,
	fee_revenue_anticipation_id              int4 NULL,
	anticipation_fee_revenue_anticipation_id int4 NULL,
	accrual_date                             timestamptz NULL,
	batch_id                                 varchar(255) NULL,
	block_id                                 varchar(255) NULL,
	fraud_coverage_fee                       int4 NULL,
	anticipation_id                          varchar(255) NULL,
	liquidation_arrangement_key              varchar(255) NULL,
	anticipation_fee_base                    int4 NULL,
	anticipation_spread_amount               float8 NULL,
	tax_fee                                  int4 NULL,
	is_anticipatable                         bool NULL,
	liquidation_type                         "enum_Payables_liquidation_type" NULL,
	originator_model                         varchar(255) NULL,
	originator_model_id                      varchar(255) NULL,
	card_brand                               varchar(255) NULL,
	document_type                            varchar(255) NULL,
	document_number                          varchar(255) NULL,
	funding_type                             varchar(255) NULL,
	private_label                            varchar(255) NULL,
	liquidation_engine                       "enum_Payables_liquidation_engine" NULL,
	receivable_schedule_id                   varchar(255) NULL
);
CREATE INDEX IF NOT EXISTS "Payables_AnticipationFeeRevenueAnticipation" ON "PayablesNew" (anticipation_fee_revenue_anticipation_id int4_ops);
CREATE INDEX IF NOT EXISTS "Payables_FeeRevenueAnticipation" ON "PayablesNew" (fee_revenue_anticipation_id int4_ops);
CREATE INDEX IF NOT EXISTS anticipation_composite ON "PayablesNew" (bulk_anticipation_id text_ops,original_payment_date timestamptz_ops,"type" enum_ops,status enum_ops,recipient_id text_ops,payment_method enum_ops);
CREATE INDEX IF NOT EXISTS anticipation_joined_composite ON "PayablesNew" (status enum_ops,"type" enum_ops,transaction_id int4_ops);
CREATE INDEX IF NOT EXISTS ix_anticipation_id ON "PayablesNew" (anticipation_id text_ops);
CREATE INDEX IF NOT EXISTS ix_is_anticipatable ON "PayablesNew" (is_anticipatable bool_ops);
CREATE INDEX IF NOT EXISTS ix_payables_block_id ON "PayablesNew" (block_id text_ops);
CREATE INDEX IF NOT EXISTS ix_payables_liquidation_arrangement_key ON "PayablesNew" (liquidation_arrangement_key text_ops);
CREATE INDEX IF NOT EXISTS payables_amount ON "PayablesNew" (amount int4_ops);
CREATE INDEX IF NOT EXISTS payables_anticipation_fee_funding_request_id ON "PayablesNew" (anticipation_fee_funding_request_id int4_ops);
CREATE INDEX IF NOT EXISTS payables_batch_id ON "PayablesNew" (batch_id text_ops);
CREATE INDEX IF NOT EXISTS payables_fee_funding_request_id ON "PayablesNew" (fee_funding_request_id int4_ops);
CREATE INDEX IF NOT EXISTS payables_funding_request_id ON "PayablesNew" (funding_request_id int4_ops);
CREATE INDEX IF NOT EXISTS payables_payment_date ON "PayablesNew" (payment_date timestamptz_ops);
CREATE INDEX IF NOT EXISTS payables_payment_method ON "PayablesNew" (payment_method enum_ops);
CREATE INDEX IF NOT EXISTS payables_receivable_id ON "PayablesNew" (receivable_id int4_ops);
CREATE INDEX IF NOT EXISTS payables_recipient_id ON "PayablesNew" (recipient_id text_ops);
CREATE INDEX IF NOT EXISTS payables_transaction_id ON "PayablesNew" (transaction_id int4_ops);
CREATE INDEX IF NOT EXISTS payables_type ON "PayablesNew" ("type" enum_ops);
