CREATE OR REPLACE FUNCTION bo_status_to_varchar("enum_BalanceOperations_status")
RETURNS character varying
LANGUAGE sql IMMUTABLE STRICT
AS $_$ SELECT cast($1 as varchar) $_$;
