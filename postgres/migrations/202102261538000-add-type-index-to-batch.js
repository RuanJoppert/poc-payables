const tableName = 'Batches'
const columnName = 'type'
const indexName = 'ix_batch_type'

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
