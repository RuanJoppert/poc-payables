CREATE TABLE "Boletos" (
  id                 SERIAL PRIMARY KEY,
  company_id         character varying(255),
  token              character varying(255),
  expiration_date    timestamp with time zone,
  barcode            character varying(255),
  amount             integer,
  paid               boolean,
  bank_response_code character varying(255),
  sacado             character varying(255),
  pagador            character varying(255),
  instrucoes         character varying(255),
  created_at         timestamp with time zone NOT NULL,
  updated_at         timestamp with time zone NOT NULL,
  transaction_id     integer
);

CREATE INDEX        boletos_company_id     ON "Boletos" USING btree (company_id);
CREATE INDEX        boletos_transaction_id ON "Boletos" USING btree (transaction_id);
CREATE UNIQUE INDEX boletos_token          ON "Boletos" USING btree (token);
