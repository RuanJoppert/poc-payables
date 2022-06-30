CREATE TYPE "enum_AntifraudAnalyses_status" AS ENUM (
  'processing',
  'deferred',
  'approved',
  'refused',
  'failed'
);

CREATE TABLE "AntifraudAnalyses" (
  id             SERIAL PRIMARY KEY,
  name           character varying(255),
  score          double precision,
  cost           integer,
  status         "enum_AntifraudAnalyses_status" DEFAULT 'processing'::"enum_AntifraudAnalyses_status" NOT NULL,
  company_id     character varying(255),
  created_at     timestamp with time zone NOT NULL,
  updated_at     timestamp with time zone NOT NULL,
  transaction_id integer
);

CREATE INDEX antifraud_analyses_company_id     ON "AntifraudAnalyses" USING btree (company_id);
CREATE INDEX antifraud_analyses_transaction_id ON "AntifraudAnalyses" USING btree (transaction_id);
