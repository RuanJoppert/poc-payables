CREATE OR REPLACE FUNCTION enum_to_text(anyenum)
RETURNS text
LANGUAGE sql IMMUTABLE
AS $_$ SELECT $1::text; $_$;
