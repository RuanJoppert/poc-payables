CREATE TYPE "enum_FeeCollections_status" AS ENUM (
  'available',
  'waiting_funds'
);

CREATE TYPE "enum_FeeCollections_type" AS ENUM (
  'fee_adjustment',
  'billing',
  'legal'
);

CREATE TABLE "FeeCollections" (
  id           character varying(255) PRIMARY KEY,
  status       "enum_FeeCollections_status" DEFAULT 'available'::"enum_FeeCollections_status",
  type         "enum_FeeCollections_type" DEFAULT 'billing'::"enum_FeeCollections_type",
  description  character varying(255),
  payment_date timestamp with time zone NOT NULL,
  amount       integer NOT NULL,
  object_type  character varying(255),
  object_id    character varying(255),
  company_id   character varying(255) NOT NULL,
  recipient_id character varying(255) NOT NULL,
  created_at   timestamp with time zone NOT NULL,
  updated_at   timestamp with time zone NOT NULL
);

CREATE INDEX fee_collections_company_id            ON "FeeCollections" USING btree (company_id);
CREATE INDEX fee_collections_object_type_object_id ON "FeeCollections" USING btree (object_type, object_id);
CREATE INDEX fee_collections_recipient_id          ON "FeeCollections" USING btree (recipient_id);
CREATE INDEX fee_collections_status                ON "FeeCollections" USING btree (status);
CREATE INDEX fee_collections_type                  ON "FeeCollections" USING btree (type);
