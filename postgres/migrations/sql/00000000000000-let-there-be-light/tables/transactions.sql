CREATE TYPE "enum_Transactions_capture_method" AS ENUM (
  'ecommerce',
  'emv',
  'magstripe'
);

CREATE TYPE "enum_Transactions_card_pin_mode" AS ENUM (
  'online',
  'offline'
);

CREATE TYPE "enum_Transactions_payment_method" AS ENUM (
  'credit_card',
  'debit_card',
  'boleto'
);

CREATE TYPE "enum_Transactions_status" AS ENUM (
  'processing',
  'waiting_payment',
  'paid',
  'refused',
  'refunded',
  'authorized',
  'pending_refund',
  'chargedback'
);

CREATE TABLE "Transactions" (
  id                     SERIAL PRIMARY KEY,
  company_id             character varying(255),
  amount                 integer,
  authorized_amount      integer,
  paid_amount            integer,
  refunded_amount        integer,
  cost                   double precision,
  status                 "enum_Transactions_status" DEFAULT 'processing'::"enum_Transactions_status",
  status_reason          character varying(255),
  tid                    character varying(255),
  nsu                    character varying(255),
  authorization_code     character varying(255),
  acquirer_response_code character varying(255),
  acquirer_name          character varying(255),
  acquirer_id            character varying(255),
  capture_method         "enum_Transactions_capture_method" DEFAULT 'ecommerce'::"enum_Transactions_capture_method",
  card_id                character varying(255),
  antifraud_score        double precision,
  payment_method         "enum_Transactions_payment_method",
  card_last_digits       character varying(255),
  card_first_digits      character varying(255),
  card_holder_name       character varying(255),
  environment_objects    text,
  installments           integer DEFAULT 1,
  postback_url           character varying(255),
  card_brand             character varying(255),
  boleto_url             character varying(255),
  boleto_barcode         character varying(255),
  boleto_expiration_date timestamp with time zone,
  metadata               text DEFAULT '{}'::text,
  antifraud_metadata     text DEFAULT '{}'::text,
  soft_descriptor        character varying(255),
  token                  character varying(255),
  referer                character varying(255),
  ip                     character varying(255),
  created_at             timestamp with time zone NOT NULL,
  updated_at             timestamp with time zone NOT NULL,
  subscription_id        integer,
  customer_id            integer,
  phone_id               integer,
  address_id             integer,
  card_pin_mode          "enum_Transactions_card_pin_mode"
);

CREATE INDEX transactions_address_id      ON "Transactions" USING btree (address_id);
CREATE INDEX transactions_capture_method  ON "Transactions" USING btree (capture_method);
CREATE INDEX transactions_card_id         ON "Transactions" USING btree (card_id);
CREATE INDEX transactions_company_id      ON "Transactions" USING btree (company_id);
CREATE INDEX transactions_customer_id     ON "Transactions" USING btree (customer_id);
CREATE INDEX transactions_phone_id        ON "Transactions" USING btree (phone_id);
CREATE INDEX transactions_status          ON "Transactions" USING btree (status);
CREATE INDEX transactions_subscription_id ON "Transactions" USING btree (subscription_id);
CREATE INDEX transactions_tid             ON "Transactions" USING btree (tid);
CREATE INDEX transactions_token           ON "Transactions" USING btree (token);