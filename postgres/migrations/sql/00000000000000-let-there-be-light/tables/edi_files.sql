CREATE TYPE "enum_EdiFiles_type" AS ENUM (
  'liquidacao_remessa',
  'liquidacao_retorno',
  'cobranca_remessa',
  'cobranca_retorno'
);

CREATE TABLE "EdiFiles" (
  id          SERIAL PRIMARY KEY,
  content     text,
  bank        character varying(255),
  type        "enum_EdiFiles_type",
  processed   boolean,
  name        character varying(255),
  created_at  timestamp with time zone NOT NULL,
  updated_at  timestamp with time zone NOT NULL
);
