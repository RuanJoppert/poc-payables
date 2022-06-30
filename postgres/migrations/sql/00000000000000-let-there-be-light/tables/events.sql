CREATE TYPE "enum_Events_referer" AS ENUM (
  'internal',
  'external'
);

CREATE TABLE "Events" (
  id          character varying(255) PRIMARY KEY,
  name        character varying(255) NOT NULL,
  referer     "enum_Events_referer" DEFAULT 'internal'::"enum_Events_referer" NOT NULL,
  company_id  character varying(255) NOT NULL,
  model       character varying(255) NOT NULL,
  model_id    character varying(255) NOT NULL,
  payload     text DEFAULT '{}'::text NOT NULL,
  internal    boolean NOT NULL,
  created_at  timestamp with time zone NOT NULL,
  updated_at  timestamp with time zone NOT NULL
);

CREATE INDEX events_company_id     ON "Events" USING btree (company_id);
CREATE INDEX events_model_model_id ON "Events" USING btree (model, model_id);
