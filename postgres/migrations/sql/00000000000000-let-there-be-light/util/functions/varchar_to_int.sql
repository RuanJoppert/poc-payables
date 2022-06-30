CREATE OR REPLACE FUNCTION varchar_to_int(character varying)
RETURNS integer
LANGUAGE sql IMMUTABLE STRICT
AS $_$ SELECT cast($1 as int) $_$;
