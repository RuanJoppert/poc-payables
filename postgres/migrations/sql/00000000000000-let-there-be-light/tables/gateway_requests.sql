CREATE TYPE "enum_GatewayRequests_status" AS ENUM (
  'waiting',
  'processing',
  'deferred',
  'failed',
  'success'
);

CREATE TABLE "GatewayRequests" (
  id                    character varying(255) PRIMARY KEY,
  model                 character varying(255) NOT NULL,
  model_id              character varying(255) NOT NULL,
  company_id            character varying(255) NOT NULL,
  status                "enum_GatewayRequests_status" DEFAULT 'waiting'::"enum_GatewayRequests_status" NOT NULL,
  first_operation_id    character varying(255),
  deferred_operation_id character varying(255),
  options               text DEFAULT '{}'::text NOT NULL,
  data                  text DEFAULT '{}'::text NOT NULL,
  metadata              text DEFAULT '{}'::text NOT NULL,
  created_at            timestamp with time zone NOT NULL,
  updated_at            timestamp with time zone NOT NULL
);

CREATE INDEX        gateway_requests_company_id     ON "GatewayRequests" USING btree (company_id);
CREATE INDEX        gateway_requests_model_model_id ON "GatewayRequests" USING btree (model, model_id);
CREATE INDEX        gateway_requests_status         ON "GatewayRequests" USING btree (status);
CREATE UNIQUE INDEX gateway_requests_execution_lock ON "GatewayRequests" USING btree (model, model_id) WHERE ((((status = 'waiting'::"enum_GatewayRequests_status") OR (status = 'processing'::"enum_GatewayRequests_status")) OR (status = 'deferred'::"enum_GatewayRequests_status")) AND ((model_id)::text <> '-'::text));
