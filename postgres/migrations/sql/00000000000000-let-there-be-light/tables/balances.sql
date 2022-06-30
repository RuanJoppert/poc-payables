CREATE TABLE "Balances" (
  id            SERIAL PRIMARY KEY,
  last_id       integer,
  company_id    character varying,
  recipient_id  character varying,
  status        character varying,
  amount        bigint,
  fee           bigint
);

CREATE INDEX        balance_company_recipient                ON "Balances" USING btree (company_id, recipient_id);
CREATE INDEX        balance_company_recipient_status_last_id ON "Balances" USING btree (company_id, recipient_id, status, last_id);
CREATE UNIQUE INDEX balance_company_recipient_status         ON "Balances" USING btree (company_id, recipient_id, status);
