CREATE TYPE "enum_SecurityRules_target" AS ENUM (
  'accept',
  'reject'
);

CREATE TABLE "SecurityRules" (
  id         SERIAL PRIMARY KEY,
  company_id character varying(255),
  "table"    character varying(255),
  chain      character varying(255),
  source     character varying(255),
  value      character varying(255),
  target     "enum_SecurityRules_target",
  internal   boolean,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL
);
