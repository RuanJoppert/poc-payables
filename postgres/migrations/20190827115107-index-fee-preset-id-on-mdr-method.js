const tableName = 'MdrMethods'
const columnName = 'fee_preset_id'
const indexName = `ix_${columnName}_mdr_methods`

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ${indexName} ON "${tableName}"
      USING btree (${columnName})
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY ${indexName}
    `)
  },
}
