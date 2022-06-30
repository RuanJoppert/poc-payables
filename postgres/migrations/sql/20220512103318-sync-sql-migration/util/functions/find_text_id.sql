--Find the closest non-numeric id to the timestamp you've searched for
CREATE OR REPLACE FUNCTION find_text_id (table_name regclass, search_timesp timestamptz)
RETURNS varchar as $$

DECLARE
--start of variables declaration block
first_id varchar;
substring_id varchar;
substring_tmz varchar;
concated_strg varchar;
cuid varchar;
--end of variables declaration block

BEGIN
  --this query find the last ID on Data Base table and stores it in first_id variable
  EXECUTE format('SELECT id FROM %s ORDER BY id DESC LIMIT 1;', table_name) INTO first_id;
  --get the substring from the variable first_id before a specific occurrence, in this case: "_c"
  SELECT left(first_id, strpos(first_id, '_c')) INTO substring_id;
  SELECT concat(substring_id, 'c') INTO substring_id;
  --convert the timestamp passed by parameter to base 36
  SELECT number_to_base(extract(epoch FROM search_timesp + INTERVAL '1 hour')::bigint *1000, 36) INTO substring_tmz;
  --concat the ID substring and the converted timestamp (already in base 36)
  SELECT concat(substring_id,substring_tmz) INTO concated_strg;
  --this query find the closest ID to the timestamp considering the variable concated_strg as index
  EXECUTE format('SELECT max(id) FROM %s WHERE id < %L AND created_at :: timestamp at time zone ''utc'' < %L;',
      table_name, concated_strg, search_timesp) INTO cuid;

  --return the function answer
  RETURN cuid;
END;
$$ LANGUAGE plpgsql;

