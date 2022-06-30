CREATE TYPE "enum_Revenues_status" AS ENUM (
  'waiting_funds',
  'confirmed',
  'paid',
  'suspended'
);

CREATE TYPE "enum_Revenues_type" AS ENUM (
  'fee',
  'anticipation_fee'
);

CREATE TABLE "Revenues" (
  id                       SERIAL PRIMARY KEY,
  created_at               timestamp with time zone NOT NULL,
  updated_at               timestamp with time zone NOT NULL,
  accrual_date             timestamp with time zone NOT NULL,
  type                     "enum_Revenues_type",
  status                   "enum_Revenues_status",
  payment_date             timestamp with time zone NOT NULL,
  original_payment_date    timestamp with time zone,
  fee                      integer DEFAULT 0 NOT NULL,
  cost                     integer DEFAULT 0 NOT NULL,
  anticipation_cost        integer,
  fee_originator_model     character varying(255),
  fee_originator_model_id  character varying(255),
  cost_originator_model    character varying(255),
  cost_originator_model_id character varying(255),
  row_version              integer DEFAULT 0 NOT NULL
);
