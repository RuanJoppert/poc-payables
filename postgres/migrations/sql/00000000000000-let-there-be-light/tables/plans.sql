CREATE TABLE "Plans" (
  id              SERIAL PRIMARY KEY,
  company_id      character varying(255),
  name            character varying(255),
  days            integer,
  amount          integer,
  trial_days      integer,
  color           character varying(255),
  payment_methods character varying(255) DEFAULT 'credit_card,boleto'::character varying,
  charges         integer,
  installments    integer DEFAULT 1,
  created_at      timestamp with time zone NOT NULL,
  updated_at      timestamp with time zone NOT NULL
);

CREATE INDEX plans_company_id ON "Plans" USING btree (company_id);
