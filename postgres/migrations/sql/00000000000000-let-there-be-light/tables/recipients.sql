CREATE TYPE "enum_Recipients_automatic_anticipation_type" AS ENUM (
  'full',
  '1025'
);

CREATE TYPE "enum_Recipients_transfer_interval" AS ENUM (
  'daily',
  'weekly',
  'monthly'
);

CREATE TABLE "Recipients" (
  id                                character varying(255) PRIMARY KEY,
  company_id                        character varying(255) NOT NULL,
  bank_account_id                   integer,
  transfer_enabled                  boolean,
  last_transfer                     timestamp with time zone,
  transfer_interval                 "enum_Recipients_transfer_interval",
  transfer_day                      integer,
  automatic_anticipation_enabled    boolean,
  automatic_anticipation_type       "enum_Recipients_automatic_anticipation_type" DEFAULT 'full'::"enum_Recipients_automatic_anticipation_type",
  automatic_anticipation_days       character varying(255),
  automatic_anticipation_1025_delay integer DEFAULT 15,
  anticipatable_volume_percentage   double precision,
  created_at                        timestamp with time zone NOT NULL,
  updated_at                        timestamp with time zone NOT NULL,
  metadata                          character varying(255),
  anticipation_fee                  double precision
);

CREATE INDEX recipients_bank_account_id ON "Recipients" USING btree (bank_account_id);
CREATE INDEX recipients_company_id      ON "Recipients" USING btree (company_id);
