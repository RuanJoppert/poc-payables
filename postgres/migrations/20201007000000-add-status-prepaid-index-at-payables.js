const tableName = 'Payables'
const columnName = 'status'
const indexName = 'ix_payables_status_prepaid'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      IF NOT EXISTS
      ${indexName} ON "${tableName}"
      USING btree (${columnName})
      WHERE ${columnName} = 'prepaid'
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS ${indexName}
    `)
  },
}
