CREATE TYPE "enum_Invoices_payment_method" AS ENUM (
  'fee',
  'boleto',
  'credit_card',
  'fee_collection'
);

CREATE TYPE "enum_Invoices_status" AS ENUM (
  'pending',
  'issued',
  'canceled'
);

CREATE TABLE "Invoices" (
  id                character varying(255) PRIMARY KEY,
  serial_number     SERIAL,
  company_id        character varying(255) NOT NULL,
  amount            integer NOT NULL,
  status            "enum_Invoices_status" DEFAULT 'pending'::"enum_Invoices_status" NOT NULL,
  payment_method    "enum_Invoices_payment_method" DEFAULT 'boleto'::"enum_Invoices_payment_method" NOT NULL,
  payment_id        character varying(255),
  type              character varying(255) NOT NULL,
  period_start_date timestamp with time zone NOT NULL,
  period_end_date   timestamp with time zone NOT NULL,
  metadata          text DEFAULT '{}'::text NOT NULL,
  created_at        timestamp with time zone NOT NULL,
  updated_at        timestamp with time zone NOT NULL
);

ALTER TABLE ONLY "Invoices"
  ADD CONSTRAINT "Invoices_serial_number_key" UNIQUE (serial_number);

CREATE INDEX invoices_company_id                ON "Invoices" USING btree (company_id);
CREATE INDEX invoices_payment_method_payment_id ON "Invoices" USING btree (payment_method, payment_id);
CREATE INDEX invoices_status                    ON "Invoices" USING btree (status);
