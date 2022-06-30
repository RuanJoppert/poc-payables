CREATE TYPE "enum_Transfers_status" AS ENUM (
  'pending_transfer',
  'transferred',
  'failed',
  'processing',
  'canceled'
);

CREATE TYPE "enum_Transfers_type" AS ENUM (
  'ted',
  'doc',
  'credito_em_conta',
  'inter_recipient'
);

CREATE TABLE "Transfers" (
  id                     SERIAL PRIMARY KEY,
  status                 "enum_Transfers_status" DEFAULT 'pending_transfer'::"enum_Transfers_status",
  type                   "enum_Transfers_type",
  amount                 integer,
  cost                   double precision,
  fee                    double precision,
  company_id             character varying(255),
  bank_account_id        integer,
  funding_estimated_date timestamp with time zone,
  funding_date           timestamp with time zone,
  bank_response_code     character varying(255),
  transaction_id         integer,
  recipient_id           character varying(255),
  created_at             timestamp with time zone NOT NULL,
  updated_at             timestamp with time zone NOT NULL,
  edi_file_id            integer,
  source_type            character varying(255),
  source_id              character varying(255),
  target_type            character varying(255),
  target_id              character varying(255)
);

CREATE INDEX        transfers_bank_account_id     ON "Transfers" USING btree (bank_account_id);
CREATE INDEX        transfers_company_id          ON "Transfers" USING btree (company_id);
CREATE INDEX        transfers_recipient_id        ON "Transfers" USING btree (recipient_id);
CREATE INDEX        transfers_status              ON "Transfers" USING btree (status);
CREATE INDEX        transfers_type                ON "Transfers" USING btree (type);
CREATE UNIQUE INDEX boleto_refund_uniqueness_lock ON "Transfers" USING btree (transaction_id) WHERE ((status = ANY (ARRAY['pending_transfer'::"enum_Transfers_status", 'processing'::"enum_Transfers_status"])) AND (transaction_id IS NOT NULL));
