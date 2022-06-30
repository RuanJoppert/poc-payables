const tableName = 'Batches'
const columnName = 'status'
const indexName = 'ix_batch_status'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
    CREATE INDEX CONCURRENTLY
    ${indexName} ON "${tableName}"
    USING btree (${columnName})
    `)
  },

  down () {
    return Promise.resolve()
  },
}
