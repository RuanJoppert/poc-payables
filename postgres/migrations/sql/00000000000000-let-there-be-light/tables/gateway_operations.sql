CREATE TYPE "enum_GatewayOperations_status" AS ENUM (
  'waiting',
  'processing',
  'deferred',
  'failed',
  'success',
  'dropped'
);

CREATE TYPE "enum_GatewayOperations_type" AS ENUM (
  'analyze',
  'authorize',
  'capture',
  'issue',
  'conciliate',
  'refund'
);

CREATE TABLE "GatewayOperations" (
  id                      character varying(255) PRIMARY KEY,
  company_id              character varying(255),
  model                   character varying(255) NOT NULL,
  model_id                character varying(255) NOT NULL,
  status                  "enum_GatewayOperations_status" DEFAULT 'waiting'::"enum_GatewayOperations_status" NOT NULL,
  fail_reason             character varying(255),
  type                    "enum_GatewayOperations_type" NOT NULL,
  internal                boolean NOT NULL,
  rollbacked              boolean NOT NULL,
  metadata                text DEFAULT '{}'::text NOT NULL,
  next_group_id           character varying(255),
  group_id                character varying(255) NOT NULL,
  processor               character varying(255),
  processor_response_code character varying(255),
  started_at              bigint,
  ended_at                bigint,
  created_at              timestamp with time zone NOT NULL,
  updated_at              timestamp with time zone NOT NULL,
  gateway_request_id      character varying(255)
);

CREATE INDEX  gateway_operations_company_id         ON "GatewayOperations" USING btree (company_id);
CREATE INDEX  gateway_operations_gateway_request_id ON "GatewayOperations" USING btree (gateway_request_id);
CREATE INDEX  gateway_operations_model_model_id     ON "GatewayOperations" USING btree (model, model_id);
CREATE INDEX  gateway_operations_status             ON "GatewayOperations" USING btree (status);
