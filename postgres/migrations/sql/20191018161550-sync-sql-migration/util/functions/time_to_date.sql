CREATE OR REPLACE FUNCTION time_to_date(timestamp with time zone)
RETURNS date
LANGUAGE sql IMMUTABLE STRICT
AS $_$ SELECT cast(($1 AT TIME ZONE 'BRT') as date) $_$;
