CREATE TYPE "enum_Chargebacks_status" AS ENUM (
  'presented',
  'represented'
);

CREATE TABLE "Chargebacks" (
  id              character varying(255) PRIMARY KEY,
  company_id      character varying(255) NOT NULL,
  amount          integer,
  fee             integer,
  cost            double precision,
  card_brand      character varying(255) NOT NULL,
  origin          character varying(255) NOT NULL,
  transaction_id  integer NOT NULL,
  installment     integer NOT NULL,
  reason_code     character varying(255) NOT NULL,
  status          "enum_Chargebacks_status" NOT NULL,
  accrual_date    timestamp with time zone,
  created_at      timestamp with time zone NOT NULL,
  updated_at      timestamp with time zone NOT NULL
);

CREATE INDEX chargebacks_company_id     ON "Chargebacks" USING btree (company_id);
CREATE INDEX chargebacks_origin         ON "Chargebacks" USING btree (origin);
CREATE INDEX chargebacks_status         ON "Chargebacks" USING btree (status);
CREATE INDEX chargebacks_transaction_id ON "Chargebacks" USING btree (transaction_id);
