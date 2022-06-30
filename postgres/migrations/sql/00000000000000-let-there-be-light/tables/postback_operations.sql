CREATE TYPE "enum_PostbackOperations_status" AS ENUM (
  'processing',
  'waiting_retry',
  'pending_retry',
  'failed',
  'success'
);

CREATE TABLE "PostbackOperations" (
  id             character varying(255) PRIMARY KEY,
  status         "enum_PostbackOperations_status" DEFAULT 'pending_retry'::"enum_PostbackOperations_status" NOT NULL,
  company_id     character varying(255),
  model          character varying(255),
  model_id       character varying(255),
  request_method character varying(255) DEFAULT 'POST'::character varying NOT NULL,
  request_url    character varying(255) NOT NULL,
  headers        text DEFAULT '{}'::text,
  event          character varying(255),
  signature      character varying(255),
  payload        text,
  retries        integer NOT NULL,
  max_retries    integer,
  next_retry     timestamp with time zone,
  retrying       boolean DEFAULT true,
  created_at     timestamp with time zone NOT NULL,
  updated_at     timestamp with time zone NOT NULL,
  event_id       character varying(255)
);

CREATE INDEX postback_operations_event_id       ON "PostbackOperations" USING btree (event_id);
CREATE INDEX postback_operations_model_model_id ON "PostbackOperations" USING btree (model, model_id);
CREATE INDEX postback_operations_status         ON "PostbackOperations" USING btree (status);
