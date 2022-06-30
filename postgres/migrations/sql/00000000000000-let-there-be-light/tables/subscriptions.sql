CREATE TYPE "enum_Subscriptions_payment_method" AS ENUM (
  'credit_card',
  'boleto'
);

CREATE TYPE "enum_Subscriptions_status" AS ENUM (
  'trialing',
  'paid',
  'pending_payment',
  'unpaid',
  'canceled',
  'ended'
);

CREATE TABLE "Subscriptions" (
  id                   SERIAL PRIMARY KEY,
  company_id           character varying(255),
  postback_url         character varying(255),
  card_id              character varying(255),
  payment_method       "enum_Subscriptions_payment_method",
  status               "enum_Subscriptions_status" DEFAULT 'pending_payment'::"enum_Subscriptions_status",
  current_period_start timestamp with time zone,
  current_period_end   timestamp with time zone,
  card_brand           character varying(255),
  card_last_digits     character varying(255),
  metadata             text DEFAULT '{}'::text,
  last_charge_attempt  timestamp with time zone,
  charge_attempts      integer,
  manage_token         character varying(255),
  charges              integer,
  created_at           timestamp with time zone NOT NULL,
  updated_at           timestamp with time zone NOT NULL,
  plan_id              integer,
  customer_id          integer,
  address_id           integer,
  phone_id             integer
);

CREATE INDEX subscriptions_card_id        ON "Subscriptions" USING btree (card_id);
CREATE INDEX subscriptions_company_id     ON "Subscriptions" USING btree (company_id);
CREATE INDEX subscriptions_manage_token   ON "Subscriptions" USING btree (manage_token);
CREATE INDEX subscriptions_payment_method ON "Subscriptions" USING btree (payment_method);
CREATE INDEX subscriptions_status         ON "Subscriptions" USING btree (status);
