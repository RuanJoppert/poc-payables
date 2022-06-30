CREATE TYPE "enum_BankAccounts_document_type" AS ENUM (
  'cpf',
  'cnpj'
);

CREATE TYPE "enum_BankAccounts_type" AS ENUM (
  'conta_corrente',
  'conta_poupanca',
  'conta_corrente_conjunta',
  'conta_poupanca_conjunta'
);

CREATE TABLE "BankAccounts" (
  id                   SERIAL PRIMARY KEY,
  company_id           character varying(255),
  bank_code            character varying(255),
  agencia              character varying(255),
  agencia_dv           character varying(255),
  conta                character varying(255),
  conta_dv             character varying(255),
  document_type        "enum_BankAccounts_document_type" DEFAULT 'cnpj'::"enum_BankAccounts_document_type",
  document_number      character varying(255),
  legal_name           character varying(255),
  charge_transfer_fees boolean DEFAULT true,
  created_at           timestamp with time zone NOT NULL,
  updated_at           timestamp with time zone NOT NULL,
  type                 "enum_BankAccounts_type"
);

CREATE INDEX bank_accounts_company_id ON "BankAccounts" USING btree (company_id);
