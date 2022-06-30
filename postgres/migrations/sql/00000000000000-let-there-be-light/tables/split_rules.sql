CREATE TABLE "SplitRules" (
  id                    character varying(255) PRIMARY KEY,
  company_id            character varying(255) NOT NULL,
  transaction_id        integer NOT NULL,
  recipient_id          character varying(255) NOT NULL,
  charge_processing_fee boolean DEFAULT true NOT NULL,
  liable                boolean DEFAULT true NOT NULL,
  percentage            double precision,
  amount                integer,
  created_at            timestamp with time zone NOT NULL,
  updated_at            timestamp with time zone NOT NULL,
  charge_remainder      boolean
);

CREATE INDEX split_rules_company_id     ON "SplitRules" USING btree (company_id);
CREATE INDEX split_rules_recipient_id   ON "SplitRules" USING btree (recipient_id);
CREATE INDEX split_rules_transaction_id ON "SplitRules" USING btree (transaction_id);
