CREATE TYPE "enum_EldoradoJobs_status" AS ENUM (
  'waiting',
  'processing',
  'success',
  'failed'
);

CREATE TABLE "EldoradoJobs" (
  id          SERIAL PRIMARY KEY,
  task        character varying(255),
  status      "enum_EldoradoJobs_status" DEFAULT 'waiting'::"enum_EldoradoJobs_status" NOT NULL,
  gist_id     character varying(255),
  parameters  text DEFAULT '{}'::text NOT NULL,
  created_at  timestamp with time zone NOT NULL,
  updated_at  timestamp with time zone NOT NULL
);
