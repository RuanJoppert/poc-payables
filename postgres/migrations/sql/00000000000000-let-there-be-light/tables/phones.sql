CREATE TABLE "Phones" (
  id          SERIAL PRIMARY KEY,
  company_id  character varying(255),
  ddi         character varying(255),
  ddd         character varying(255),
  number      character varying(255),
  created_at  timestamp with time zone NOT NULL,
  updated_at  timestamp with time zone NOT NULL,
  customer_id integer
);

CREATE INDEX phones_company_id  ON "Phones" USING btree (company_id);
CREATE INDEX phones_customer_id ON "Phones" USING btree (customer_id);
