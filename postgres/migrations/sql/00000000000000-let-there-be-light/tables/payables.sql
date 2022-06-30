CREATE TYPE "enum_Payables_anticipation_fee_status" AS ENUM (
  'waiting_funds',
  'prepaid',
  'paid',
  'suspended',
  'confirmed'
);

CREATE TYPE "enum_Payables_fee_status" AS ENUM (
  'waiting_funds',
  'prepaid',
  'paid',
  'suspended',
  'confirmed'
);

CREATE TYPE "enum_Payables_payment_method" AS ENUM (
  'credit_card',
  'boleto',
  'debit_card'
);

CREATE TYPE "enum_Payables_status" AS ENUM (
  'waiting_funds',
  'prepaid',
  'paid',
  'suspended',
  'confirmed'
);

CREATE TYPE "enum_Payables_type" AS ENUM (
  'credit',
  'refund',
  'chargeback',
  'chargeback_refund'
);

CREATE TABLE "Payables" (
  id                                       SERIAL PRIMARY KEY,
  status                                   "enum_Payables_status",
  fee_status                               "enum_Payables_fee_status",
  anticipation_fee_status                  "enum_Payables_anticipation_fee_status",
  amount                                   integer,
  fee                                      integer,
  anticipation_fee                         integer,
  installment                              integer,
  company_id                               character varying(255),
  payment_date                             timestamp with time zone,
  fee_payment_date                         timestamp with time zone,
  anticipation_fee_payment_date            timestamp with time zone,
  original_payment_date                    timestamp with time zone,
  fee_original_payment_date                timestamp with time zone,
  anticipation_fee_original_payment_date   timestamp with time zone,
  type                                     "enum_Payables_type",
  payment_method                           "enum_Payables_payment_method",
  recipient_id                             character varying(255) NOT NULL,
  split_rule_id                            character varying(255),
  created_at                               timestamp with time zone NOT NULL,
  updated_at                               timestamp with time zone NOT NULL,
  transaction_id                           integer,
  bulk_anticipation_id                     character varying(255),
  funding_request_id                       integer,
  fee_funding_request_id                   integer,
  anticipation_fee_funding_request_id      integer,
  receivable_id                            integer,
  fee_revenue_anticipation_id              integer,
  anticipation_fee_revenue_anticipation_id integer,
  accrual_date                             timestamp with time zone
);

CREATE INDEX "Payables_AnticipationFeeRevenueAnticipation" ON "Payables" USING btree (anticipation_fee_revenue_anticipation_id);
CREATE INDEX "Payables_FeeRevenueAnticipation"             ON "Payables" USING btree (fee_revenue_anticipation_id);
CREATE INDEX anticipation_composite                        ON "Payables" USING btree (bulk_anticipation_id, original_payment_date, type, status, recipient_id, payment_method);
CREATE INDEX anticipation_joined_composite                 ON "Payables" USING btree (status, type, transaction_id);
CREATE INDEX payables_amount                               ON "Payables" USING btree (amount);
CREATE INDEX payables_anticipation_fee_funding_request_id  ON "Payables" USING btree (anticipation_fee_funding_request_id);
CREATE INDEX payables_bulk_anticipation_id                 ON "Payables" USING btree (bulk_anticipation_id);
CREATE INDEX payables_company_id                           ON "Payables" USING btree (company_id);
CREATE INDEX payables_fee_funding_request_id               ON "Payables" USING btree (fee_funding_request_id);
CREATE INDEX payables_funding_request_id                   ON "Payables" USING btree (funding_request_id);
CREATE INDEX payables_payment_date                         ON "Payables" USING btree (payment_date);
CREATE INDEX payables_payment_method                       ON "Payables" USING btree (payment_method);
CREATE INDEX payables_receivable_id                        ON "Payables" USING btree (receivable_id);
CREATE INDEX payables_recipient_id                         ON "Payables" USING btree (recipient_id);
CREATE INDEX payables_status                               ON "Payables" USING btree (status);
CREATE INDEX payables_transaction_id                       ON "Payables" USING btree (transaction_id);
CREATE INDEX payables_type                                 ON "Payables" USING btree (type);
