const index = 'refunds_local_transaction_id'
const table = 'Refunds'
const column = 'local_transaction_id'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ${index} ON "${table}"
      USING btree (${column});
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ${index};
    `)
  },
}
