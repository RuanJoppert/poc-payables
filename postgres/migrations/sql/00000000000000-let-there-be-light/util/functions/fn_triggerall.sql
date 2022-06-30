CREATE OR REPLACE FUNCTION fn_triggerall(
  doenable boolean
)
RETURNS integer
LANGUAGE plpgsql AS $$
DECLARE
mytables RECORD;
BEGIN
  FOR mytables IN SELECT relname FROM pg_class WHERE reltriggers > 0 AND NOT relname LIKE 'pg_%'
  LOOP
    IF DoEnable THEN
      EXECUTE 'ALTER TABLE ' || mytables.relname || ' ENABLE TRIGGER ALL';
    ELSE
      EXECUTE 'ALTER TABLE ' || mytables.relname || ' DISABLE TRIGGER ALL';
    END IF;
  END LOOP;

  RETURN 1;
END;
$$;
