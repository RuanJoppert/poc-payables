CREATE TABLE "Cards" (
  id              character varying(255) PRIMARY KEY,
  data            text,
  company_id      character varying(255),
  customer_id     integer,
  holder_name     character varying(255),
  brand           character varying(255),
  first_digits    character varying(255),
  last_digits     character varying(255),
  country         character varying(255),
  fingerprint     character varying(255),
  weak_encryption boolean,
  valid           boolean,
  created_at      timestamp with time zone NOT NULL,
  updated_at      timestamp with time zone NOT NULL,
  expiration_date character varying(255)
);

CREATE INDEX cards_company_id  ON "Cards" USING btree (company_id);
CREATE INDEX cards_customer_id ON "Cards" USING btree (customer_id);
CREATE INDEX cards_fingerprint ON "Cards" USING btree (fingerprint);
