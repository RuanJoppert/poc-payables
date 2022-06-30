const index = 'ui_company_id_local_transaction_id'
const table = 'Transactions'
const column = 'local_transaction_id'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX CONCURRENTLY
      ${index} ON "${table}"
      USING btree (company_id, ${column});
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS
      ${index};
    `)
  },
}
