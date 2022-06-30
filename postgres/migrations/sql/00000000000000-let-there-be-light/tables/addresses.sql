CREATE TABLE "Addresses" (
  id            SERIAL PRIMARY KEY,
  company_id    character varying(255),
  street        character varying(255),
  complementary character varying(255),
  street_number character varying(255),
  neighborhood  character varying(255),
  city          character varying(255),
  state         character varying(255),
  zipcode       character varying(255),
  country       character varying(255),
  created_at    timestamp with time zone NOT NULL,
  updated_at    timestamp with time zone NOT NULL,
  customer_id   integer
);

CREATE INDEX addresses_company_id  ON "Addresses" USING btree (company_id);
CREATE INDEX addresses_customer_id ON "Addresses" USING btree (customer_id);
