CREATE TYPE "enum_Customers_document_type" AS ENUM (
  'cpf',
  'cnpj'
);

CREATE TABLE "Customers" (
  id              SERIAL PRIMARY KEY,
  company_id      character varying(255),
  document_number character varying(255),
  document_type   "enum_Customers_document_type" DEFAULT 'cpf'::"enum_Customers_document_type",
  name            character varying(255),
  email           character varying(255),
  born_at         timestamp with time zone,
  gender          character varying(255),
  created_at      timestamp with time zone NOT NULL,
  updated_at      timestamp with time zone NOT NULL
);

CREATE INDEX customers_company_id      ON "Customers" USING btree (company_id);
CREATE INDEX customers_document_number ON "Customers" USING btree (document_number);
CREATE INDEX customers_document_type   ON "Customers" USING btree (document_type);
CREATE INDEX customers_email           ON "Customers" USING btree (email);
