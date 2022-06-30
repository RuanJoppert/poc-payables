CREATE TYPE "enum_FundingBalanceOperations_status" AS ENUM (
  'waiting_funds',
  'available'
);

CREATE TABLE "FundingBalanceOperations" (
  id                       SERIAL PRIMARY KEY,
  status                   "enum_FundingBalanceOperations_status",
  amount                   integer,
  cost                     integer,
  type                     character varying(255),
  object_type              character varying(255),
  object_id                character varying(255),
  originator_model         character varying(255),
  originator_model_id      character varying(255),
  created_at               timestamp with time zone NOT NULL,
  updated_at               timestamp with time zone NOT NULL,
  object_version           integer,
  originator_model_version integer
);

CREATE INDEX fundingbalanceoperations_fingerprint                            ON "FundingBalanceOperations" USING btree (created_at);
CREATE INDEX funding_balance_operations_object_type_object_id                ON "FundingBalanceOperations" USING btree (object_type, object_id);
CREATE INDEX funding_balance_operations_originator_model_originator_model_id ON "FundingBalanceOperations" USING btree (originator_model, originator_model_id);
CREATE INDEX funding_balance_operations_status                               ON "FundingBalanceOperations" USING btree (status);

-- -- TODO: Attention on indexes with custom functions
-- CREATE UNIQUE INDEX "FundingBalanceOperations_fingerprint"                          ON "FundingBalanceOperations" USING btree (digest((((((((((((((((((((amount || '-'::text) || cost) || '-'::text) || (COALESCE(type, ''::character varying))::text) || '-'::text) || (object_type)::text) || '-'::text) || (object_id)::text) || '-'::text) || COALESCE((object_version)::text, ''::text)) || '-'::text) || (COALESCE(originator_model, ''::character varying))::text) || '-'::text) || (COALESCE(originator_model_id, ''::character varying))::text) || '-'::text) || COALESCE((originator_model_version)::text, ''::text)) || '-'::text) || enum_to_text(status)) || '-'::text), 'sha1'::text));
