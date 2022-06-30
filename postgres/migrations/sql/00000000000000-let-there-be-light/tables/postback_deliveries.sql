CREATE TYPE "enum_PostbackDeliveries_status" AS ENUM (
  'processing',
  'failed',
  'success'
);

CREATE TABLE "PostbackDeliveries" (
  id                    character varying(255) PRIMARY KEY,
  postback_operation_id character varying(255) NOT NULL,
  status                "enum_PostbackDeliveries_status" DEFAULT 'processing'::"enum_PostbackDeliveries_status" NOT NULL,
  status_reason         character varying(255),
  status_code           character varying(255),
  response_time         integer,
  response_headers      text,
  response_body         text,
  created_at            timestamp with time zone NOT NULL,
  updated_at            timestamp with time zone NOT NULL
);

CREATE INDEX postback_deliveries_postback_operation_id ON "PostbackDeliveries" USING btree (postback_operation_id);
CREATE INDEX postback_deliveries_status                ON "PostbackDeliveries" USING btree (status);
