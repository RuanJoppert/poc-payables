const tableName = 'SecurityRules'
const fields = ['company_id', 'active', '"table"', 'chain']
const indexName = 'ix_security_rules_combined_index'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ${indexName} ON "${tableName}"
      USING btree (${fields[0]}, ${fields[1]}, ${fields[2]}, ${fields[3]})
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY ${indexName}
    `)
  },
}
