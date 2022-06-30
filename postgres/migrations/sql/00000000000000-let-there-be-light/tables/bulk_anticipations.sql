CREATE TYPE "enum_BulkAnticipations_automatic_anticipation_profile" AS ENUM (
  'full',
  '1025'
);

CREATE TYPE "enum_BulkAnticipations_status" AS ENUM (
  'pending',
  'approved',
  'refused',
  'canceled',
  'building'
);

CREATE TYPE "enum_BulkAnticipations_timeframe" AS ENUM (
  'start',
  'end',
  'distributed'
);

CREATE TYPE "enum_BulkAnticipations_type" AS ENUM (
  'automatic',
  'spot'
);

CREATE TABLE "BulkAnticipations" (
  id                             character varying(255) PRIMARY KEY,
  company_id                     character varying(255) NOT NULL,
  recipient_id                   character varying(255) NOT NULL,
  status                         "enum_BulkAnticipations_status" DEFAULT 'pending'::"enum_BulkAnticipations_status" NOT NULL,
  type                           "enum_BulkAnticipations_type" DEFAULT 'spot'::"enum_BulkAnticipations_type" NOT NULL,
  automatic_anticipation_profile "enum_BulkAnticipations_automatic_anticipation_profile" DEFAULT 'full'::"enum_BulkAnticipations_automatic_anticipation_profile",
  timeframe                      "enum_BulkAnticipations_timeframe",
  payment_date                   timestamp with time zone NOT NULL,
  amount                         integer,
  fee                            integer,
  anticipation_fee               integer,
  created_at                     timestamp with time zone NOT NULL,
  updated_at                     timestamp with time zone NOT NULL
);

CREATE INDEX bulk_anticipations_company_id   ON "BulkAnticipations" USING btree (company_id);
CREATE INDEX bulk_anticipations_recipient_id ON "BulkAnticipations" USING btree (recipient_id);
CREATE INDEX bulk_anticipations_status       ON "BulkAnticipations" USING btree (status);
