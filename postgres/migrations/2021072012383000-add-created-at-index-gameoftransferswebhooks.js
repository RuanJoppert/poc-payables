const tableName = 'GameOfTransfersWebhooks'
const field = 'created_at'
const indexName = 'ix_gameoftransfers_webhooks_created_at_index'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ${indexName} ON "${tableName}"
      USING btree (${field})
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY ${indexName}
    `)
  },
}
