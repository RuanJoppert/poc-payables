CREATE TABLE "CardHashes" (
  id          SERIAL PRIMARY KEY,
  private_key text,
  ip          character varying(255),
  created_at  timestamp with time zone NOT NULL,
  updated_at  timestamp with time zone NOT NULL
);
