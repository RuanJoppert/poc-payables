#!/bin/bash

status=000

configureDebezium () {
  response_code=$(curl --write-out '%{http_code}' --silent --output /dev/null -XPOST localhost:8083/connectors/ -H "content-type: application/json" -d '
    {
      "name": "source.payables",
      "config": {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "tasks.max": "1",
        "database.hostname": "postgres",
        "plugin.name": "wal2json",
        "database.port": "5432",
        "database.user": "postgres",
        "database.password": "postgres",
        "database.dbname": "postgres",
        "database.server.name": "postgres",
        "table.include.list": "public.Payables",
        "database.history.kafka.bootstrap.servers": "http://broker:9092",
        "database.history.kafka.topic": "schema.changes.postgres.cdc",
        "include.schema.changes": "true",
        "slot.name": "debezium",
        "max.queue.size": "81290",
        "max.batch.size": "20480",
        "key.converter": "io.confluent.connect.avro.AvroConverter",
        "value.converter": "io.confluent.connect.avro.AvroConverter",
        "key.converter.schema.registry.url": "http://schema-registry:8081",
        "value.converter.schema.registry.url": "http://schema-registry:8081",
        "value.converter.enhanced.avro.schema.support": true,
        "snapshot.mode": "exported"
      }
    }
  ');

  echo "$response_code"
}

while [ "$status" != 201 ] | [ "$status" != 409 ];
  do
    echo "Trying to configure source (payables)"
    status=$(configureDebezium)
    sleep 15
  done

echo "source (payables) configured"
