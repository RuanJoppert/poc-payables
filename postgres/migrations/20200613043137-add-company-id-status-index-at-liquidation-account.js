const tableName = 'LiquidationAccounts'
const fields = ['company_id', 'status']
const indexName = 'ix_company_id_status_liquidation_accounts'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ${indexName} ON "${tableName}"
      USING btree (${fields[0]}, ${fields[1]})
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY ${indexName}
    `)
  },
}
