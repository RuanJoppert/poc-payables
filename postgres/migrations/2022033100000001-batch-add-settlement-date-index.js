const tableName = 'Batches'
const indexName = 'idx_batch_settlement_date'

module.exports = {
  async up (queryInterface) {
    return queryInterface.sequelize.query(`
    CREATE INDEX CONCURRENTLY
    ${indexName} ON "${tableName}"
    USING btree (settlement_date)
    WHERE type = 'scd' and status = 'waiting_payment'
    `)
  },

  async down (queryInterface) {
    await queryInterface.sequelize.query(`
    DROP INDEX CONCURRENTLY IF EXISTS
    ${indexName}
    `)
  },
}
