CREATE TYPE "enum_Receivables_cost_status" AS ENUM (
    'waiting_funds',
    'available',
    'confirmed',
    'suspended'
);

CREATE TYPE "enum_Receivables_origin" AS ENUM (
  'bradesco',
  'stone',
  'cielo'
);

CREATE TYPE "enum_Receivables_payment_method" AS ENUM (
  'credit_card',
  'boleto',
  'debit_card'
);

CREATE TYPE "enum_Receivables_status" AS ENUM (
  'waiting_funds',
  'available',
  'confirmed',
  'preavailable',
  'suspended'
);

CREATE TYPE "enum_Receivables_type" AS ENUM (
  'credit',
  'refund',
  'chargeback',
  'chargeback_refund'
);

CREATE TABLE "Receivables" (
  id                              SERIAL PRIMARY KEY,
  status                          "enum_Receivables_status",
  amount                          integer,
  cost                            double precision,
  fee                             integer,
  anticipation_cost               double precision,
  installment                     integer,
  company_id                      character varying(255),
  availability_date               timestamp with time zone,
  original_availability_date      timestamp with time zone,
  fingerprint                     character varying(255),
  origin                          "enum_Receivables_origin",
  type                            "enum_Receivables_type",
  payment_method                  "enum_Receivables_payment_method",
  origin_id                       character varying(255),
  created_at                      timestamp with time zone NOT NULL,
  updated_at                      timestamp with time zone NOT NULL,
  transaction_id                  integer,
  funding_request_id              integer,
  cost_availability_date          timestamp with time zone,
  cost_original_availability_date timestamp with time zone,
  cost_status                     "enum_Receivables_cost_status" DEFAULT 'waiting_funds'::"enum_Receivables_cost_status" NOT NULL,
  accrual_date                    timestamp with time zone
);

CREATE INDEX "Receivables_CostAvailabilityDate"         ON "Receivables" USING btree (cost_availability_date);
CREATE INDEX "Receivables_CostStatus"                   ON "Receivables" USING btree (cost_status);
CREATE INDEX "Receivables_OriginalCostAvailabilityDate" ON "Receivables" USING btree (cost_original_availability_date);
CREATE INDEX receivables_company_id                     ON "Receivables" USING btree (company_id);
CREATE INDEX receivables_fingerprint                    ON "Receivables" USING btree (fingerprint);
CREATE INDEX receivables_funding_request_id             ON "Receivables" USING btree (funding_request_id);
CREATE INDEX receivables_origin                         ON "Receivables" USING btree (origin);
CREATE INDEX receivables_origin_id                      ON "Receivables" USING btree (origin_id);
CREATE INDEX receivables_payment_method                 ON "Receivables" USING btree (payment_method);
CREATE INDEX receivables_status                         ON "Receivables" USING btree (status);
CREATE INDEX receivables_transaction_id                 ON "Receivables" USING btree (transaction_id);
CREATE INDEX receivables_type                           ON "Receivables" USING btree (type);
