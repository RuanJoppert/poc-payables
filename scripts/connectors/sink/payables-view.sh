#!/bin/bash

status=000

configureSink () {
  response_code=$(curl --write-out '%{http_code}' --silent --output /dev/null -XPOST localhost:8083/connectors/ -H "content-type: application/json" -d '
    {
      "name": "sink.payables-view",
      "config": {
        "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
        "connection.url": "jdbc:postgresql://postgres:5432/postgres",
        "connection.user": "postgres",
        "connection.password": "postgres",
        "dialect.name": "PostgreSqlDatabaseDialect",
        "key.converter": "io.confluent.connect.avro.AvroConverter",
        "key.converter.schema.registry.url": "http://schema-registry:8081",
        "value.converter": "io.confluent.connect.avro.AvroConverter",
        "value.converter.schema.registry.url": "http://schema-registry:8081",
        "insert.mode": "insert",
        "ignore.table": true,
        "auto.create": false,
        "auto.evolve": false,
        "input.data.format": "AVRO",
        "transforms": "unwrap",
        "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
        "transforms.unwrap.drop.tombstones": "false",
        "topics": "postgres.public.Payables",
        "table.name.format": "public.payable_view",
        "pk.mode": "record_key",
        "tasks.max": "1"
      }
    }
  ');

  echo "$response_code"
}

while [ "$status" != 201 ] | [ "$status" != 409 ];
  do
    echo "Trying to configure sink (payables-view)"
    status=$(configureSink)
    sleep 15
  done

echo "sink (payables-view) configured"
