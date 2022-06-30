create or replace function find_numeric_id(table_name regclass, search_timestamp timestamp with time zone) returns bigint
  language plpgsql
as
$$
DECLARE
id_return bigint;
first_id bigint;
mid_id bigint;
last_id bigint;
mid_created_at timestamptz;

BEGIN

  EXECUTE format('SELECT min(id) FROM %s;', table_name) INTO first_id;
  EXECUTE format('SELECT max(id) FROM %s;', table_name) INTO last_id;

LOOP
EXIT WHEN (last_id - first_id < 1000);

  --find the middle id of the table
  mid_id = (last_id - first_id)/2 + first_id;
  EXECUTE format('SELECT created_at, id FROM %s WHERE id >= %s ORDER BY id ASC LIMIT 1;',
          table_name, mid_id) INTO mid_created_at, mid_id;
  --select the way of the binary search, discarding half of remaining IDs
    IF (search_timestamp >= mid_created_at) THEN
      IF (first_id = mid_id) THEN
        EXIT;
      END IF;
    first_id := mid_id;
    ELSE
      IF last_id = mid_id THEN
        EXIT;
      END IF;
    last_id := mid_id;
    end if;

END LOOP;

  --this query find the closest ID to the timestamp considering the variables range
  EXECUTE format('SELECT coalesce(max(id), 0) FROM %s WHERE id >= %s AND id <= %s AND created_at < %L;',
          table_name, first_id, last_id, search_timestamp) INTO id_return;

  RETURN id_return;
END;
$$;
