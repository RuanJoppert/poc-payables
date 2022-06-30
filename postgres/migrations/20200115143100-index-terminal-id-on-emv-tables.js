const tableName = 'EmvTables'
const columnName = 'terminal_id'
const indexName = `ix_${columnName}_emv_tables`

module.exports = {
  up (queryInterface) {
    return queryInterface.addIndex(
      tableName,
      [columnName],
      {
        name: indexName,
        fields: [columnName],
      }
    )
  },
  down (queryInterface) {
    return queryInterface.removeIndex(tableName, indexName)
  },
}
