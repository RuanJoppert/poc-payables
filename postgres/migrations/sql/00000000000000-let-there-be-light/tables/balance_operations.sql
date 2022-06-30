CREATE TYPE "enum_BalanceOperations_status" AS ENUM (
  'waiting_funds',
  'available',
  'transferred'
);

CREATE TABLE "BalanceOperations" (
  id                  SERIAL PRIMARY KEY,
  company_id          character varying(255) NOT NULL,
  recipient_id        character varying(255) NOT NULL,
  amount              integer,
  fee                 integer,
  type                character varying(255),
  object_type         character varying(255),
  object_id           character varying(255),
  originator_model    character varying(255),
  originator_model_id character varying(255),
  balance_old_amount  integer,
  balance_amount      integer,
  status              "enum_BalanceOperations_status",
  created_at          timestamp with time zone NOT NULL,
  updated_at          timestamp with time zone NOT NULL
);

CREATE INDEX balance_operations_company_id            ON "BalanceOperations" USING btree (company_id);
CREATE INDEX balance_operations_created_at            ON "BalanceOperations" USING btree (created_at);
CREATE INDEX balance_operations_object_type_object_id ON "BalanceOperations" USING btree (object_type, object_id);
CREATE INDEX balance_operations_recipient_id          ON "BalanceOperations" USING btree (recipient_id);
CREATE INDEX balance_operations_status                ON "BalanceOperations" USING btree (status);
CREATE INDEX balance_operation_company_recipient      ON "BalanceOperations" USING btree (company_id, recipient_id);
CREATE INDEX balance_operation_with_recipient_listing ON "BalanceOperations" USING btree (company_id, recipient_id, status, created_at DESC, id DESC);

-- -- TODO: Attention on indexes with custom functions
-- CREATE INDEX        balance_operations_daily                        ON "BalanceOperations" USING btree (company_id, recipient_id, bo_status_to_varchar(status), date_trunc('day'::text, timezone('America/Sao_Paulo'::text, created_at)));
-- CREATE INDEX        balance_operations_monthly                      ON "BalanceOperations" USING btree (company_id, recipient_id, bo_status_to_varchar(status), date_trunc('month'::text, timezone('America/Sao_Paulo'::text, created_at)));
-- CREATE INDEX        balance_operations_weekly                       ON "BalanceOperations" USING btree (company_id, recipient_id, bo_status_to_varchar(status), date_trunc('week'::text, timezone('America/Sao_Paulo'::text, created_at)));
-- CREATE INDEX        balance_operation_company_recipient_status      ON "BalanceOperations" USING btree (company_id, recipient_id, bo_status_to_varchar(status));
-- CREATE INDEX        balance_operation_company_recipient_status_date ON "BalanceOperations" USING btree (company_id, recipient_id, bo_status_to_varchar(status), time_to_date(created_at));
-- CREATE INDEX        balance_operation_company_recipient_status_id   ON "BalanceOperations" USING btree (id, company_id, recipient_id, bo_status_to_varchar(status));
-- CREATE UNIQUE INDEX balance_operations_uniqueness_lock              ON "BalanceOperations" USING btree (digest((((((((((((((((((((company_id)::text || '-'::text) || (recipient_id)::text) || '-'::text) || amount) || '-'::text) || fee) || '-'::text) || (COALESCE(type, ''::character varying))::text) || '-'::text) || (object_type)::text) || '-'::text) || (object_id)::text) || '-'::text) || (COALESCE(originator_model, ''::character varying))::text) || '-'::text) || (COALESCE(originator_model_id, ''::character varying))::text) || '-'::text) || enum_to_text(status)), 'sha1'::text)) WHERE (created_at > '2016-12-07 00:00:00+00'::timestamp with time zone);
