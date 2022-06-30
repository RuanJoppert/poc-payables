CREATE TYPE "enum_GatewayTasks_status" AS ENUM (
  'waiting',
  'processing',
  'failed',
  'success',
  'canceled'
);

CREATE TABLE "GatewayTasks" (
  id         character varying(255) PRIMARY KEY,
  company_id character varying(255),
  task       character varying(255) NOT NULL,
  due_time   timestamp with time zone NOT NULL,
  status     "enum_GatewayTasks_status" DEFAULT 'waiting'::"enum_GatewayTasks_status" NOT NULL,
  metadata   text DEFAULT '{}'::text NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL
);

CREATE INDEX gateway_tasks_company_id ON "GatewayTasks" USING btree (company_id);
CREATE INDEX gateway_tasks_status     ON "GatewayTasks" USING btree (status);
