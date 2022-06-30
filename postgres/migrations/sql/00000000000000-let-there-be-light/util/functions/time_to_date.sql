CREATE OR REPLACE FUNCTION time_to_date(timestamp with time zone)
RETURNS date
LANGUAGE sql IMMUTABLE STRICT
AS $_$ SELECT cast(($1 AT TIME ZONE 'America/Sao_Paulo') as date) $_$;
